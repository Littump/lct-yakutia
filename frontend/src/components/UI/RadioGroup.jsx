import { Field } from "formik";

export const RadioGroup = ({
  items,
  name,
  variant = "text",
  values,
  className,
}) => {
  return (
    <div role="group" aria-labelledby="my-radio-group" className={className}>
      {items.map((item) => {
        return (
          <label
            key={item}
            className={
              variant == "text"
                ? "hover:text-dark cursor-pointer text-md transition " +
                  (values[name] == item ? "text-dark" : "text-mainYellow")
                : " py-2 text-md px-4 rounded-full transition cursor-pointer " +
                  (values[name] == item
                    ? "bg-mainYellow text-white "
                    : "text-dark hover:text-mainYellow")
            }
          >
            <Field type="radio" name={name} value={item} className="hidden" />
            {item}
          </label>
        );
      })}
    </div>
  );
};
