import { Typography } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateWorkerMutation } from "../services/Service";
import { InputPrimary } from "../components/UI/InputPrimary";
import { ButtonPrimary } from "../components/UI/ButtonPrimary";
import { DropdownRadio } from "../components/UI/DropdownRadio";
import getEducationField from "../helpers/getEducationField";
import getEducationLevel from "../helpers/getEducationLevel";
import { Block } from "../components/UI/Block";
import ProbabilityDiagram from "../components/ProbabilityDiagram";
import { useSelector } from "react-redux";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  age: yup
    .string()
    .min(2, "Некорректно введён возраст")
    .required("Введите возраст"),
  change_salary_period: yup
    .string()
    .min(1, "Некорректно введёно значение")
    .required("Введите изменение зп за полгода"),
  name: yup.string().min(2, "Слишком короткое").required("Введите имя"),
  total_working_years: yup
    .string()
    .min(1, "Некорректно введёно значение")
    .required("Введите, сколько лет опыта"),
  work_hours_week: yup
    .string()
    .min(1, "Некорректно введёно значение")
    .required("Введите количество часов работы в неделю"),
  years_at_company: yup
    .string()
    .min(1, "Некорректно введёно значение")
    .required("Введите, сколько лет опыта в компании"),
  salary: yup
    .string()
    .min(1, "Некорректно введёно значение")
    .required("Введите зарплату"),
  mail: yup
    .string()
    .email("Некорректно введена почта")
    .required("Введите почту"),
  work_accident: yup
    .string()
    .min(1, "Некорректно введёно значение")
    .required("Введите, сколько ошибок замечено у работника"),
  role: yup
    .string()
    .min(1, "Некорректно введёно значение")
    .required("Введите специальность работника"),
  is_house: yup.string().required("Выберите значение"),
  is_married: yup.string().required("Выберите значение"),
  education_field: yup.string().required("Выберите значение"),
  education_level: yup.string().required("Выберите значение"),
  is_child: yup.string().required("Выберите значение"),
  gender: yup.string().required("Выберите значение"),
});

