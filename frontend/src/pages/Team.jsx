import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate, useParams } from "react-router-dom";
import { Input, Typography } from "@material-tailwind/react";
import TeamTable from "../components/TeamTable";
import { useDeleteTeamMutation, useGetWorkersQuery } from "../services/Service";
import { addWorkersReducer } from "../store/reducers/companyDataReducer";
import { Block } from "../components/UI/Block";
import ProbabilityChart from "../components/ProbabilityChart";
import { Formik } from "formik";
import { RadioGroup } from "../components/UI/RadioGroup";
import { RedirectLink } from "../components/UI/RedirectLink";
import ColumnChart from "../components/ColumnChart";
import { Dropdown } from "../components/UI/Dropdown";
import { addChartActiveFilters } from "../constants/filters";
import DownloadCSV from "../components/DownloadCSV";
import { RecalculateTeam } from "../components/UI/RecalculateTeam";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Team() {
  const { teamId } = useParams();
  const { data, isLoading, isSuccess } = useGetWorkersQuery(teamId, {
    pollingInterval: 2500,
  });
  const dispatch = useDispatch();
  const teamInfo = useSelector((state) =>
    state.company?.teams.find((el) => el?.id === +teamId)
  );
  const [deleteTeam] = useDeleteTeamMutation();
  const navigate = useNavigate();

  const deleteTeamHandler = (teamId) => {
    deleteTeam(teamId);
    navigate("/");
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      dispatch(addWorkersReducer({ workers: data, teamId }));
    }
  }, [data, isSuccess, isLoading]);

  const probabilities = [10, 50, 60, 40, 30, 10, 20, 50, 10];

  const mainChartActiveFilters = ["По месяцам", "По годам"];

  return (
    <Formik
      initialValues={{
        search: "",
        mainChartActiveFilter: "По месяцам",
        addChartActiveFilter: "Возраст",
      }}
      onSubmit={() => {}}
    >
      {({ values, handleChange }) => (
        <Form className="w-full">
          <div className="flex flex-col pb-40">
            <div className="w-full flex gap-8 items-center shadow-sm pb-6 bg-white px-16">
              <Typography variant="h3">{teamInfo?.name}</Typography>
              <Dropdown
                rotate={true}
                items={[
                  {
                    variant: "link",
                    text: "редактировать",
                    to: `updateTeam`,
                  },
                  {
                    variant: "button",
                    text: "удалить",
                    function: () => {
                      deleteTeamHandler(teamId);
                    },
                  },
                ]}
              />
              <div className="flex gap-6 items-center ml-auto">
                <Typography variant="paragraph" className="font-bold">
                  {teamInfo?.head_name}
                </Typography>
                <Typography variant="small">
                  {teamInfo?.head_contact}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col gap-10 justify-start items-center w-full px-10">
              {/* <Block className="m-10 flex flex-col gap-8 w-full">
                  <div className="flex justify-between items-center">
                    <Typography variant="h3">
                      Общий уровень удовлетворенности
                    </Typography>
                    <RadioGroup
                      items={mainChartActiveFilters}
                      values={values}
                      name="mainChartActiveFilter"
                      className="flex flex-wrap gap-4"
                    />
                  </div>
                  <ProbabilityChart
                    probabilities={probabilities}
                    activeFilter={values.mainChartActiveFilter}
                  />
                </Block>
         */}
              <div className="flex w-full flex-col gap-4  mt-10 items-start">
                <Typography variant="h3" className="ml-6 mb-4">
                  Распределение по признакам
                </Typography>
                <div className="flex gap-6 w-full">
                  <Block className="w-5/12">
                    <ColumnChart
                      workers={teamInfo?.workers}
                      activeFilter={values.addChartActiveFilter}
                    />
                  </Block>
                  <Block className="w-7/12">
                    <RadioGroup
                      items={addChartActiveFilters}
                      values={values}
                      variant="filled"
                      name="addChartActiveFilter"
                      className="flex flex-wrap gap-4"
                    />
                  </Block>
                </div>
              </div>
              <div className="w-full flex flex-col gap-4">
                <div className="flex justify-start">
                  <Typography variant="h3" className="ml-6 mr-6">
                    Персонал
                  </Typography>
                  <RecalculateTeam teamId={teamId} />
                  <div className="flex ml-auto gap-6 items-center">
                    <DownloadCSV text="скачать таблицу" />
                    <RedirectLink to="addWorker">
                      Добавить работника
                    </RedirectLink>
                  </div>
                </div>
                <div className="w-1/2 mt-8">
                  <Input
                    name="search"
                    value={values.search}
                    onChange={handleChange}
                    label="Поиск"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
                <TeamTable
                  workers={teamInfo?.workers}
                  search={values?.search}
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
