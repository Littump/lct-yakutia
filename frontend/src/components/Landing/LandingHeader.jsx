import { memo } from "react";
import { RedirectLink } from "../UI/RedirectLink";
import bg from "../../assets/lending_bg.png";
import { Typography } from "@material-tailwind/react";

export default memo(function LandingHeader() {
  return (
    <div className="bg-dark h-[610px] w-full flex justify-center items-start ">
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className={`bg-contain bg-no-repeat flex w-full h-full rounded-3xl flex-col justify-between overflow-hidden max-w-6xl`}
      >
        <div>
          <div>
            <Typography
              variant="h3"
              className="text-white font-normal bg-dark w-fit pl-2 pb-4 pt-6 pr-8 rounded-br-3xl"
            >
              {"Сервис прогнозирования увольнения".toUpperCase()}
            </Typography>
            <Typography
              variant="h3"
              className="text-white font-normal bg-dark w-fit pl-2 py-3 pr-24 rounded-br-3xl"
            >
              {"сотрудников".toUpperCase()}
            </Typography>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-y-8 font-light text-white w-8/12 px-4 py-12">
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-mainRed"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Раннее распознавание проблем
            </div>
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-mainRed"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Улучшение качества работы
            </div>
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-mainRed"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Экономия времени и ресурсов
            </div>
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-mainRed"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Снижение текучести кадров
            </div>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <RedirectLink to="/login" variant="light" className="ml-8 mb-8">
            Войти
          </RedirectLink>
          <div className="flex items-end flex-col ">
            <Typography
              variant="h3"
              className="text-red-200 font-normal bg-dark w-fit pr-4 py-3 pl-4 rounded-tl-3xl"
            >
              {"сотрудников".toUpperCase()}
            </Typography>
            <Typography
              variant="h3"
              className="text-red-200 font-normal bg-dark w-fit pr-4 pb-4 pt-6 pl-4 rounded-tl-3xl"
            >
              {"Сервис прогнозирования увольнения".toUpperCase()}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
});
