import React from "react";
import Header from "../PublicLayout/Header";
import BannerWrapper from "./BannerWrapper";
import TeamWrapper from "./TeamWrapper";
import YouthAthleteWrapper from "./YouthAthleteWrapper";
import Footer from "../PublicLayout/Footer";

function AthletesDashBoard() {
  return (
    <div>
      <Header />
      <BannerWrapper />
      <TeamWrapper />
      <YouthAthleteWrapper />
      <Footer />
    </div>
  );
}

export default AthletesDashBoard;
