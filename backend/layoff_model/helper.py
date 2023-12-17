import os
from string import punctuation
from datetime import timedelta

import joblib
import nltk
import pandas as pd
from bs4 import BeautifulSoup
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize


class Helper:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.__init__()
        return cls._instance

    def __init__(self):
        path_directory = self.get_directory()
        path_encoder = os.path.join(
            path_directory,
            'encoder.joblib'
        )
        path_tfidf_vectorizer = os.path.join(
            path_directory,
            'tfidf_vectorizer.joblib'
        )
        path_ensemble_model = os.path.join(
            path_directory,
            'ensemble_model.joblib'
        )

        self.encoder = joblib.load(path_encoder)
        self.tfidf_vectorizer = joblib.load(path_tfidf_vectorizer)
        self.ensemble_model = joblib.load(path_ensemble_model)

    @staticmethod
    def get_directory() -> str:
        current_directory = os.getcwd()
        desired_directory = os.path.join(
            current_directory,
            'media',
            'model'
        )
        return desired_directory

    @staticmethod
    def normalize_text(text: str) -> str:
        soup = BeautifulSoup(text, 'html.parser')
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

    @staticmethod
    def convert_to_timedelta(value):
        try:
            return pd.to_timedelta(value)
        except Exception:
            return 0

    def recalculate(self, employee):
        current_directory = os.getcwd()
        csv_path = os.path.join(
            current_directory,
            'media',
            'docs',
            'messages.csv',
        )
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

            'fraction_indoor_outdoor': (
                len(in_sent_by_target) / len(out_sent_by_target)
                if len(out_sent_by_target) > 0 else 0
            ),
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
        }
        data_df = pd.DataFrame(stats, index=[0])
        probability = self.get_probability(data_df)
        employee.probability = probability
        employee.save()

    def get_probability(self, df: pd.DataFrame) -> float:
        columns_to_encode = ['education_field', 'role', 'department']
        df_new_encoded = self.encoder.transform(df[columns_to_encode])
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
        df[cat_features] = df[cat_features].astype({
            'education_level': str,
            'is_male': str,
            'is_married': str,
            'is_child': str,
            'is_house': str,
            'work_accident': str
        })

        df['indoor_context_email'] = df['indoor_context_email'].astype(str)
        df['outdoor_context_email'] = df['outdoor_context_email'].astype(str)

        df['normalized_in'] = (
            df['indoor_context_email']
            .apply(self.normalize_text)
        )
        df['normalized_out'] = (
            df['outdoor_context_email']
            .apply(self.normalize_text)
        )

        df = df.drop(columns=['indoor_context_email', 'outdoor_context_email'])

        tfidf_m_out = self.tfidf_vectorizer.transform(df['normalized_out'])
        tfidf_d_out = pd.DataFrame(
            tfidf_m_out.toarray(),
            columns=self.tfidf_vectorizer.get_feature_names()
        )

        tfidf_m_in = self.tfidf_vectorizer.transform(df['normalized_in'])
        tfidf_d_in = pd.DataFrame(
            tfidf_m_in.toarray(),
            columns=self.tfidf_vectorizer.get_feature_names()
        )

        tfidf_d = pd.concat(
            [tfidf_d_out, tfidf_d_in],
            axis=1,
            ignore_index=True
        )

        df = df.drop(columns=['normalized_in', 'normalized_out'])
        df = pd.concat(
            [df.reset_index(drop=True), tfidf_d.reset_index(drop=True)],
            axis=1
        )

        df['in_fraction_answer_time_number_answers'] = (
            df['in_fraction_answer_time_number_answers']
            .apply(self.convert_to_timedelta)
        )
        df['out_fraction_answer_time_number_answers'] = (
            df['out_fraction_answer_time_number_answers']
            .apply(self.convert_to_timedelta)
        )
        df['in_fraction_answer_time_number_answers'] = (
            df['in_fraction_answer_time_number_answers']
            .dt.total_seconds().astype(float)
        )
        df['out_fraction_answer_time_number_answers'] = (
            df['out_fraction_answer_time_number_answers']
            .dt.total_seconds().astype(float)
        )

        float_features = (
            df.select_dtypes(include=['float64']).columns
            .difference(cat_features)
        )
        df[float_features] = df[float_features].fillna(0.01)
        df[float_features] = df[float_features].astype(float)
        df[cat_features] = df[cat_features].fillna('nan').astype(str)

        prediction_proba = self.ensemble_model.predict_proba(df)[:, 1]
        return float(prediction_proba[0])
