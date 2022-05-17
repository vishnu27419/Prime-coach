import React, { useState } from "react";
import Header from "../PublicLayout/Header";
import BannerWrapper from "./BannerWrapper";
import CoachAthleteWrapper from "./CoachAthleteWrapper";
import SoftwareWrapper from "./SoftwareWrapper";
import GamingWrapper from "./GamingWrapper";
import OurCoachWrapper from "./OurCoachWrapper";
import Footer from "../PublicLayout/Footer";

function DashBoard() {
  return (
    <div>
      <Header />
      <BannerWrapper />
      <CoachAthleteWrapper />
      <SoftwareWrapper />
      <GamingWrapper />
      <OurCoachWrapper />
      <Footer />
    </div>
  );
}

export default DashBoard;
