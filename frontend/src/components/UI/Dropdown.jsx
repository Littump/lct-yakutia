import {
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

export const Dropdown = ({ items, rotate = false }) => {
  return (
    <Menu>
      <MenuHandler className="bg-none">
        <IconButton variant="text">
          {rotate ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          )}
        </IconButton>
      </MenuHandler>
      <MenuList className="flex flex-col gap-4 items-start w-44 border border-mainYellow ">
        {items.map((item) => {
          let className =
            "hover:text-mainYellow transition hover:border-0 text-dark outline-none";
          return item.variant == "link" ? (
            <NavLink key={item.text} className={className} to={item.to}>
              {item.text}
            </NavLink>
          ) : (
            <button
              key={item.text}
              className={className}
              onClick={item.function}
            >
              {item.text}
            </button>
          );
        })}
      </MenuList>
    </Menu>
  );
};
