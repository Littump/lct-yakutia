import { Typography } from "@material-tailwind/react";
import { memo } from "react";

export default memo(function LandingFeatures() {
  return (
    <div className="flex justify-center overflow-hidden h-[360px] bg-[#DFE2E9]">
      <div className="max-w-6xl w-full flex py-20 relative ">
        <div className="w-1/2 flex flex-col items-center relative">
          <Typography
            variant="h3"
            className="flex gap-4 items-end font-normal z-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Экономия ресурсов
          </Typography>
          <Typography variant="paragraph" className="w-80 py-8 z-20 ">
            потери компании при увольнении квалифицированного работника могут
            быть значительны.
          </Typography>
          <div className="absolute text-[160px] -bottom-14 left-20 text-gray-50 font-bold opacity-30">
            01
          </div>
        </div>
        <div className="absolute w-[2px] h-36 bg-gray-400 top-28 left-1/2"></div>
        <div className="w-1/2 flex flex-col items-center relative">
          <Typography
            variant="h3"
            className="flex gap-4 items-end font-normal z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
            Экономия ресурсов
          </Typography>
          <Typography variant="paragraph" className="w-64 py-8 z-10 font-light">
            имея инструмент, оценивающий вероятность его скорого увольнения,
            работодатель может среагировать на это, приняв ряд необходимых мер.
          </Typography>
          <div className="absolute text-[160px] -bottom-14 left-20 text-gray-50 font-bold opacity-30">
            02
          </div>
        </div>
      </div>
    </div>
  );
});
