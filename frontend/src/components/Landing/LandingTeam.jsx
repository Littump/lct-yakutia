import { Typography } from "@material-tailwind/react";
import { memo } from "react";
import andrew from "../../assets/team_andrew.png";
import max from "../../assets/team_max.png";
import du from "../../assets/team_du.png";
import roma from "../../assets/team_roma.png";

export default memo(function LandingTeam() {
  const teamData = [
    {
      name: "Андрей Горошко",
      role: "frontend-developer",
      university: "СПБГУ",
      tg: "andrew_pontific",
      img: andrew,
    },
    {
      name: "Ду юлия",
      role: "designer",
      university: "НИУ ИТМО",
      tg: "deyyudu",
      img: du,
    },
    {
      name: "Максим Игитов",
      role: "Team Lead/Data Scientist",
      university: "НИУ ИТМО ",
      tg: "MaksIgitov",
      img: max,
    },
    {
      name: "ЯКИМОВ РОМАН",
      role: "Backend-developer",
      university: "НИТУ МИСИС",
      tg: "littump",
      img: roma,
    },
  ];

  return (
    <div className="flex justify-center overflow-hidden bg-[#DFE2E9] h-[660px]">
      <div className="max-w-6xl w-full py-24">
        <Typography variant="h3" className="font-normal ml-16">
          КОМАНДА РАЗРАБОТЧИКОВ
        </Typography>
        <div className="grid grid-cols-4 gap-16 mt-16">
          {teamData.map((el) => (
            <div key={el.name} className="flex flex-col gap-6 items-center">
              <img src={el.img} alt="" className="w-52" />
              <div className="flex gap-2 flex-col items-center">
                <span className="font-bold">{el.name.toUpperCase()}</span>
                <span>{el.role.toUpperCase()}</span>
                <span>{el.university.toUpperCase()}</span>
                <a
                  href={"https://t.me/" + el.tg}
                  className="hover:text-mainRed transition"
                >
                  @{el.tg}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
