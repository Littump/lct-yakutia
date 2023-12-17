import { memo } from "react";
import sad_cat from "../assets/sad_cat.png";

export default memo(function Settings() {
  return (
    <div className="text-2xl mt-20 text-slate-900 w-full h-full text-center flex justify-center items-center mx-auto flex-col gap-10">
      Нe удалось найти страницу!
      <img src={sad_cat} alt="" className="w-64 h-64 rounded-full" />
    </div>
  );
});
