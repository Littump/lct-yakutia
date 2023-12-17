import { memo } from "react";
import logo from "../assets/companyLogo.png";
import { Typography } from "@material-tailwind/react";
import { RedirectLink } from "./UI/RedirectLink";

export default memo(function RegistrationLayout({ children }) {
  return (
    <div className="flex flex-col min-h-[100vh] h-[100vh] w-[100vmax] overflow-hidden">
      <div className="w-full h-20 bg-white  flex items-center px-10">
        <img src={logo} alt="" className="w-[200px]" />
      </div>
      <div className=" flex h-full ">
        <div className="w-4/12 py-20 px-16 bg-dark flex text-light flex-col justify-center gap-6">
          <Typography variant="h3">Попробуйте наш сервис!</Typography>
          <Typography variant="paragraph">
            Сервис прогнозирования увольнения на основе вовлеченности сотрудника
          </Typography>
          <Typography variant="paragraph">
            Лидеры цифровой трансформации Якутия
          </Typography>
          <RedirectLink to="/login" variant="outlined" className="mt-10">
            Войти
          </RedirectLink>
        </div>
        <div className="w-8/12 py-16 px-20 login-gradient shadow-2xl shadow-black z-10 ">
          {children}
        </div>
      </div>
    </div>
  );
});
