import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
} from "@material-tailwind/react";
import { SidebarLink } from "./SidebarLink";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export const SidebarDropdown = ({
  children,
  className,
  open,
  handleOpen,
  items,
  teamId,
}) => {
  return (
    <Accordion
      open={open === teamId}
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform ${
            open === teamId ? "rotate-180" : ""
          }`}
        />
      }
    >
      <ListItem
        className={`p-0 ${className}`}
        selected={open === teamId}
        onClick={() => handleOpen(teamId)}
      >
        <AccordionHeader className="border-b-0 px-3 text-sm font-normal">
          <div className="flex items-center gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
              />
            </svg>
            {children}
          </div>
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1">
        <List className="p-0">
          <SidebarLink to={"team/" + teamId} variant="team">
            Информация о команде
          </SidebarLink>
          {items.map((el) => (
            <SidebarLink
              key={el.name + el.id}
              to={`team/${teamId}/worker/${el.id}`}
            >
              {el.name}
            </SidebarLink>
          ))}
          <SidebarLink to={"team/" + teamId + "/addWorker"} variant="addWorker">
            Добавить работника
          </SidebarLink>
        </List>
      </AccordionBody>
    </Accordion>
  );
};
