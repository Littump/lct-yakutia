import { NavLink } from "react-router-dom";

export const NavbarLink = ({
  className,
  variant = "filled",
  to,
  children,
  ...props
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "font-normal hover:text-black transition flex justify-center items-center " +
        (isActive ? "text-black" : "text-mainYellow") +
        " " +
        className
      }
      variant={variant}
      {...props}
    >
      {children}
    </NavLink>
  );
};
