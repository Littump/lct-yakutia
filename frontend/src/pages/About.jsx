import { memo } from "react";
import LoginNavbar from "../components/LoginNavbar";
import LandingHeader from "../components/Landing/LandingHeader";
import LandingFeatures from "../components/Landing/LandingFeatures";
import LandingRoadMap from "../components/Landing/LandingRoadMap";
import LandingProblem from "../components/Landing/LandingProblem";
import LandingTeam from "../components/Landing/LandingTeam";

export default memo(function About() {
  return (
    <div>
      <LoginNavbar></LoginNavbar>
      <div className="flex flex-col mt-20">
        <LandingHeader />
        <LandingFeatures />
        <LandingRoadMap />
        <LandingProblem />
        <LandingTeam />
      </div>
    </div>
  );
});
