import { memo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Block } from "../components/UI/Block";
import ProbabilityDiagram from "../components/ProbabilityDiagram";
import { Typography } from "@material-tailwind/react";
import { ButtonPrimary } from "../components/UI/ButtonPrimary";
import { useDeleteWorkerMutation } from "../services/Service";
import { animateScroll as scroll } from "react-scroll";
import getEducationLevel from "../helpers/getEducationLevel";
import getEducationField from "../helpers/getEducationField";
import AddMessagesByCSV from "../components/addMessagesByCSV";
import { RecalculateWorker } from "../components/UI/RecalculateWorker";

export default memo(function Worker() {
  let { workerId, teamId } = useParams();
  const navigate = useNavigate();
  const [deleteWorker, result] = useDeleteWorkerMutation();
  const workerInfo = useSelector((state) =>
    state.company?.teams
      .find((el) => el?.id === +teamId)
      ?.workers.find((el) => el?.id === +workerId)
  );
  const teamInfo = useSelector((state) =>
    state.company?.teams.find((el) => el?.id === +teamId)
  );

  const deleteWorkerHandler = (workerId) => {
    deleteWorker(workerId);
    navigate("/");
  };

  const workerInfoList1 = [
    {
      heading: "Возраст",
      value: workerInfo?.age,
    },
    {
      heading: "Зарплата",
      value: workerInfo?.salary + "₽",
    },
    {
      heading: "Изменение зарплаты за полгода",
      value: workerInfo?.change_salary_period + "₽",
    },
    {
      heading: "Часов в неделю работает",
      value: workerInfo?.work_hours_week,
    },
    {
      heading: "Всего лет работает в компании",
      value: workerInfo?.years_at_company,
    },
    {
      heading: "Пол",
      value: workerInfo?.is_male == 1 ? "мужской" : "женский",
    },
  ];
  const workerInfoList2 = [
    {
      heading: "Область образования",
      value: getEducationField(workerInfo?.education_field),
    },
    {
      heading: "Уровень образования",
      value: getEducationLevel(workerInfo?.education_level),
    },

    {
      heading: "Есть ребёнок",
      value: workerInfo?.is_child == 0 ? "нет" : "да",
    },
    {
      heading: "Есть постоянное место жительство",
      value: workerInfo?.is_house == 0 ? "нет" : "да",
    },

    {
      heading: "Всего лет опыта работы",
      value: workerInfo?.total_working_years,
    },
    {
      heading: "Были ли конфликты на работе",
      value: workerInfo?.work_accident == 0 ? "нет" : "да",
    },
  ];
  const recomendations = [
    {
      heading: "Индивидуальные беседы и обратная связь:",
      list: [
        "Проведите индивидуальную встречу для обсуждения рабочих задач, достижений и профессиональных целей сотрудника.",
        "Выявите актуальные проблемы, опасения и разработайте ряд мер по их компенсации.",
      ],
    },
    {
      heading: "Развитие карьеры и обучение:",
      list: [
        "Определите карьерные амбиции сотрудника и предложите персонализированную программу развития.",
        "Обеспечивайте доступ к обучающим ресурсам и возможностям для профессионального роста.",
      ],
    },
    {
      heading: "Гибкий график и баланс:",
      list: [
        "Рассмотрите возможность установки гибкого графика работы или предоставления времени для работы из дома.",
        "Обсудите с сотрудником вопросы баланса между работой и личной жизнью, предоставляйте необходимую поддержку.",
      ],
    },
    {
      heading: "Мотивационные программы:",
      list: [
        "Установите индивидуальные цели и стимулируйте их достижение при помощи индивидуальных мотивационных программ.",
        "Рассмотрите возможность предоставления бонусов или премий за выдающиеся результаты.",
      ],
    },
    {
      heading: "Создание комфортной среды:",
      list: [
        "Обеспечивайте комфортные условия труда, учитывая предпочтения и потребности сотрудника.",
        "Решайте вопросы, связанные с рабочим пространством и оборудованием, чтобы обеспечить оптимальные условия труда.",
      ],
    },
    {
      heading: "Проактивное управление конфликтами:",
      list: [
        "Будьте внимательными к знакам конфликта и предлагайте поддержку в разрешении возникающих проблем.",
        "Слушайте мнение сотрудника, стимулируйте открытый диалог.",
      ],
    },
    {
      heading: "Персональные инициативы:",
      list: [
        "Поощряйте сотрудника к предложению своих идей и инициатив, предоставляйте возможность для их внедрения.",
        "Оценивайте и внедряйте положительные изменения, предложенные сотрудником.",
      ],
    },
  ];
  const n = Math.floor(Math.random() * recomendations.length);
  useEffect(() => {
    scroll.scrollToTop();
    if (workerInfo?.probability == undefined) navigate(`/team/${teamId}`);
  }, [workerInfo]);

  return (
    <div className="flex flex-col bg-light gap-4 px-8 pt-6 pb-64 text-dark ">
      <div className="flex gap-4">
        <Block className=" w-1/3">
          <div className="flex flex-col gap-8 items-center  text-center">
            <ProbabilityDiagram
              probability={Math.floor(workerInfo?.probability * 100)}
            />
            <div className="flex flex-col gap-4 ">
              <Typography variant="h3">{workerInfo?.name}</Typography>
              <Typography variant="paragraph" className="text-lg font-[300]">
                {workerInfo?.role}
              </Typography>
              <Typography variant="paragraph" className="text-lg font-[300] ">
                {teamInfo?.name}
              </Typography>
            </div>
          </div>
        </Block>
        <AddMessagesByCSV className="w-2/3" />
      </div>
      <div className="flex flex-col gap-6 py-3">
        <Typography variant="h3">Информация:</Typography>
        <Block>
          <div className="grid grid-cols-2 w-full">
            <div className="flex flex-col gap-6">
              {workerInfoList1.map((info) => {
                return (
                  <div key={info?.heading}>
                    <span className="font-bold">{info?.heading}:</span>{" "}
                    {info?.value}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-6">
              {workerInfoList2.map((info) => {
                return (
                  <div key={info?.heading}>
                    <span className="font-bold">{info?.heading}:</span>{" "}
                    {info?.value}
                  </div>
                );
              })}
            </div>
          </div>
          {workerInfo?.probability >= 0.4 ? (
            <div className="w-full max-w-[700px] mt-10">
              <Typography variant="h3" className="my-4">
                Рекомендация
              </Typography>
              <span className="font-bold text-lg px-2">
                {recomendations[n].heading}
              </span>{" "}
              <ul className="list-disc px-6">
                <li className="my-1">{recomendations[n].list[0]}</li>
                <li className="my-1">{recomendations[n].list[1]}</li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </Block>
      </div>
      <div className="flex gap-6">
        <RecalculateWorker workerId={workerId} />
        <ButtonPrimary
          className="w-96"
          onClick={() => {
            if (confirm("Вы точно хотите убрать работника из списка прогнозов"))
              deleteWorkerHandler(workerId);
          }}
          variant="filled"
        >
          Убрать работника из списка прогнозов
        </ButtonPrimary>
      </div>
    </div>
  );
});
