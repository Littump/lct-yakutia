import { NavLink } from "react-router-dom";

export const RedirectLink = ({
  className,
  variant = "filled",
  to,
  children,
  ...props
}) => {
  return (
    <NavLink
      to={to}
      className={
        "rounded-full w-52 h-12 flex font-bold justify-center items-center" +
        " " +
        className +
        " " +
        ((variant == "filled"
          ? " bg-mainRed hover:shadow-xl text-white transition "
          : "") +
          (variant == "outlined"
            ? " border-2 transition hover:bg-mainRed hover:shadow-xl text-mainRed hover:text-white border-mainRed "
            : variant == "light"
            ? " bg-mainRed text-white transition shadow-lg hover:scale-105 shadow-red-300/50 "
            : ""))
      }
      variant={variant}
      {...props}
    >
      {children}
    </NavLink>
  );
};
