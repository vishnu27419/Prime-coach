import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footer from "../PublicLayout/Footer";
import Header from "../PublicLayout/Header";
// import axios from "axios";
import LoaderWrapper from "../Loader/LoaderWrapper";
import { standardPostApi } from "../API/ApiWrapper";

export default class MembershipPageWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sportsData: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.fetchPlanData();
  }

  fetchPlanData = async () => {
    try {
      const res = await standardPostApi(
        "list_subscription_plans",
        undefined,
        {},
        true
      );
      if (res.data.code === 200) {
        this.setState({
          sportsData: res.data.data.PLANS,
          loading: false,
        });
        // console.log("The membership plans are ->", this.state.sportsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { sportsData } = this.state;
    // console.log("***check***", this.state.loading);
    // console.log("match.prams<**>", this.props.match.params);
    return (
      <div className="loader_sec">
        <Header />
        {this.state.loading ? (
          <LoaderWrapper />
        ) : (
          <div className="membership-page-wrapper">
            <section className="type_of_membership">
              <div className="container">
                <div className="row">
                  {sportsData &&
                    sportsData.length &&
                    sportsData.map((data) => (
                      <div key={data.planId} className="col-lg-4">
                        <div className="member_type">
                          <h2>{data.planName}</h2>
                          <ul>
                            {data.content.map((item) => {
                              return <li key={item.desc}> - {item.desc}</li>;
                            })}
                          </ul>
                          <div className="link_btn">
                            <Link
                              to={`/signupathletes/${this.props.match.params.id}/${data.planId}`}
                              className="btn btn-primary member_select"
                            >
                              Select
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}
