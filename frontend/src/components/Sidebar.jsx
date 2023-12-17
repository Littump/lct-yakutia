import { memo, useEffect } from "react";
import { SidebarLink } from "./UI/SidebarLink";
import { useDispatch, useSelector } from "react-redux";
import { useGetTeamsQuery } from "../services/Service";
import { setTeams } from "../store/reducers/companyDataReducer";
import {  useNavigate } from "react-router-dom";

export default memo(function Sidebar() {
  const teams = useSelector((state) => state.company.teams);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetTeamsQuery("", {
    pollingInterval: 5000,
  });
  useEffect(() => {
    if (isSuccess) {
      dispatch(setTeams(data.results));
    }
  }, [data]);

  return (
    <div className="h-[100vh] w-60 px-0 bg-body shadow-blue-gray-900/5 overflow-y-scroll overflow-x-hidden no-scroll fixed">
      <div className="px-0 flex flex-col h-full items-center">
        <SidebarLink variant="company" to="">
          Компания
        </SidebarLink>
        <SidebarLink variant="addTeam" to="addTeam">
          Добавить команду
        </SidebarLink>
        {teams.map((team) => {
          return (
            <SidebarLink key={team.id} to={`team/${team.id}`}>
              {team.name}
            </SidebarLink>
          );
        })}
        <button
          onClick={() => {
            if (confirm("Вы точно хотите выйти?")) {
              localStorage.removeItem("token");
              navigate("/");
            }
          }}
          className="text-sm mt-auto text-mainRed w-full flex justify-center items-center text-center py-2 transition hover:bg-[rgba(254,94,72,0.06)] "
        >
          выйти
        </button>
      </div>
    </div>
  );
});
