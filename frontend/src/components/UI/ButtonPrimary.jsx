import { Button } from "@material-tailwind/react";

export const ButtonPrimary = ({
  className,
  isLoading,
  variant = "filled",
  type,
  children,
  ...props
}) => {
  return (
    <Button
      className={
        "rounded-full flex justify-center items-center text-center " +
        " " +
        ((variant == "filled" ? "bg-mainRed  w-52 h-12 " : " ") +
          (variant == "text" ? " text-mainRed w-full rounded-none " : " ") +
          className)
      }
      type={type}
      variant={variant}
      {...props}
    >
      {isLoading ? (
        <span className="loading loading-dots loading-md"></span>
      ) : (
        children
      )}
    </Button>
  );
};
