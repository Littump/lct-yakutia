import { memo, useEffect } from "react";
import { useAddMessagesByCSVMutation } from "../services/Service";
import { Typography } from "@material-tailwind/react";
import { DropdownFile } from "./UI/DropdownFile";
import DownloadCSV from "./DownloadCSV";
import { useDispatch, useSelector } from "react-redux";
import { ButtonPrimary } from "./UI/ButtonPrimary";
import { useNavigate, useParams } from "react-router-dom";
import { Block } from "./UI/Block";
import { setMessagesCSV } from "../store/reducers/csvReducer";

export default memo(function AddMessagesByCSV({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teamId, workerId } = useParams();
  const messagesCSVFile = useSelector((state) => state.csv.messagesCSV);
  const [addMessagesByCSV, result] = useAddMessagesByCSVMutation();

  useEffect(() => {
    if (result.isSuccess) navigate(`/team/${teamId}`);
  }, []);
  return (
    <Block className={"flex flex-col items-center" + className}>
      <div className="mt-6 mb-6 px-10 flex flex-col gap-4 items-center text-center">
        <Typography variant="h4">
          Загрузите сообщения таблицей для получения актуального прогноза модели
        </Typography>
        <DownloadCSV text="скачать шаблон таблицы" variant="messages" />
        <DropdownFile
          fileName={messagesCSVFile?.name}
          className=" text-center h-44 w-96 px-10 hover:bg-gray-200"
          text="Загрузите таблицу Сообщений"
          dispatch={(payload) => dispatch(setMessagesCSV(payload))}
        ></DropdownFile>
        <ButtonPrimary
          type="submit"
          isLoading={result?.isLoading}
          className="mt-4 w-96"
          onClick={() => {
            addMessagesByCSV(messagesCSVFile);
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