export default memo(function UpdateWorker() {
  const navigate = useNavigate();
  const { teamId, workerId } = useParams();
  const [updateWorker, result] = useUpdateWorkerMutation();
  const workerInfo = useSelector((state) =>
    state.company?.teams
      .find((el) => el?.id === +teamId)
      ?.workers.find((el) => el?.id === +workerId)
  );
  const teamInfo = useSelector((state) =>
    state.company?.teams.find((el) => el?.id === +teamId)
  );
  useEffect(() => {
    if (result.isSuccess) {
      navigate(`/team/${teamId}/`);
    }
    if (workerInfo == undefined) navigate(`/team/${teamId}/`);
  }, [result]);
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        age: workerInfo?.age,
        change_salary_period: workerInfo?.change_salary_period,
        name: workerInfo?.name,
        total_working_years: workerInfo?.total_working_years,
        work_hours_week: workerInfo?.work_hours_week,
        years_at_company: workerInfo?.years_at_company,
        salary: workerInfo?.salary,
        is_house: workerInfo?.is_house ? "Да" : "Нет",
        is_married: workerInfo?.is_married ? "Да" : "Нет",
        gender: workerInfo?.gender ? "Мужской" : "Женский",
        mail: workerInfo?.mail,
        role: workerInfo?.role,
        education_field: getEducationField(workerInfo?.education_field),
        work_accident: workerInfo?.work_accident,
        education_level: getEducationLevel(workerInfo?.education_level),
        is_child: workerInfo?.is_child ? "Да" : "Нет",
      }}
      onSubmit={(values, { resetForm }) => {
        updateWorker({
          workerId,
          workerInfo: {
            department: teamId,
            name: values.name,
            salary:
              values.salary >= 1000 ? values.salary : values.salary * 1000,
            age: values.age,
            change_salary_period:
              values.change_salary_period >= 1000
                ? values.change_salary_period
                : values.change_salary_period * 1000,
            total_working_years: values.total_working_years,
            work_hours_week: values.work_hours_week,
            years_at_company: values.years_at_company,
            is_male: values.gender.toLowerCase() == "мужской" ? 1 : 0,
            education_field: getEducationField(values.education_field, true),
            education_level: getEducationLevel(values.education_level, true),
            role: values.role,
            work_accident: values.work_accident == "Да" ? 1 : 0,
            mail: values.mail,
            is_house: values.is_house == "Да" ? 1 : 0,
            is_married: values.is_married == "Да" ? 1 : 0,
            is_child: values.is_child == "Да" ? 1 : 0,
          },
        });
      }}
    >
      {({ values, setFieldValue, touched, errors }) => (
        <Form className="w-full p-10 flex flex-col gap-6">
          <Typography variant="h3">Обновить информацию о работнике</Typography>
          <Block className="flex items-center gap-6 relative">
            <ProbabilityDiagram probability={workerInfo?.probability} />
            <div className="flex flex-col gap-4 ">
              <Typography variant="h3">{workerInfo?.name}</Typography>
              <Typography variant="paragraph" className="text-lg font-[300]">
                {workerInfo?.role}
              </Typography>
              <Typography
                variant="paragraph"
                className="text-lg font-[300] absolute top-10 right-12"
              >
                {teamInfo?.name}
              </Typography>
            </div>
          </Block>
          <Block className="flex flex-col items-center">
            <Typography variant="h4" className="mt-12">
              Заполните новые данные о пользователе
            </Typography>
            <div className="max-w-[800px] w-full grid grid-cols-2 my-10  gap-6">
              <div>
                <Typography variant="h6">Имя работника</Typography>
                <InputPrimary
                  type="name"
                  name="name"
                  placeholder="Иван Иванов"
                  errors={errors}
                  touched={touched}
                  variant="light"
                />
              </div>
              <div>
                <Typography variant="h6">Возраст</Typography>
                <InputPrimary
                  type="number"
                  name="age"
                  min="14"
                  placeholder="Возраст"
                  errors={errors}
                  touched={touched}
                  variant="light"
                />
              </div>
              <div>
                <Typography variant="h6">Заработная плата</Typography>
                <InputPrimary
                  type="number"
                  name="salary"
                  min="0"
                  placeholder="Заработная плата"
                  errors={errors}
                  touched={touched}
                  variant="light"
                />
              </div>
              <div>
                <Typography variant="h6">Специальность</Typography>
                <InputPrimary
                  type="text"
                  min="0"
                  name="role"
                  placeholder="менеджер"
                  errors={errors}
                  touched={touched}
                  variant="light"
                />
              </div>
              <div>
                <Typography variant="h6">Лет работы всего</Typography>
                <InputPrimary
                  type="number"
                  min="0"
                  name="total_working_years"
                  placeholder="Лет работы всего"
                  errors={errors}
                  touched={touched}
                  variant="light"
                />
              </div>
              <div>
                <Typography variant="h6">Лет работы в команде</Typography>
                <InputPrimary
                  type="number"
                  min="0"
                  name="years_at_company"
                  placeholder="Лет работы в компании"
                  errors={errors}
                  touched={touched}
                  variant="light"
                />
              </div>
              <div>
                <Typography variant="h6">
                  Насколько изменилась зарплата за полгода
                </Typography>
                <InputPrimary
                  type="number"
                  name="change_salary_period"
                  placeholder="Насколько изменилась зарплата за полгода"
                  errors={errors}
                  touched={touched}
                  variant="light"
                />
              </div>
              <div>
                <Typography variant="h6">Часов в неделю работает</Typography>
                <InputPrimary
                  type="number"
                  min="0"
                  name="work_hours_week"
                  placeholder="Часов в неделю работает"
                  errors={errors}
                  touched={touched}
                  variant="light"
                />
              </div>
              <div>
                <Typography variant="h6">Почта</Typography>
                <InputPrimary
                  type="email"
                  min="0"
                  name="mail"
                  placeholder="some@mail.com"
                  errors={errors}
                  touched={touched}
                  variant="light"
                />
              </div>

              <div className="flex justify-center items-center pt-5 text-center">
                <span className="text-xs text-gray-600">
                  - Проверьте, чтобы пользователя с таким email ещё не было.
                </span>
              </div>
            </div>
            <div className="flex gap-6">
              <DropdownRadio
                success={values.gender !== "" && !errors.gender}
                error={errors.gender && touched.gender}
                text="Пол"
                items={["Мужской", "Женский"]}
                name="gender"
                values={values}
              />
              <DropdownRadio
                success={
                  values.education_field !== "" && !errors.education_field
                }
                error={errors.education_field && touched.education_field}
                text="Область образования"
                items={[
                  "Гумманитарное",
                  "Техническое",
                  "Химия, биология и производные",
                  "Естественные науки",
                  "Социальное, управленческое",
                  "Экономическое",
                ]}
                name="education_field"
                values={values}
              />
              <DropdownRadio
                success={
                  values.education_level !== "" && !errors.education_level
                }
                error={errors.education_level && touched.education_level}
                text="Область образования"
                items={[
                  "Без образования",
                  "Среднее общее",
                  "Среднее специальное",
                  "Высшее",
                ]}
                name="education_level"
                values={values}
              />
              <DropdownRadio
                success={values.work_accident !== "" && !errors.work_accident}
                error={errors.work_accident && touched.work_accident}
                text="Конфликты на работе"
                items={["Да", "Нет"]}
                name="work_accident"
                values={values}
              />
            </div>
            <div className="flex gap-6 mt-6">
              <DropdownRadio
                success={values.is_married !== "" && !errors.is_married}
                error={errors.is_married && touched.is_married}
                text="В браке"
                items={["Да", "Нет"]}
                name="is_married"
                values={values}
              />
              <DropdownRadio
                success={values.is_house !== "" && !errors.is_house}
                error={errors.is_house && touched.is_house}
                text="Есть постоянное место жительства"
                items={["Да", "Нет"]}
                name="is_house"
                values={values}
              />
              <DropdownRadio
                success={values.is_child !== "" && !errors.is_child}
                error={errors.is_child && touched.is_child}
                text="Есть дети"
                items={["Да", "Нет"]}
                name="is_child"
                values={values}
              />
            </div>
            <ButtonPrimary
              type="submit"
              isLoading={result.isLoading}
              className="mt-12 mb-12"
            >
              Обновить
            </ButtonPrimary>
          </Block>
        </Form>
      )}
    </Formik>
  );
});
