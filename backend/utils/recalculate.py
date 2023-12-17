from datetime import timedelta

import pandas as pd
from bs4 import BeautifulSoup
from nltk.tokenize import word_tokenize
from string import punctuation
import nltk
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib


def convert_to_timedelta(value):
    try:
        return pd.to_timedelta(value)
    except:
        return 0


def normalize_text(s: str) -> str:
    soup = BeautifulSoup(s, 'html.parser')
    text = soup.get_text()
    for data in soup(['style', 'script']):
        data.decompose()
    script_out = ' '.join(soup.stripped_strings)
    tokens = word_tokenize(script_out)
    tokens_without_punct = [i for i in tokens if i not in punctuation]
    low_tokens = [i.lower() for i in tokens_without_punct]
    stopwords = nltk.corpus.stopwords.words('russian')
    words_without_stop = [i for i in low_tokens if i not in stopwords]
    lemmatizer = nltk.WordNetLemmatizer()
    lemms = [lemmatizer.lemmatize(word) for word in words_without_stop]
    ps = PorterStemmer()
    stems = [ps.stem(i) for i in lemms]
    total = ' '.join(stems)
    return total

def get_probability(df: pd.DataFrame) -> float:
    '''
    input
    'age', 'education_level', 'education_field', 'is_male', 'is_married',
    'is_child', 'is_house', 'salary', 'role', 'total_working_years',
    'years_at_company', 'work_hours_week', 'work_accident',
    'change_salary_period', 'department', 'fraction_indoor_outdoor',
    'in_number_send', 'in_number_get', 'in_number_addressee_sent',
    'in_number_addressee_sent_hidencopy', 'in_number_addressee_sent_copy',
    'in_number_answer_time_4', 'in_fraction_answer_time_number_answers',
    'in_number_answered', 'in_number_symbol', 'in_number_sent_outwork',
    'in_fraction_get_sent', 'in_fraction_bytes_get_sent',
    'in_number_get_noanwered_question', 'out_number_send', 'out_number_get',
    'out_number_addressee_sent', 'out_number_addressee_sent_hidencopy',
    'out_number_addressee_sent_copy', 'out_number_answer_time_4',
    'out_fraction_answer_time_number_answers', 'out_number_answered',
    'out_number_symbol', 'out_number_sent_outwork', 'out_fraction_get_sent',
    'out_fraction_bytes_get_sent', 'out_number_get_noanwered_question',
    'outdoor_context_email', 'indoor_context_email'
    '''
    #Категориальные признаки
    columns_to_one_hot = ['education_field', 'role', 'department']
    encoder = joblib.load(r'backend\media\docs\encoder2.joblib')
    columns_to_encode = ['education_field', 'role', 'department']
    df_new_encoded = encoder.transform(df[columns_to_encode])
    df = df.drop(columns=columns_to_encode)
    df = pd.concat([df, df_new_encoded.reset_index(drop=True)], axis=1)
    cat_features = [
    'education_level',
    'is_male',
    'is_married',
    'is_child',
    'is_house',
    'work_accident'
    ]
    df[cat_features] = df[cat_features].astype({'education_level': str,
                                            'is_male': str,
                                            'is_married': str,
                                            'is_child': str,
                                            'is_house': str,
                                            'work_accident': str
                                            })
    #Текстовые признаки
    df['indoor_context_email'] = df['indoor_context_email'].astype(str)
    df['outdoor_context_email'] = df['outdoor_context_email'].astype(str)
    df['normalized_in'] = df['indoor_context_email'].apply(normalize_text)
    df['normalized_out'] = df['outdoor_context_email'].apply(normalize_text)
    df = df.drop(columns=['indoor_context_email', 'outdoor_context_email'])
    vectorizer_filename = r'backend\media\docs\tfidf_vectorizer4.joblib' #Указать путь до векторайзера
    tfidf_vectorizer = joblib.load(vectorizer_filename)
    tfidf_m_out = tfidf_vectorizer.transform(df['normalized_out'])
    tfidf_d_out = pd.DataFrame(tfidf_m_out.toarray(), columns=tfidf_vectorizer.get_feature_names())
    tfidf_m_in = tfidf_vectorizer.transform(df['normalized_in'])
    tfidf_d_in = pd.DataFrame(tfidf_m_in.toarray(), columns=tfidf_vectorizer.get_feature_names())
    tfidf_d = pd.concat([tfidf_d_out, tfidf_d_in], axis = 1, ignore_index=True)
    df = df.drop(columns=['normalized_in', 'normalized_out'])
    df = pd.concat([df.reset_index(drop=True), tfidf_d.reset_index(drop=True)], axis=1)
    #Временные признаки
    df['in_fraction_answer_time_number_answers'] = df['in_fraction_answer_time_number_answers'].apply(convert_to_timedelta)
    df['out_fraction_answer_time_number_answers'] = df['out_fraction_answer_time_number_answers'].apply(convert_to_timedelta)
    df['in_fraction_answer_time_number_answers'] = df['in_fraction_answer_time_number_answers'].dt.total_seconds().astype(float)
    df['out_fraction_answer_time_number_answers'] = df['out_fraction_answer_time_number_answers'].dt.total_seconds().astype(float)
    #Числовые признаки
    float_features = df.select_dtypes(include=['float64']).columns.difference(cat_features)
    df[float_features] = df[float_features].fillna(0.01)
    df[float_features] = df[float_features].astype(float)
    df[cat_features] = df[cat_features].fillna('nan').astype(str)
    #Модель
    print(df.columns.to_list())
    model_filename = r'backend\media\docs\ensemble_model3.joblib' #Указать путь до модели
    ensemble_model = joblib.load(model_filename)
    prediction_proba = ensemble_model.predict_proba(df)[:, 1]
    return float(prediction_proba[0])


