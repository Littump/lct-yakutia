import { memo } from "react";
import logo1 from "../assets/companyLogo.png";
import logo2 from "../assets/companyLogo2.png";
import { RedirectLink } from "./UI/RedirectLink";

export default memo(function LoginNavbar({ variant }) {
  return (
    <div
      className={
        "w-[100vw] z-40 h-20 bg-white flex items-center px-10 " +
        (variant != "login" ? " fixed top-0 left-0" : "")
      }
    >
      <img src={logo1} alt="" className="w-[200px]" />
      <img src={logo2} alt="" className="w-[50px] ml-2" />
      {variant != "login" ? (
        <div className="flex gap-4 ml-auto">
          <RedirectLink to="/login" variant="outlined" className=" text-dark">
            Войти
          </RedirectLink>
          <RedirectLink
            to="/registration"
            variant="filled"
            className=" text-white"
          >
            Регистрация
          </RedirectLink>
        </div>
      ) : (
        ""
      )}
    </div>
  );
});
