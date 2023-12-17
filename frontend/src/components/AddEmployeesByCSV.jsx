import { memo, useEffect, useState } from "react";
import {
  useAddEmployeesByCSVMutation,
  useAddMessagesByCSVMutation,
} from "../services/Service";
import { Typography } from "@material-tailwind/react";
import { DropdownFile } from "./UI/DropdownFile";
import DownloadCSV from "./DownloadCSV";
import { useDispatch, useSelector } from "react-redux";
import { setEmployeesCSV, setMessagesCSV } from "../store/reducers/csvReducer";
import { ButtonPrimary } from "./UI/ButtonPrimary";
import { useNavigate, useParams } from "react-router-dom";
import { Block } from "./UI/Block";

export default memo(function AddEmployeesByCSV({ className }) {
  const [isOkey, setisOkey] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teamId } = useParams();
  const employeesCSVFile = useSelector((state) => state.csv?.employeesCSV);
  const messagesCSVFile = useSelector((state) => state.csv?.messagesCSV);
  const [addEmployeesByCSV, result] = useAddEmployeesByCSVMutation();
  const [addMessagesByCSV] = useAddMessagesByCSVMutation();

  useEffect(() => {
    if (result.isSuccess) {
      navigate(`/team/${teamId}`);
    }
  }, []);

  return (
    <Block className={"flex flex-col items-center " + className}>
      <div className="mt-6 mb-6 flex flex-col gap-4 items-center">
        <Typography variant="h4">Добавить таблицей</Typography>
        <div className="flex gap-6">
          <div className="flex flex-col">
            <DownloadCSV text="скачать шаблон" className="text-sm mb-4" />
            <DropdownFile
              fileName={employeesCSVFile?.name}
              className=" text-center h-44 w-52 px-10 hover:bg-gray-200"
              text="Загрузите таблицу Работников"
              dispatch={(payload) => dispatch(setEmployeesCSV(payload))}
            ></DropdownFile>
            <span className="text-sm text-mainRed ml-4 mt-2">
              {!isOkey && employeesCSVFile?.name == undefined
                ? "загрузите таблицу"
                : ""}
            </span>
          </div>
          <div className="flex flex-col">
            <DownloadCSV
              text="скачать шаблон"
              variant="messages"
              className="text-sm mb-4"
            />
            <DropdownFile
              fileName={messagesCSVFile?.name}
              className=" text-center h-44 w-52 px-10 hover:bg-gray-200"
              text="Загрузите таблицу Сообщений"
              dispatch={(payload) => dispatch(setMessagesCSV(payload))}
            ></DropdownFile>
            <span className="text-sm text-mainRed ml-4 mt-2">
              {!isOkey && messagesCSVFile?.name == undefined
                ? "загрузите таблицу"
                : ""}
            </span>
          </div>
        </div>
        <ButtonPrimary
          isLoading={result?.isLoading}
          className="mt-4 w-96"
          onClick={() => {
            let goOut = false;
            if (
              messagesCSVFile?.name == undefined ||
              employeesCSVFile?.name == undefined
            ) {
              setisOkey(false);
              goOut = true;
            } else {
              setisOkey(true);
            }
            if (!goOut) {
              addEmployeesByCSV(employeesCSVFile);
              addMessagesByCSV(messagesCSVFile);
            }
          }}
        >
          Отправить
        </ButtonPrimary>
        <Typography
          variant="paragraph"
          className="mx-auto w-72 text-center text-gray-600 text-xs"
        >
          Убедитесь, что все отделы, в которых работают сотрудники, были
          добавлены в систему и у всех пользователей различные email
        </Typography>
      </div>
    </Block>
  );
});
