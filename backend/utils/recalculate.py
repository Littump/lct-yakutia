from api.models import Employee
import pandas as pd
from datetime import datetime, timedelta


def get_probability(stats):
    ...


def recalculate():
    csv_path = '/app/media/docs/messages.csv'
    df = pd.read_csv(csv_path, delimiter='\t')
    time_interval_4_hours = timedelta(hours=4)
    time_interval_2_days = timedelta(days=2)
    employees = Employee.objects.all()
    for employee in employees:
        target_email = employee.mail
        sent_by_target = df[df['sender'] == target_email]
        address_by_target = df[target_email in df['addreses']]
        in_address_by_target = address_by_target[sent_by_target['is_indoor'] == 1]
        out_address_by_target = address_by_target[sent_by_target['is_indoor'] == 0]
        in_sent_by_target = sent_by_target[sent_by_target['is_indoor'] == 1]
        out_sent_by_target = sent_by_target[sent_by_target['is_indoor'] == 0]
        stats = {
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
                in_sent_by_target['text']
                .apply(lambda x: len(x) if pd.notna(x) else 0)
                .sum()
            ),
            'in_number_sent_outwork': (
                len(in_sent_by_target[in_sent_by_target['dt'].dt.hour < 9]) +
                len(in_sent_by_target[in_sent_by_target['dt'].dt.hour > 18])
            ),
            'in_fraction_get_sent': (
                len(in_address_by_target) / len(in_sent_by_target)
            ),
            'in_fraction_bytes_get_sent': (
                df[target_email in df['sender']]['text']
                .apply(
                    lambda x: len(str(x).encode('utf-8')) if pd.notna(x) else 0
                ).sum() / in_sent_by_target['text']
                .apply(
                    lambda x: len(str(x).encode('utf-8')) if pd.notna(x) else 0
                ).sum()
            ),
            'in_number_get_noanwered_question': (
                in_address_by_target.apply(
                    lambda row: 1 if ('?' in row['text']) and any(
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
                    lambda row: 1 if any(
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
                    lambda row: (out_sent_by_target['dt'] - row['dt'])
                    .min() if any(
                        (
                            out_sent_by_target['dt'] - row['dt']
                            < time_interval_2_days
                        ) & (
                            out_sent_by_target['dt'] > row['dt']
                        )
                    ) else pd.NaT,
                    axis=1
                ).mean()
            ),
            'out_number_answered': (
                out_address_by_target
                .apply(
                    lambda row: 1 if any(
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
                out_sent_by_target['text']
                .apply(lambda x: len(x) if pd.notna(x) else 0)
                .sum()
            ),
            'out_number_sent_outwork': (
                len(out_sent_by_target[out_sent_by_target['dt'].dt.hour < 9]) +
                len(out_sent_by_target[out_sent_by_target['dt'].dt.hour > 18])
            ),
            'out_fraction_get_sent': (
                len(out_address_by_target) / len(out_sent_by_target)
            ),
            'out_fraction_bytes_get_sent': (
                df[target_email in df['sender']]['text']
                .apply(
                    lambda x: len(str(x).encode('utf-8')) if pd.notna(x) else 0
                ).sum() / out_sent_by_target['text']
                .apply(
                    lambda x: len(str(x).encode('utf-8')) if pd.notna(x) else 0
                ).sum()
            ),
            'out_number_get_noanwered_question': (
                out_address_by_target.apply(
                    lambda row: 1 if ('?' in row['text']) and any(
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
        }
        probability = get_probability(stats)
        employee.probability = probability
        employee.save()
