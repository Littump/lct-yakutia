import { Typography } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropdownFile } from "../components/UI/DropdownFile";
import {
  deleteCurrentImg,
  setCurrentImg,
} from "../store/reducers/companyDataReducer";
import { useUpdateMeMutation } from "../services/Service";
import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../components/UI/ButtonPrimary";
import { InputPrimary } from "../components/UI/InputPrimary";
import { Block } from "../components/UI/Block";
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
});

export default memo(function UpdateCompany() {
  const companyInfo = useSelector((state) => state.company.companyInfo);
  const currentImg = useSelector((state) => state.company.currentImg);
  const profileImg = useSelector((state) => state.company.companyInfo.img);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateMe, result] = useUpdateMeMutation();

  useEffect(() => {
    if (result.isSuccess) {
      navigate("/");
    }
  }, [result]);
  if (companyInfo.name == null) return null;
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        name: companyInfo.name,
        username: companyInfo.username,
        email: companyInfo.email,
      }}
      onSubmit={(values) => {
        updateMe({
          name: values.name,
          username: values.username,
          email: values.email,
          logo: currentImg,
        });
      }}
    >
      {({ values, handleBlur, handleChange, touched, errors }) => (
        <Form className="w-full p-10">
          <Block className="flex flex-col items-center">
            <Typography variant="h3" className="mt-12">
              Редактировать информацию о компании
            </Typography>
            <div className="max-w-[800px] w-full flex gap-8 my-10">
              <DropdownFile
                className="w-80 hover:bg-blue-gray-50 text-center h-72"
                text="Выберите новоё лого"
                fileName={!currentImg?.name ? profileImg : currentImg?.name}
                dispatch={(payload) => dispatch(setCurrentImg(payload))}
              />
              <div className="flex flex-col h-72 gap-6 w-full">
                <div>
                  <Typography variant="h6">Название компании</Typography>
                  <InputPrimary
                    type="name"
                    name="name"
                    placeholder="Компания"
                    errors={errors}
                    touched={touched}
                    variant="light"
                  />
                </div>
                <div>
                  <Typography variant="h6">Имя пользователя</Typography>
                  <InputPrimary
                    type="name"
                    name="username"
                    placeholder="user123"
                    errors={errors}
                    touched={touched}
                    variant="light"
                  />
                </div>
                <div>
                  <Typography variant="h6">Почта</Typography>
                  <InputPrimary
                    type="email"
                    name="email"
                    placeholder="somemail@mail.ru"
                    errors={errors}
                    touched={touched}
                    variant="light"
                  />
                </div>
              </div>
            </div>
            <ButtonPrimary
              type="submit"
              className="mt-4 w-full max-w-[800px] mb-12"
              isLoading={result.isLoading}
            >
              Обновить
            </ButtonPrimary>
          </Block>
        </Form>
      )}
    </Formik>
  );
});
