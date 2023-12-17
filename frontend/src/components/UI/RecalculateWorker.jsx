import { Button } from "@material-tailwind/react";
import { useRecalculateWorkerMutation } from "../../services/Service";

export const RecalculateWorker = ({ workerId }) => {
  const [recalculateWorker, result] = useRecalculateWorkerMutation();
  return (
    <Button
      onClick={() => recalculateWorker(workerId)}
      className={
        "rounded-full flex bg-mainYellow w-72 text-white justify-center items-center text-center "
      }
    >
      {result?.isLoading ? (
        <span className="loading loading-dots loading-md"></span>
      ) : (
        "Пересчитать процент увольнения"
      )}
    </Button>
  );
};
