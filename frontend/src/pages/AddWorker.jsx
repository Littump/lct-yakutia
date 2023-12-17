import { Typography } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddWorkerMutation } from "../services/Service";
import { InputPrimary } from "../components/UI/InputPrimary";
import { ButtonPrimary } from "../components/UI/ButtonPrimary";
import { DropdownRadio } from "../components/UI/DropdownRadio";
import getEducationField from "../helpers/getEducationField";
import getEducationLevel from "../helpers/getEducationLevel";
import AddEmployeesByCSV from "../components/AddEmployeesByCSV";
import { Block } from "../components/UI/Block";
import ProbabilityDiagram from "../components/ProbabilityDiagram";
import { useSelector } from "react-redux";
import * as yup from "yup";
import AddMessagesByCSV from "../components/AddMessagesByCSV";

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
  work_accident: yup.string().required("Выберите значение"),
});

export default memo(function AddWorker() {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const teamInfo = useSelector((state) =>
    state.company?.teams.find((el) => el?.id === +teamId)
  );
  console.log(teamInfo);
  let avarageprobability = teamInfo?.workers.reduce(
    (sum, el) => sum + +el?.probability,
    0
  );
  const len = teamInfo?.workers?.length;
  if (len !== 0) avarageprobability /= len;
  else if (len == 0 || isNaN(avarageprobability)) avarageprobability = 0;
  const [addWorker, result] = useAddWorkerMutation();

  useEffect(() => {
    if (result.isSuccess) {
      navigate(`/team/${teamId}/`);
    }
    if (result.isError) {
      alert("Убедитесь, что почта и имя уникальны");
    }
  }, [result]);

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        age: "",
        change_salary_period: "",
        name: "",
        total_working_years: "",
        work_hours_week: "",
        years_at_company: "",
        salary: "",
        is_house: "",
        is_married: "",
        gender: "",
        mail: "",
        role: "",
        education_field: "",
        work_accident: "",
        education_level: "",
        is_child: "",
      }}
      onSubmit={(values, { resetForm }) => {
        addWorker({
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
        <Form className="w-full p-10 flex flex-col gap-8">
          <Typography variant="h3">Добавить работников</Typography>
          <div className="flex gap-4">
            <AddEmployeesByCSV className="w-2/3" />
            <Block className="flex items-center flex-col text-center gap-6 relative w-1/3">
              <ProbabilityDiagram
                probability={Math.floor(
                  (avarageprobability ? avarageprobability : 0) * 100
                )}
              />
              <div className="flex flex-col gap-4 ">
                <Typography variant="h3">{teamInfo?.name}</Typography>
                <Typography variant="paragraph" className="text-lg font-[300]">
                  Ответственный: {teamInfo?.head_name}
                </Typography>
                <Typography variant="paragraph" className="text-lg font-[300]">
                  Контакты: {teamInfo?.head_contact}
                </Typography>
                <Typography
                  variant="paragraph"
                  className="text-lg font-[300] absolute top-10 right-12"
                ></Typography>
              </div>
            </Block>
          </div>
          <Block className="flex flex-col items-center">
            <Typography variant="h3" className="mt-12">
              Добавить вручную
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
              className="mt-12 mb-12 w-96"
            >
              Добавить
            </ButtonPrimary>
          </Block>
          <AddMessagesByCSV />
        </Form>
      )}
    </Formik>
  );
});
