import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Typography, Chip } from "@material-tailwind/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDeleteWorkerMutation } from "../services/Service";
import { Dropdown } from "./UI/Dropdown";

export default function TeamTable({ workers, variant, search = "" }) {
  const [sortBy, setSortBy] = useState({ filter: "id", type: "normal" });

  const [deleteWorker] = useDeleteWorkerMutation();

  const filter = {
    id: "id",
    Работник: "name",
    Специальность: "role",
    Прогноз: "probability",
    "Зар. плата": "salary",
    Работает: "years_at_company",
    "Изменение з/п (полгода)": "change_salary_period",
  };

  function byField(fieldName, type = "normal") {
    if (type == "reversed")
      return (a, b) => (a[fieldName] < b[fieldName] ? 1 : -1);
    return (a, b) => (a[fieldName] > b[fieldName] ? 1 : -1);
  }
  const deleteWorkerHandler = (id) => {
    if (confirm("Вы точно хотите удалить этого пользователя?")) {
      deleteWorker(id);
    }
  };
  if (workers == undefined) return null;
  return (
    <table className="mt-4 w-full table-auto text-left border border-gray-300  antialiased ">
      <thead className="">
        <tr>
          {[...Object.keys(filter), ""].map((head, index) => (
            <th
              onClick={() => {
                setSortBy((prev) => {
                  if (sortBy.filter == head)
                    return {
                      ...prev,
                      type: sortBy.type == "normal" ? "reversed" : "normal",
                    };
                  return { ...prev, filter: head };
                });
              }}
              key={index}
              className="cursor-pointer border-y border-blue-gray-100 bg-white p-4 transition-colors hover:bg-blue-gray-50"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="flex items-center justify-between py-2 gap-2 leading-none text-sm text-black font-semibold"
              >
                {head}{" "}
                {index !== Object.keys(filter).length && (
                  <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                )}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...workers]
          .sort(byField(filter[sortBy.filter], sortBy.type))
          .map(
            (
              {
                id,
                name,
                mail,
                department,
                role,
                probability,
                salary,
                years_at_company,
                change_salary_period,
              },
              index
            ) => {
              const isLast = index === workers.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              if (
                name?.toLowerCase().indexOf(search.toLowerCase()) === -1 &&
                mail?.toLowerCase().indexOf(search.toLowerCase()) === -1 &&
                role.toLowerCase().indexOf(search.toLowerCase()) === -1
              )
                return null;
              return (
                <tr key={id} className="bg-gray-50 border-t-0 border-x-0  ">
                  <td className={classes}>{id}</td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <NavLink
                        className="flex flex-col"
                        to={
                          variant == "allWorkers"
                            ? `team/${department}/worker/${id}`
                            : `worker/${id}`
                        }
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal underline"
                        >
                          {name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal underline"
                        >
                          {mail}
                        </Typography>
                      </NavLink>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {role}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={Math.floor(probability * 100) + "%"}
                        color={
                          probability >= 40
                            ? "red"
                            : probability >= 30
                            ? "yellow"
                            : "green"
                        }
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {salary} Р
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {years_at_company % 10 >= 5 ||
                      (years_at_company >= 10 && years_at_company <= 20)
                        ? years_at_company + " лет"
                        : years_at_company % 10 == 1
                        ? years_at_company + " год"
                        : years_at_company + " года"}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {change_salary_period} Р
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Dropdown
                      items={[
                        {
                          variant: "link",
                          text: "смотреть профиль",
                          to: `worker/${id}/`,
                        },
                        {
                          variant: "link",
                          text: "редактировать",
                          to: `worker/${id}/updateWorker`,
                        },
                        {
                          variant: "button",
                          text: "удалить",
                          function: () => {
                            deleteWorkerHandler(id);
                          },
                        },
                      ]}
                    />
                  </td>
                </tr>
              );
            }
          )}
      </tbody>
    </table>
  );
}
