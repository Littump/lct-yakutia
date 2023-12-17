import { Button } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

export const LinkButton = ({ className, children, variant, to, ...props }) => {
  return (
    <NavLink to={to} className={className} {...props}>
      <Button variant={variant}>{children}</Button>
    </NavLink>
  );
};
