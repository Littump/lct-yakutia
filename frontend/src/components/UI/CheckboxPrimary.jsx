import { Checkbox } from "@material-tailwind/react";

export const CheckboxPrimary = ({
  className,
  name,
  value,
  setFieldValue,
  children,
  ...props
}) => {
  return (
    <Checkbox
      color="red"
      className={className + " "}
      name={name}
      defaultChecked
      label={children}
      onChange={() => setFieldValue(name, !value)}
      {...props}
    />
  );
};