def recalculate(employee):
    csv_path = '/app/media/docs/messages.csv'
    df = pd.read_csv(csv_path, delimiter='\t')

    time_interval_4_hours = timedelta(hours=4)
    time_interval_2_days = timedelta(days=2)

    target_email = employee.mail

    sent_by_target = df[df['sender'] == target_email]
    address_by_target = df[target_email in df['addreses']]

    in_address_by_target = address_by_target[
        sent_by_target['is_indoor'] == 1
    ]
    out_address_by_target = address_by_target[
        sent_by_target['is_indoor'] == 0
    ]

    in_sent_by_target = sent_by_target[sent_by_target['is_indoor'] == 1]
    out_sent_by_target = sent_by_target[sent_by_target['is_indoor'] == 0]

    outdoor_context_email_text = (
        ' '.join(out_sent_by_target['email_text'].astype(str))
    )
    indoor_context_email_text = (
        ' '.join(in_sent_by_target['email_text'].astype(str))
    )

    stats = {
        'name': employee.name,
        'mail': employee.mail,
        'age': employee.age,
        'education_level': employee.education_level,
        'education_field': employee.education_field,
        'is_male': employee.is_male,
        'is_married': employee.is_married,
        'is_child': employee.is_child,
        'is_house': employee.is_house,
        'salary': employee.salary,
        'role': employee.role,
        'total_working_years': employee.total_working_years,
        'years_at_company': employee.years_at_company,
        'work_hours_week': employee.work_hours_week,
        'work_accident': employee.work_accident,
        'change_salary_period': employee.change_salary_period,
        'department': employee.department.name,

        'in_number_send': len(in_sent_by_target),
        'in_number_get': len(in_address_by_target),
        'in_number_addressee_sent': (
            in_sent_by_target['addreses']
            .apply(lambda x: len(x.split(',')) if pd.notna(x) else 0)
            .sum()
        ),
        'in_number_addressee_sent_hidencopy': (
            len(in_sent_by_target[in_sent_by_target['is_hidencopy']])
        ),
        'in_number_addressee_sent_copy': (
            len(in_sent_by_target[in_sent_by_target['is_copy']])
        ),
        'in_number_answer_time_4': (
            in_address_by_target
            .apply(
                lambda row: 1 if any(
                    (
                        in_sent_by_target['dt'] - row['dt']
                        < time_interval_4_hours
                    ) & (
                        in_sent_by_target['dt'] > row['dt']
                    )
                ) else 0,
                axis=1
            ).sum()
        ),
        'in_fraction_answer_time_number_answers': (
            in_address_by_target
            .apply(
                lambda row: (in_sent_by_target['dt'] - row['dt'])
                .min() if any(
                    (
                        in_sent_by_target['dt'] - row['dt']
                        < time_interval_2_days
                    ) & (
                        in_sent_by_target['dt'] > row['dt']
                    )
                ) else 0.01,
                axis=1
            ).mean()
        ),
        'in_number_answered': (
            in_address_by_target
            .apply(
                lambda row: 1 if any(
                    (
                        in_sent_by_target['dt'] - row['dt']
                        < time_interval_2_days
                    ) & (
                        in_sent_by_target['dt'] > row['dt']
                    )
                ) else 0,
                axis=1
            ).sum()
        ),
        'in_number_symbol': (
            in_sent_by_target['email_text']
            .apply(lambda x: len(x) if pd.notna(x) else 0)
            .sum()
        ),
        'in_number_sent_outwork': (
            len(in_sent_by_target[in_sent_by_target['dt'].dt.hour < 9]) +
            len(in_sent_by_target[in_sent_by_target['dt'].dt.hour > 18])
        ),
        'in_fraction_get_sent': (
            len(in_address_by_target) / len(in_sent_by_target)
            if len(in_sent_by_target) > 0 else 0.01
        ),
        'in_fraction_bytes_get_sent': (
            df[target_email in df['sender']]['text']
            .apply(
                lambda x: len(str(x).encode('utf-8')) if pd.notna(x) else 0
            ).sum() / in_sent_by_target['text']
            .apply(
                lambda x: len(str(x).encode('utf-8')) if pd.notna(x) else 0
            ).sum()
        ) if len(in_sent_by_target) > 0 else 0.01,
        'in_number_get_noanwered_question': (
            in_address_by_target.apply(
                lambda row: 1 if ('?' in row['email_text']) and any(
                    (
                        in_sent_by_target['dt'] - row['dt']
                        < time_interval_2_days
                    ) & (
                        in_sent_by_target['dt'] > row['dt']
                    )
                ) else 0,
                axis=1
            ).sum()
        ),
        'out_number_send': len(out_sent_by_target),
        'out_number_get': len(out_address_by_target),
        'out_number_addressee_sent': (
            out_sent_by_target['addreses']
            .apply(lambda x: len(x.split(',')) if pd.notna(x) else 0)
            .sum()
        ),
        'out_number_addressee_sent_hidencopy': (
            len(out_sent_by_target[out_sent_by_target['is_hidencopy']])
        ),
        'out_number_addressee_sent_copy': (
            len(out_sent_by_target[out_sent_by_target['is_copy']])
        ),
        'out_number_answer_time_4': (
            out_address_by_target
            .apply(
                lambda row: 1 if len(out_sent_by_target) > 0 and any(
                    (
                        out_sent_by_target['dt'] - row['dt']
                        < time_interval_4_hours
                    ) & (
                        out_sent_by_target['dt'] > row['dt']
                    )
                ) else 0,
                axis=1
            ).sum()
        ),
        'out_fraction_answer_time_number_answers': (
            out_address_by_target
            .apply(
                lambda row: (
                    (out_sent_by_target['dt'] - row['dt'])
                    .min() if len(out_sent_by_target) > 0 and any(
                        (
                            out_sent_by_target['dt'] - row['dt']
                            < time_interval_2_days
                        ) & (
                            out_sent_by_target['dt'] > row['dt']
                        )
                    ) else 0.01
                ),
                axis=1
            ).mean()
        ),
        'out_number_answered': (
            out_address_by_target
            .apply(
                lambda row: 1 if len(out_sent_by_target) > 0 and any(
                    (
                        out_sent_by_target['dt'] - row['dt']
                        < time_interval_2_days
                    ) & (
                        out_sent_by_target['dt'] > row['dt']
                    )
                ) else 0,
                axis=1
            ).sum()
        ),
        'out_number_symbol': (
            out_sent_by_target['email_text']
            .apply(lambda x: len(x) if pd.notna(x) else 0)
            .sum()
        ),
        'out_number_sent_outwork': (
            len(out_sent_by_target[out_sent_by_target['dt'].dt.hour < 9]) +
            len(out_sent_by_target[out_sent_by_target['dt'].dt.hour > 18])
        ),
        'out_fraction_get_sent': (
            len(out_address_by_target) / len(out_sent_by_target)
            if len(out_sent_by_target) > 0 else 0.01
        ),
        'out_fraction_bytes_get_sent': (
            df[target_email in df['sender']]['text']
            .apply(
                lambda x: len(str(x).encode('utf-8')) if pd.notna(x) else 0
            ).sum() / out_sent_by_target['text']
            .apply(
                lambda x: len(str(x).encode('utf-8')) if pd.notna(x) else 0
            ).sum()
        ) if len(out_sent_by_target) > 0 else 0.01,
        'out_number_get_noanwered_question': (
            out_address_by_target.apply(
                lambda row: 1 if ('?' in row['email_text']) and any(
                    (
                        out_sent_by_target['dt'] - row['dt']
                        < time_interval_2_days
                    ) & (
                        out_sent_by_target['dt'] > row['dt']
                    )
                ) else 0,
                axis=1
            ).sum()
        ),
        'outdoor_context_email': outdoor_context_email_text,
        'indoor_context_email': indoor_context_email_text,
        'fraction_indoor_outdoor': (
            len(in_sent_by_target) / len(out_sent_by_target)
            if len(out_sent_by_target) > 0 else 0
        )
    }


    probability = get_probability(stats)
    employee.probability = probability
    employee.save()

