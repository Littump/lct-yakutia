import { Field } from "formik";
export const InputPrimary = ({
  className,
  errors,
  touched,
  name,
  placeholder,
  ...props
}) => {
  return (
    <Field
      type="name"
      name={name}
      placeholder={placeholder}
      error={errors[name] && touched[name] && errors[name]}
      success={touched[name] && !errors[name]}
      className={
        "input input-bordered input-secondary border-2 rounded-full" +
        " " +
        className
      }
      {...props}
    />
  );
};
