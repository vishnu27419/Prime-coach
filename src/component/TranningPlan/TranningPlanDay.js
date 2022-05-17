import { standardPostApi } from "container/API/ApiWrapper";
import ViewAthleteWorkoutModal from "container/Events/athleteEvent/modal/ViewAthleteWorkoutModal";
import React from "react";
import { Link } from "react-router-dom";
import CoachHeader from "../../container/PublicLayout/CoachHeader";
import Footer from "../../container/PublicLayout/Footer";

class TranningPlanDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List_Days: this.props.location.state.days,
      viewWorkoutLoader: false,
      workoutDetails: [],
      viewWorkoutModal: false,
      dayId: "",
    };
  }

  toggleViewModal = async (item) => {
    this.setState({
      viewWorkoutModal: !this.state.viewWorkoutModal,
      dayId: item?.id,
    });
    this.assignDayWorkoutCalander(item?.id);
  };

  assignDayWorkoutCalander = async (dayId) => {
    const Atp = this.props.location.state.week;

    console.log("annual_training_program_id", Atp?.annual_training_program_id);
    console.log("annual_training_program_week_id", Atp?.id);
    console.log("annual_training_program_day_id", dayId);

    this.setState({ viewWorkoutLoader: true });
    try {
      const res = await standardPostApi(
        "assigned_day_workout_calender",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: Atp?.annual_training_program_id,
          annual_training_program_week_id: Atp?.id,
          annual_training_program_day_id: dayId,
        },
        true
      );

      console.log("res", res.data.code);

      if (res.data.code === 200) {
        console.log("Response of assign day workout calender", res.data.data);
        this.setState({ workoutDetails: res?.data?.data });
      }
    } catch (error) {
      console.error("assign DayWise Calender Error", error);
    } finally {
      this.setState({ viewWorkoutLoader: false });
    }
  };

  closeVideModal = () => {
    this.setState({ viewWorkoutModal: false });
  };

  render() {
    console.log(
      "This is Props Days--------------------->",
      this.props.location.state.week
    );
    // console.log("This is Props Days======>", this.state.List_Days);

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
                              state: this.props.location.state.state,
                            }}
                          >
                            {this.props.location.state.state.player.first_name}{" "}
                            {this.props.location.state.state.player.last_name}
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
                              state: this.props.location.state.state,
                            }}
                          >
                            Program Plan
                          </Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          <Link
                            to={{
                              pathname: `/tranningplanweek/${this.props.match.params.id}/${this.props.match.params.playerId}/${this.props.match.params.teamname}/${this.props.location.state.tranningType}`,
                              state: this.props.location.state.state,
                            }}
                          >
                            {this.props.location.state.week.week_number}
                          </Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          {this.props.location.state.week.week_number} - Days
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
                    {this.props.location.state &&
                      this.props.location.state.days.map((item) => {
                        return (
                          <div key={item.id}>
                            <div className="row" key={item.id}>
                              <div
                                className="col-md-3"
                                style={{ marginBottom: "10px" }}
                              >
                                <div className="TranningPlan_Day_Pannel">
                                  <div className="TranningPlan_Day_Pannel_heading">
                                    <h2 style={{ color: "white" }}>
                                      {item.day_number}
                                    </h2>
                                  </div>
                                  <div className="TranningPlan_Day_Pannel_body">
                                    {/* <button
                                      className="btn  Start_Workout"
                                      style={{
                                        marginRight: "15px",
                                        fontSize: "14px",
                                      }}
                                    >
                                      Start Workout
                                    </button> */}
                                    <button
                                      className="btn  Start_Workout"
                                      style={{
                                        fontSize: "14px",
                                        float: "right",
                                      }}
                                      onClick={() => this.toggleViewModal(item)}
                                    >
                                      View Workout
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
        <ViewAthleteWorkoutModal
          show={this.state.viewWorkoutModal}
          onHide={this.closeVideModal}
          workoutDetails={this.state?.workoutDetails}
          viewWorkoutLoader={this.state.viewWorkoutLoader}
        />
      </div>
    );
  }
}

export default TranningPlanDay;
