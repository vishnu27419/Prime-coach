import React from "react";
import BannerWrapper from "./BannerWrapper";
import TeamWrapper from "./TeamWrapper";
import YouthAthleteWrapper from "./YouthAthleteWrapper";
import TestingWrapper from "./TestingWrapper";
import Header from "../PublicLayout/Header";
import Footer from "../PublicLayout/Footer";

function ForCoachDashBoard() {
  return (
    <div>
      <Header />
      <BannerWrapper />
      <TeamWrapper />
      <YouthAthleteWrapper />
      <TestingWrapper />
      <Footer />
    </div>
  );
}

export default ForCoachDashBoard;
