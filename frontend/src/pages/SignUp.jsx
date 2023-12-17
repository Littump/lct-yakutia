import { Input, Button, Typography } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { memo, useEffect } from "react";
import { useSignupMutation } from "../services/Service";
import { useNavigate } from "react-router-dom";
import { DropdownFile } from "../components/UI/DropdownFile";
import { useDispatch, useSelector } from "react-redux";
import { deleteLogo, setLogo } from "../store/reducers/signupReducer";
import { ButtonPrimary } from "../components/UI/ButtonPrimary";
import { InputPrimary } from "../components/UI/InputPrimary";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Слишком короткий!")
    .max(150, "Слишком длинный!")
    .required("Введите имя пользователя"),
  name: Yup.string()
    .min(1, "Слишком короткое!")
    .required("Введите название компании"),
  email: Yup.string().email("неверно указана почта").required("Введите почту"),
  password: Yup.string()
    .min(8, "Пароль слишком короткий")
    .matches(/^(?=.*[a-zA-Z])/, "пароль должен содержать латинские буквы")
    .matches(/^(?=.*[0-9])/, "Пароль должен содержать хотя бы одну цифру")
    .matches(
      /^(?=.*[!@#%&_-])/,
      "Пароль должен сожержать специальный знак - !@#%&_-"
    )
    .required("Введите пароль"),
});

export default memo(function SignIn() {
  const [signup, result] = useSignupMutation();
  const currentImg = useSelector((state) => state.signup.currentImg);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteImg = () => {
    dispatch(deleteLogo());
  };

  useEffect(() => {
    if (result.isSuccess) {
      navigate("/login");
    } else if (result.isError) {
      if (result.error.data.password[0]) {
        alert(result.error.data.password[0]);
      } else if (result.error.data.email[0]) {
        alert(result.error.data.email[0]);
      } else if (result.error.data.username[0]) {
        alert(result.error.data.username[0]);
      }
    }
  }, [result, navigate]);

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        username: "",
        email: "",
        password: "",
        name: "",
      }}
      onSubmit={(values) => {
        if (currentImg) {
          signup({
            username: values.username,
            email: values.email,
            password: values.password,
            name: values.name,
            logo: currentImg,
          });
        }
      }}
    >
      {({ values, handleBlur, handleChange, touched, errors }) => (
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
            Регистрируйтесь!
          </Typography>
          <div className="mt-10">
            <div className="flex">
              <div className="w-4/12 relative">
                <DropdownFile
                  className="w-full text-center h-72"
                  text="Выберите лого"
                  dispatch={(payload) => dispatch(setLogo(payload))}
                  fileName={currentImg?.name}
                />
                <span className="absolute -bottom-5 text-xs left-0 text-mainRed">
                  {!currentImg ? "добавьте картинку" : ""}
                </span>
              </div>
              <div className="w-6/12 pl-8 flex flex-col h-72 justify-between">
                <InputPrimary
                  type="name"
                  name="username"
                  placeholder="Имя пользователя"
                  errors={errors}
                  touched={touched}
                />
                <InputPrimary
                  type="name"
                  name="name"
                  placeholder="Название компании"
                  errors={errors}
                  touched={touched}
                />
                <InputPrimary
                  type="email"
                  name="email"
                  placeholder="ivan@gmail.com"
                  errors={errors}
                  touched={touched}
                />
                <InputPrimary
                  type="password"
                  name="password"
                  placeholder="введите пароль"
                  errors={errors}
                  touched={touched}
                />
              </div>
            </div>
            <div className="mt-12 flex w-10/12">
              <ButtonPrimary
                type="submit"
                className="w-full"
                isLoading={result.isLoading}
              >
                Создать аккаунт
              </ButtonPrimary>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
});
