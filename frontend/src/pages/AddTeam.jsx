import { Typography } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { InputPrimary } from "../components/UI/InputPrimary";
import { useAddTeamMutation } from "../services/Service";
import { ButtonPrimary } from "../components/UI/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { Block } from "../components/UI/Block";
import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Слишком короткое!")
    .max(150, "Слишком длинное!")
    .required("Введите название отдела"),
  description: yup
    .string()
    .min(3, "Слишком короткое!")
    .max(150, "Слишком длинное!")
    .required("Введите описание отдела"),
  head_contact: yup
    .string()
    .matches(phoneRegExp, "Номер телефона введён некорректно")
    .required("Введите номер телефона"),
  head_name: yup
    .string()
    .min(3, "Слишком короткое!")
    .max(150, "Слишком длинное!")
    .required("Введите имя ответственного"),
});

export default memo(function AddTeam() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addTeam, result] = useAddTeamMutation();

  useEffect(() => {
    if (result.isSuccess) {
      navigate("/");
    }
  }, [result]);

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        name: "",
        description: "",
        head_contact: "",
        head_name: "",
      }}
      onSubmit={(values, { resetForm }) => {
        addTeam({
          name: values.name,
          head_name: values.head_name,
          head_contact: values.head_contact,
          description: values.description,
        });
      }}
    >
      {({ touched, errors }) => (
        <Form className="w-full p-10">
          <Block className="flex flex-col items-center">
            <Typography variant="h3" className="mt-12">
              Добавить команду
            </Typography>
            <div className="w-2/3 grid grid-cols-2 my-10  gap-6">
              <div>
                <Typography variant="h6">Название команды</Typography>
                <InputPrimary
                  type="name"
                  name="name"
                  placeholder="Команда"
                  errors={errors}
                  touched={touched}
                  variant="light"
                />
              </div>
              <div>
                <Typography variant="h6">ФИО руководителя</Typography>
                <InputPrimary
                  type="name"
                  name="head_name"
                  placeholder="Иванов Иван Иванович"
                  errors={errors}
                  touched={touched}
                  variant="light"
                />
              </div>
              <div>
                <Typography variant="h6">
                  Номер телефона ответсвенного
                </Typography>
                <InputPrimary
                  type="phone"
                  name="head_contact"
                  placeholder="8666555224"
                  errors={errors}
                  touched={touched}
                  variant="light"
                />
              </div>
              <div>
                <Typography variant="h6">Описание</Typography>
                <InputPrimary
                  type="text"
                  name="description"
                  placeholder="Описание"
                  errors={errors}
                  touched={touched}
                  variant="light"
                />
              </div>
            </div>
            <ButtonPrimary
              type="submit"
              className="mt-4 w-96 mb-12"
              isLoading={result.isLoading}
            >
              Добавить команду
            </ButtonPrimary>
          </Block>
        </Form>
      )}
    </Formik>
  );
});
