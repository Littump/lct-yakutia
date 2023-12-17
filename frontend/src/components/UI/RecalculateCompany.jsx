import { Button } from "@material-tailwind/react";
import { useRecalculateCompanyMutation } from "../../services/Service";

export const RecalculateCompany = () => {
  const [recalculateCompany, result] = useRecalculateCompanyMutation();
  return (
    <Button
      onClick={() => recalculateCompany()}
      className={
        "rounded-full flex justify-center items-center w-72 bg-mainYellow text-white text-center "
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