test_data = {
    'age': 30,
    'education_level': 2,
    'education_field': 'nat',
    'is_male': int(0),
    'is_married': int(1),
    'is_child': int(0),
    'is_house': int(1),
    'salary': 50000,
    'role': 'Analyst',
    'total_working_years': 5,
    'years_at_company': 3,
    'work_hours_week': 40,
    'work_accident': int(0),
    'change_salary_period': 5000,
    'department': 'IT',
    'fraction_indoor_outdoor': 0.7,
    'in_number_send': 20,
    'in_number_get': 15,
    'in_number_addressee_sent': 5,
    'in_number_addressee_sent_hidencopy': 2,
    'in_number_addressee_sent_copy': 3,
    'in_number_answer_time_4': 6,
    'in_fraction_answer_time_number_answers': 0.8,
    'in_number_answered': 10,
    'in_number_symbol': 150,
    'in_number_sent_outwork': 8,
    'in_fraction_get_sent': 0.6,
    'in_fraction_bytes_get_sent': 0.5,
    'in_number_get_noanwered_question': 3,
    'out_number_send': 25,
    'out_number_get': 20,
    'out_number_addressee_sent': 7,
    'out_number_addressee_sent_hidencopy': 3,
    'out_number_addressee_sent_copy': 4,
    'out_number_answer_time_4': 5,
    'out_fraction_answer_time_number_answers': 0.7,
    'out_number_answered': 12,
    'out_number_symbol': 180,
    'out_number_sent_outwork': 7,
    'out_fraction_get_sent': 0.5,
    'out_fraction_bytes_get_sent': 0.4,
    'out_number_get_noanwered_question': 2,
    'outdoor_context_email': 'Привет, вопросы',
    'indoor_context_email': 'Пример ввода 2'
}


test_df = pd.DataFrame(test_data, index=[0])
print(get_probability(test_df))

