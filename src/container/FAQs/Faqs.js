import React, { Component } from "react";
import "../FAQs/Faqs.css";
import Footer from "../PublicLayout/Footer";
import Axios from "axios";
import Header from "../PublicLayout/Header";
import LoaderWrapper from "../Loader/LoaderWrapper";
// for jquery in reactJs
import $ from "jquery";
import { findDOMNode } from "react-dom";
import { standardPostApi } from "../API/ApiWrapper";
import InnerHeader from "container/PublicLayout/InnerHeader";
import CoachHeader from "container/PublicLayout/CoachHeader";

export default class MembershipPageWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faqsData: [],
      loading: true,
      isVisible: undefined,
    };
  }
  componentDidMount() {
    this.fetchPlanData();
  }

  fetchPlanData = async () => {
    try {
      const res = await standardPostApi(
        "list_frequently_asked_questions_data",
        undefined,
        {},
        true
      );
      if (res.data.code === 200) {
        this.setState({ faqsData: res.data.data.FAQs, loading: false });
        // console.log("The faqs are ", this.state.faqsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleToggle = (index) => {
    if (this.state.isVisible === index) this.setState({ isVisible: undefined });
    else this.setState({ isVisible: index });
  };

  render() {
    const { faqsData, isVisible } = this.state;
    console.log("State**", isVisible);
    return (
      <div className="loader_sec">
        {/* <Header /> */}
        {localStorage.getItem("access_role") === null ? (
          <Header />
        ) : localStorage.getItem("access_role") === "Athlete" ? (
          <InnerHeader />
        ) : (
          <CoachHeader />
        )}

        <section className="faqs_banner-wrapper">
          <div className="container">
            <div className="heading">
              <h1>
                Frequently <span>Asked Questions</span>
              </h1>
            </div>
          </div>
        </section>
        {this.state.loading ? (
          <LoaderWrapper />
        ) : (
          <section className="py-5 mt-4">
            <div className="container">
              <div id="accordion">
                {faqsData &&
                  faqsData.length &&
                  faqsData.map((data, index) => (
                    <div key={data.ques} className="card">
                      <div className="card-header" id="headingOne">
                        <button
                          className="btn btn-link"
                          onClick={() => this.handleToggle(index)}
                        >
                          {/* What is Strength and Conditioning training? */}
                          {data.ques}
                        </button>
                      </div>
                      <div id="collapseOne" ref={data.id.toString()}>
                        <div className="card-body">
                          {/* Strength and Conditioning training includes a wide range
                        of exercises that focus on mobility, stability,
                        strength, endurance, power, speed, agility and
                        performance. Strength and Conditioning programmes aid in
                        the improvement of athletic performance, as well as help
                        with injury prevention. */}
                          {this.state.isVisible === index && data.ans}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}
        <Footer />
      </div>
    );
  }
}
