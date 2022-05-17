import React from "react";
import InnerHeader from "../PublicLayout/InnerHeader";
import AssignedPageWrapper from "./AssignedPageWrapper";
import Footer from "../PublicLayout/Footer";

function index() {
  return (
    <div>
      <InnerHeader />
      <AssignedPageWrapper />
      <Footer />
    </div>
  );
}

export default index;
