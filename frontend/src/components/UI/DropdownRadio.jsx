import { Button, Menu, MenuHandler, MenuList } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Field } from "formik";

export const DropdownRadio = ({
  items,
  name,
  text,
  values,
  success,
  error,
  className,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover>
      <MenuHandler>
        {/* {text == undefined ? "" : text} */}
        <Button
          variant="text"
          className={
            "flex border-none outline-none items-center gap-3 text-base font-normal capitalize tracking-normal " +
            className +
            (success ? " text-green-400 " : "") +
            (error ? " text-mainRed " : "")
          }
        >
          {text}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList
        role="group"
        aria-labelledby={"my-radio-group" + "-" + name}
        className="flex flex-col items-start w-44 border p-0 border-mainYellow "
      >
        {items.map((item) => {
          return (
            <label
              key={item}
              className={
                "hover:bg-gray-200 w-full py-3 px-4 outline-none border-none cursor-pointer text-md transition " +
                (values[name] == item ? "text-dark font-bold" : "text-dark")
              }
            >
              <Field type="radio" name={name} value={item} className="hidden" />
              {item}
            </label>
          );
        })}
      </MenuList>
    </Menu>
  );
};
