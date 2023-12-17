import { memo } from "react";
import { NavbarLink } from "./UI/NavbarLink";
import { useSelector } from "react-redux";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";

export default memo(function Navbar() {
  const teams = useSelector((state) => state.company.teams);
  const scrollRef = useHorizontalScroll();
  return (
    <div
      ref={scrollRef}
      className="w-full flex gap-8 fixed top-0 text-sm left-60 z-20 backdrop-blur-3xl overflow-y-hidden bg-[rgba(255,255,255,0.8)] rounded-none h-16 justify-start items-center py-0 px-12 overflow-x-scroll cool-scroll-x"
    >
      <NavbarLink to={`/`} className="min-w-fit">
        Все отделы
      </NavbarLink>
      {teams.map((el) => (
        <NavbarLink key={el.name} to={`team/${el.id}`} className="min-w-fit">
          {el.name}
        </NavbarLink>
      ))}
    </div>
  );
});
