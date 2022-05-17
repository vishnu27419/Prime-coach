import { Tooltip } from "@material-ui/core";
import NoDataFound from "component/lottiLoader/LottiLoader";
import { standardPostApi } from "container/API/ApiWrapper";
import CoachHeader from "container/PublicLayout/CoachHeader";
import Footer from "container/PublicLayout/Footer";
import InnerHeader from "container/PublicLayout/InnerHeader";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AwardListBoardTableForPlayer from "./AwardListBoardTableForPlayer";

export class AwardBoardForPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allAssignAwards: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchAllAssignedAward();
  }

  fetchAllAssignedAward = async () => {
    this.setState({ isLoading: true });
    try {
      const res = await standardPostApi(
        "list_of_team_individual_awards",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
        },
        true
      );
      if (res.data.code === 200) {
        console.log(
          "response of fetch all assign awards",
          res.data.data.assign_awards
        );
        this.setState({ allAssignAwards: res.data?.data?.assign_awards });
      }
    } catch (error) {
      console.error("fetch all assign awards", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  render() {
    const { allAssignAwards } = this.state;
    return (
      <div>
        <div>
          <InnerHeader />
          <div className="loader_sec">
            <div className="dashboard-wrapper">
              <section
                className="myteams_wrapper"
                style={{ padding: "0 0 128px" }}
              >
                <div className="container-fluid pr-0">
                  <div className="inner_teamsection">
                    <div className="d-md-flex align-items-center "></div>
                    <div className="d-lg-flex justify-content-center align-items-center mb-4">
                      <div className="heading" style={{ fontWeight: "bold" }}>
                        <span>Your Awards Board</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        {!this.state.isLoading &&
                        allAssignAwards.length === 0 ? (
                          <NoDataFound
                            height={250}
                            width={250}
                            text="No award assign yet."
                          />
                        ) : (
                          <>
                            {this.state.isLoading ? (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginBottom: "20px",
                                }}
                              >
                                <i
                                  className="fa fa-spinner fa-spin fa-3x fa-fw"
                                  style={{
                                    color: "var(--appBlue2)",
                                    fontSize: "40px",
                                  }}
                                />
                              </div>
                            ) : (
                              <div>
                                <AwardListBoardTableForPlayer
                                  allAssignAwards={allAssignAwards}
                                />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default AwardBoardForPlayer;
