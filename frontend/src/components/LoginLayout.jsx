import { memo } from "react";
import { Typography } from "@material-tailwind/react";
import { RedirectLink } from "./UI/RedirectLink";
import LoginNavbar from "./LoginNavbar";

export default memo(function LoginLayout({ children }) {
  return (
    <div className="flex flex-col h-[100vh] w-[100vw]">
      <LoginNavbar variant="login" />
      <div className=" flex h-full ">
        <div className="w-4/12 py-28 px-20 bg-dark flex text-light flex-col justify-center gap-6">
          <Typography variant="h3">Добро пожаловать!</Typography>
          <Typography variant="paragraph">
            Сервис прогнозирования увольнения на основе вовлеченности сотрудника
          </Typography>
          <Typography variant="paragraph">
            Лидеры цифровой трансформации Якутия
          </Typography>
          <RedirectLink to="/registration" variant="outlined" className="mt-10">
            Регистрация
          </RedirectLink>
        </div>
        <div className="w-8/12 px-28 login-gradient flex justify-start items-center shadow-2xl shadow-black z-10 ">
          {children}
        </div>
      </div>
    </div>
  );
});
