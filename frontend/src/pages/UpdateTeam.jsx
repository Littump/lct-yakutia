import { Typography } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputPrimary } from "../components/UI/InputPrimary";
import { ButtonPrimary } from "../components/UI/ButtonPrimary";
import { useUpdateTeamMutation } from "../services/Service";
import { useSelector } from "react-redux";
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

export default memo(function UpdateTeam() {
  const { teamId } = useParams();
  const [updateTeam, result] = useUpdateTeamMutation();
  const navigate = useNavigate();
  const teamInfo = useSelector((state) =>
    state.company?.teams.find((el) => el?.id === +teamId)
  );
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        name: teamInfo?.name,
        description: teamInfo?.description,
        head_contact: teamInfo?.head_contact,
        head_name: teamInfo?.head_name,
      }}
      onSubmit={(values) => {
        updateTeam({
          name: values.name,
          head_name: values.head_name,
          head_contact: values.head_contact,
          description: values.description,
          teamId,
        });
        navigate(`/team/${teamId}`);
      }}
    >
      {({ touched, errors }) => (
        <Form className="w-full p-10">
          <Block className="flex items-center flex-col gap-6 relative">
            <Typography variant="h3">Обновить информацию о команде</Typography>
            <div className="max-w-[800px] w-full grid grid-cols-2 my-10  gap-6">
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
              className="mt-4 w-96"
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
