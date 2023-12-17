import { Typography } from "@material-tailwind/react";
import { memo } from "react";
import number1 from "../../assets/landing_number1.png";
import number2 from "../../assets/landing_number2.png";
import number3 from "../../assets/landing_number3.png";
import file from "../../assets/lending_icon_file.svg";
import arrow from "../../assets/arrow.svg";

export default memo(function LandingRoadMap() {
  return (
    <div className="flex w-full bg-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-16 py-12">
        <Typography variant="h2" className="font-normal">
          Как это работает?
        </Typography>
        <div className="flex gap-64 flex-col">
          <div className="flex justify-between items-center w-full relative">
            <img src={number1} alt="" className="w-52" />
            <div className="flex gap-6 flex-col w-5/12">
              <Typography variant="h3">
                <span className="text-mainYellow">Анализ </span>корпоративной
                почты
              </Typography>
              <Typography variant="paragraph" className="text-[#4E3800]">
                Наш инструмент мониторит активность сотрудников в обработке
                электронной почты, выявляя потенциальные сигналы недовольства.
              </Typography>
            </div>
            <div className="w-52 flex justify-center">
              <img src={file} alt="" className="w-32" />
            </div>
            <img
              src={arrow}
              alt=""
              className="absolute w-[920px] -bottom-60 left-24"
            />
          </div>

          <div className="flex flex-row-reverse justify-between items-center w-full relative">
            <img src={number2} alt="" className="w-52" />
            <div className="flex gap-6 flex-col w-5/12">
              <Typography variant="h3">
                <span className="text-mainYellow">Прогноз </span>Увольнения
              </Typography>
              <Typography variant="paragraph" className="text-[#4E3800]">
                Оценка данных вовлеченности, анализ работоспособности и
                обработка сигналов позволяют предсказывать при помощи моделей
                машинного обучения возможные вероятности увольнения сотрудников.
              </Typography>
            </div>
            <div className="w-52 flex justify-center">
              <img src={file} alt="" className="w-32" />
            </div>
            <img
              src={arrow}
              alt=""
              className="absolute w-[910px] -bottom-60 left-24 -scale-x-100"
            />
          </div>
          <div className="flex justify-between items-start w-full">
            <img src={number3} alt="" className="w-52" />
            <div className="flex gap-6 flex-col w-5/12">
              <Typography variant="h3">
                <span className="text-mainYellow">Анализ </span>корпоративной
                почты
              </Typography>
              <Typography variant="paragraph" className="text-[#4E3800]">
                Наш инструмент мониторит активность сотрудников в обработке
                электронной почты, выявляя потенциальные сигналы недовольства.
              </Typography>
            </div>
            <div className="w-52 flex justify-center">
              <img src={file} alt="" className="w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
