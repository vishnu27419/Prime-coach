import NoDataFound from "component/lottiLoader/LottiLoader";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { standardPostApi } from "../../container/API/ApiWrapper";
import CoachHeader from "../../container/PublicLayout/CoachHeader";
import Footer from "../../container/PublicLayout/Footer";

class TranningPlanWeek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekList: this.props.location.state,
      listDays: {},
      redirectToDays: false,
      weekResult: [],
      RESULT: {},
      isLoading: false,
      // WEEK_RESULT: {},
    };
  }

  componentDidMount() {
    this.list_athlete_workout();
  }

  list_athlete_workout = async () => {
    this.setState({ isLoading: true });
    try {
      const res = await standardPostApi(
        "list_athlete_workout",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          access_user_id: this.props.match.params.playerId,
          access_training_type: this.props.match.params.tranningType,
        },
        true,
        false
      );
      if (res.data.code === 200) {
        // console.log(
        //   "THIS Is Response of list_athlete_workout-->",
        //   res.data.data
        // );

        const resultFirst = res.data.data.find(
          (data) => data.annual_program_completed === false
        );
        // console.log("Result Is ", resultFirst);

        if (resultFirst) {
          this.setState({ RESULT: resultFirst });
        } else {
          this.setState({ RESULT: res.data.data[res.data.data.length - 1] });
        }
        await this.setState({ weekResult: this.state.RESULT.weeks });
        // console.log("this is Current week--->", this.state.weekResult);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    // console.log("List Days", List_Days);
    // console.log("this is tranning type", this.props.match.params.tranningType);

    // console.log("this is from State-->", this.state.weekResult);
    // console.log("THIS IS WEEK PAGE-->", this.props.location.state);
    const { isLoading } = this.state;
    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid pr-0">
              <div className="inner_teamsection">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="d-flex justify-content-between align-items-center">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link
                            to={`/myplayers/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                          >
                            {this.props.match.params.teamname}
                          </Link>
                          {/* Robin */}
                        </li>
                        <li className="breadcrumb-item">
                          <Link
                            to={{
                              pathname: `/coachplayerinner/${this.props.match.params.id}/${this.props.match.params.playerId}/${this.props.match.params.teamname}`,
                              state: this.props.location.state,
                            }}
                          >
                            {this.props.location.state.player.first_name}{" "}
                            {this.props.location.state.player.last_name}
                          </Link>
                          {/* Rohit */}
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          <Link
                            to={{
                              pathname: `/tranningplan/${this.props.match.params.id}/${this.props.match.params.playerId}/${this.props.match.params.teamname}`,
                              state: this.props.location.state,
                            }}
                          >
                            Program Plan
                          </Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          {/* <Link
                            to={`/tranningplan/${this.props.match.params.id}/${this.props.match.params.playerId}`}
                          > */}
                          {/* Training Plan */}
                          {this.props.match.params.tranningType ===
                            "in_season" && "In Season "}
                          {this.props.match.params.tranningType ===
                            "off_season" && "Off Season "}
                          {this.props.match.params.tranningType ===
                            "pre_season" && "Pre Season "}
                          {this.props.match.params.tranningType ===
                            "transition" && "Transition "}
                          {/* </Link> */}
                        </li>
                      </ol>
                    </div>

                    <div
                      style={{
                        borderBottom: "1px solid #fff",
                        marginBottom: "6%",
                      }}
                    >
                      <hr style={{ marginTop: "none", borderTop: "none" }} />
                    </div>

                    <div div="col-md-2">
                      {this.state.weekResult &&
                        this.state.weekResult.map((item) => {
                          return (
                            <Link
                              to={{
                                pathname: `/tranningplanday/${this.props.match.params.id}/${this.props.match.params.playerId}/${this.props.match.params.teamname} `,
                                state: {
                                  days: item.days,
                                  state: this.props.location.state,
                                  week: item,
                                  tranningType:
                                    this.props.match.params.tranningType,
                                },
                              }}
                              key={item.id}
                            >
                              <button className="WeekButton_tranningPlan">
                                <span
                                  style={{
                                    paddingRight: "100px",
                                    color: "#fff",
                                  }}
                                >
                                  {item.week_number}
                                </span>
                              </button>
                            </Link>
                          );
                        })}

                      {isLoading && (
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
                            // className="fa fa-spinner fa-pulse fa-3x fa-fw"
                            style={{
                              color: "var(--appBlue2)",
                              fontSize: "40px",

                              // marginTop: "50px",
                            }}
                          />
                        </div>
                      )}

                      {!isLoading && this.state.weekResult.length === 0 && (
                        <NoDataFound
                          height={250}
                          width={250}
                          text="No Week available yet"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default TranningPlanWeek;
