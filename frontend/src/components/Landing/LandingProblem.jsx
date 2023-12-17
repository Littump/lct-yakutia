import { Typography } from "@material-tailwind/react";
import { memo } from "react";
import lamp from "../../assets/lending_icon_lamp.png";

export default memo(function LandingProblem() {
  return (
    <div className="flex overflow-hidden h-[400px] py-16 login-gradient justify-center">
      <div className="max-w-5xl flex gap-16 text-white">
        <div className="flex flex-col gap-16 w-2/3">
          <Typography variant="h3" className="font-normal">
            {"Проблема, которую мы решаем:".toUpperCase()}
          </Typography>
          <Typography variant="paragraph" className="font-normal w-2/3">
            Снижение темпа работы сотрудником при работе с сообщениями
            электронной почты может коррелировать с недовольством работником
            текущими условиями труда и дальнейшим увольнением.
          </Typography>
        </div>
        <img src={lamp} alt="" />
      </div>
    </div>
  );
});
