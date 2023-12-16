import pandas as pd
from datetime import datetime, timedelta

def get_probability(stats):
    ...


def recalculate():
    csv_path = '/app/media/docs/messages.csv'
    df_emails = pd.read_csv(csv_path, delimiter='\t')
    data_employees_example = {
        'name': 'John Doe',
        'mail': 'john.doe@example.com',
        'age': 30,
        'education_level': 'Bachelor',
        'education_field': 'Computer Science',
        'is_male': True,
        'is_married': False,
        'is_child': False,
        'is_house': True,
        'salary': 75000,
        'role': 'Software Engineer',
        'total_working_years': 5,
        'years_at_company': 2,
        'work_hours_week': 40,
        'work_accident': False,
        'change_salary_period': 'Yearly',
        'department': 'Engineering'
    }
    df_employees = pd.DataFrame([data_employees_example])
    df_employees['work_hours_week'] = pd.to_numeric(df_employees['work_hours_week'], errors='coerce')
    df_employees['salary'] = pd.to_numeric(df_employees['salary'], errors='coerce')
    df_emails['dt'] = pd.to_datetime(df_emails['dt'], errors='coerce')
    time_interval_4_hours = pd.to_timedelta('4:00:00')
    time_interval_2_days = pd.to_timedelta('2 days')
    stats_columns = [
        'mail', 'in_number_send', 'in_number_get', 'in_number_addressee_sent',
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
    ]
    result_stats = pd.DataFrame(columns=stats_columns)
    for employee in df_employees.iterrows():
        target_email = employee[1].mail
        sent_by_target = df_emails[df_emails['sender'] == target_email]
        address_by_target = df_emails[df_emails['addreses'].apply(lambda x: target_email in x.split(','))]
        in_address_by_target = address_by_target[address_by_target['is_indoor'] == 1]
        out_address_by_target = address_by_target[address_by_target['is_indoor'] == 0]
        in_sent_by_target = sent_by_target[sent_by_target['is_indoor'] == 1]
        out_sent_by_target = sent_by_target[sent_by_target['is_indoor'] == 0]
        outdoor_context_email_text = ' '.join(out_sent_by_target['email_text']
        .astype(str))
        indoor_context_email_text = ' '.join(in_sent_by_target['email_text']
        .astype(str))
        stats = {
            'mail': target_email,
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
                    ) else pd.NaT,
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
                len(in_address_by_target) / len(in_sent_by_target) if len(in_sent_by_target) > 0 else 0.01
            ),
            'in_fraction_bytes_get_sent': (
                df_emails[df_emails['sender'] == target_email]['email_text']
                .apply(
                    lambda x: len(str(x).encode('utf-8')) if pd.notna(x) else 0
                ).sum() / in_sent_by_target['email_text']
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
                        ) else pd.NaT
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
                len(out_address_by_target) / len(out_sent_by_target) if len(out_sent_by_target) > 0 else 0.01
            ),
            'out_fraction_bytes_get_sent': (
                df_emails[df_emails['sender'] == target_email]['email_text']
                .apply(
                    lambda x: len(str(x).encode('utf-8')) if pd.notna(x) else 0
                ).sum() / out_sent_by_target['email_text']
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
            'indoor_context_email': indoor_context_email_text
        }
        result_stats = result_stats.append(stats, ignore_index=True)
    df_employees = pd.concat([df_employees, result_stats.drop(columns='mail')], axis=1)
    return df_employees
