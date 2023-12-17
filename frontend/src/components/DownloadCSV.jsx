import { memo, useEffect } from "react";
import { downloadEmployeesCSV, downloadMessagesCSV } from "../services/Service";

export default memo(function DownloadCSV({
  variant = "employees",
  text,
  className,
}) {
  //   const { data, isLoading, isSuccess } = useDownloadEmployeesCSVQuery();
  useEffect(() => {}, []);
  function downloadClickHandler() {
    if (variant == "employees") {
      downloadEmployeesCSV();
    } else if (variant == "messages") {
      downloadMessagesCSV();
    }
  }
  return (
    <button
      className={
        "font-bold text-blue-gray-700 hover:text-mainRed transition" +
        " " +
        className
      }
      onClick={() => downloadClickHandler()}
    >
      {text}
    </button>
  );
});
