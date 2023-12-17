import { Field } from "formik";

export const InputPrimary = ({
  className,
  errors,
  touched,
  name,
  variant = "dark",
  type,
  placeholder,
  ...props
}) => {
  const error = errors[name] && touched[name];
  const success = touched[name] && !errors[name];
  return (
    <div className={className + " relative"}>
      <div
        className={
          "h-12 rounded-full bg-gradient-to-r p-[2px]" +
          " " +
          (variant == "dark" ? "from-mainRed to-dark " : "")
        }
      >
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          className={
            "w-full rounded-full h-full input input-ghost focus:outline-none" +
            " " +
            (variant == "dark"
              ? "bg-dark text-white focus:text-white active:text-white "
              : "bg-white text-black focus:text-black active:text-black border ") +
            (success
              ? " border-green-600"
              : error
              ? "border-mainRed"
              : "border-gray-400")
          }
          {...props}
        />
      </div>
      {error ? (
        <span className={"absolute -bottom-5 text-xs left-4 text-mainRed"}>
          {errors[name]}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};
