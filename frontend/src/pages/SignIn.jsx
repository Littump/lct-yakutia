import { Typography } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { memo, useEffect } from "react";
import { useSigninMutation } from "../services/Service";
import { useNavigate } from "react-router-dom";
import { InputPrimary } from "../components/UI/InputPrimary";
import { ButtonPrimary } from "../components/UI/ButtonPrimary";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Слишком короткий!")
    .max(150, "Слишком длинный!")
    .required("Введите имя пользователя"),
  password: Yup.string()
    .min(8, "Слишком короткий!")
    .max(150, "Слишком длинный!")
    .required("Введите пароль"),
});

export default memo(function SignUp() {
  const [signin, result] = useSigninMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (result.isSuccess) {
      localStorage.setItem("token", result.data.auth_token);
      navigate("/");
    }
    if (result.isError) {
      alert("неправильно указан пароль и логин");
    }
  }, [result, navigate]);

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        signin({
          username: values.username,
          password: values.password,
        });
      }}
    >
      {({ touched, errors }) => (
        <Form>
          <Typography
            variant="h4"
            className="text-light flex gap-2 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
            Вход в аккаунт
          </Typography>
          <div className="w-[450px] mt-10 flex flex-col gap-10">
            <InputPrimary
              type="name"
              name="username"
              placeholder="Имя пользователя"
              errors={errors}
              touched={touched}
            />
            <InputPrimary
              type="password"
              name="password"
              placeholder="Пароль"
              errors={errors}
              touched={touched}
            />
            <ButtonPrimary type="submit" isLoading={result.isLoading}>
              Войти
            </ButtonPrimary>
          </div>
        </Form>
      )}
    </Formik>
  );
});
