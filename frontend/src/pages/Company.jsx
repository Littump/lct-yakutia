import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import { Input, Typography } from "@material-tailwind/react";
import TeamTable from "../components/TeamTable";
import { addChartActiveFilters } from "../constants/filters";
import { useGetAllWorkersQuery } from "../services/Service";
import { setAllWorkers } from "../store/reducers/companyDataReducer";
import { Block } from "../components/UI/Block";
import ProbabilityChart from "../components/ProbabilityChart";
import { Formik } from "formik";
import { RadioGroup } from "../components/UI/RadioGroup";
import ColumnChart from "../components/ColumnChart";
import { Dropdown } from "../components/UI/Dropdown";
import { RecalculateCompany } from "../components/UI/RecalculateCompany";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Company() {
  const { data, isLoading, isSuccess, isError } = useGetAllWorkersQuery();
  const dispatch = useDispatch();
  const companyInfo = useSelector((state) => state.company.companyInfo);
  useEffect(() => {
    if (isSuccess && !isLoading) {
      console.log(data.results);
      dispatch(setAllWorkers(data.results));
    }
  }, [data, isSuccess, isLoading]);

  const probabilities = [10, 50, 60, 40, 30, 10, 20, 50, 10];

  const mainChartActiveFilters = ["По месяцам", "По годам"];
  return (
    <Formik
      initialValues={{
        mainChartActiveFilter: "По месяцам",
        addChartActiveFilter: "Возраст",
      }}
      onSubmit={() => {}}
    >
      {({ values, handleChange }) => (
        <Form className="w-full">
          <div className="flex flex-col pb-40">
            <div className="w-full flex gap-8 items-center shadow-sm pb-6 bg-white px-16">
              <div className="flex gap-4 items-center">
                {isLoading || isError ? (
                  <div className="skeleton w-12 h-12 bg-gray-200 rounded-full"></div>
                ) : (
                  <img
                    src={companyInfo?.img}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <Typography variant="h3">{companyInfo?.name}</Typography>
              </div>
              <Dropdown
                rotate={true}
                items={[
                  {
                    variant: "link",
                    text: "редактировать",
                    to: `updateCompany`,
                  },
                ]}
              />
            </div>
            <div className="flex flex-col gap-10 justify-start  items-center w-full px-10">
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
              </Block> */}
              <div className="flex w-full flex-col gap-4 mt-10 items-start">
                <Typography variant="h3" className="ml-6 mb-4">
                  Распределение по признакам
                </Typography>
                <div className="flex gap-6 w-full">
                  <Block className="w-1/3">
                    <ColumnChart
                      workers={companyInfo?.allWorkers}
                      activeFilter={values.addChartActiveFilter}
                    />
                  </Block>
                  <Block className="w-2/3">
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
                <div className="flex justify-between">
                  <Typography variant="h3" className="ml-6">
                    Весь персонал
                  </Typography>
                  <RecalculateCompany />
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
                  workers={companyInfo?.allWorkers}
                  variant="allWorkers"
                  search={values.search}
                />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
