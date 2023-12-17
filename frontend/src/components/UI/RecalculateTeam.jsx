import { Button } from "@material-tailwind/react";
import { useRecalculateTeamMutation } from "../../services/Service";

export const RecalculateTeam = ({ teamId }) => {
  const [recalculateTeam, result] = useRecalculateTeamMutation();
  return (
    <Button
      onClick={() => recalculateTeam(teamId)}
      className={
        "rounded-full flex justify-center items-center h-10 w-72 bg-mainYellow text-white text-center "
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
