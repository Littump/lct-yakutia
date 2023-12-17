import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const DropdownFile = ({
  text,
  className,
  fileName = "",
  dispatch = () => console.log("no action creator"),
}) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        dispatch(file);
      });
    },
    [dispatch]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={"flex items-center justify-center"}>
      <div
        {...getRootProps()}
        className={
          "flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-[rgba(50,50,50,0.6)] dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600" +
          " " +
          className
        }
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className={
              "w-8 h-8 mb-4 " +
              (isDragActive ? "text-blue-500" : "text-gray-500 ")
            }
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          {fileName != undefined && fileName != "" ? (
            <>
              <p className={"mb-2 text-sm text-blue-500"}>
                <span className="font-semibold">
                  Файл {fileName} успешно загружен
                </span>
              </p>
            </>
          ) : (
            <>
              {" "}
              <p
                className={
                  "mb-2 text-sm " +
                  (isDragActive ? "text-blue-500" : "text-gray-500 ")
                }
              >
                <span className="font-semibold">{text}</span> или перенесите
              </p>
              <p
                className={
                  "text-xs " +
                  (isDragActive ? "text-blue-500" : "text-gray-500 ")
                }
              ></p>
            </>
          )}
        </div>
        <input {...getInputProps} className="hidden" />
      </div>
    </div>
  );
};
