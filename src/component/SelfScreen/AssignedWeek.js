import React from "react";
import StartWorkoutModal from "../SelfScreen/StartWorkoutModal";
import ViewWeekModal from "../SelfScreen/ViewWorkoutModal";
import moment from "moment";
import AthleteTranningSessionRepostModal from "../../component/SelfScreen/tranningSessionSpacificReport/AthleteTranningSessionRepostModal";
import EventIcon from "@material-ui/icons/Event";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { Link } from "react-router-dom";
import ViewAthleteWorkoutModal from "container/Events/athleteEvent/modal/ViewAthleteWorkoutModal";
import { standardPostApi } from "container/API/ApiWrapper";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ViewSpacificReportAthlete from "./ViewSpacificReportAthlete";
import { ThreeSixtySharp } from "@material-ui/icons";
export default class AssignedWeek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startWorkoutModal: false,
      viewWorkoutModal: false,
      // weekArray: this.props.viewWorkoutModalArray,
      visibleGreenTick: false,
      annualTrainingProgram: this.props.startWorkoutArray,
      daysDetail: {},
      weekDetail: {},
      viewWorkoutData: {},
      AthleteRepostModal: false,
      viewWorkoutLoader: false,
      workoutDetails: [],
      startWorkoutClickEvent: "",
      spacificReportModal: false,
      spacificDaysId: "",
      spacificDayDetails: {},
    };
  }

  showStartWorkoutModal = async (days, data) => {
    // console.log("After Click On Start Workout DAY OBJECT", days);
    // console.log("AFTER CLICK ON START WORKOUT WEEK OBJECT ", data);
    await this.setState({
      startWorkoutModal: !this.state.startWorkoutModal,
      // daysDetail: days,
      // weekDetail: data,
    });
  };

  hideStartWorkoutModal = async () => {
    await this.setState({ startWorkoutModal: false });
  };

  showViewWorkoutModal = async (days, message, data) => {
    // console.log("View Days ---->", days);
    await this.setState({
      viewWorkoutModal: !this.state.viewWorkoutModal,
      viewWorkoutData: days,
      startWorkoutClickEvent: message,
      daysDetail: days,
      weekDetail: data,
    });
    this.assignDayWorkoutCalander(days?.id);
  };

  hideViewWorkoutModal = async () => {
    await this.setState({ viewWorkoutModal: false });
  };

  AthleteRepostModalToggle = async () => {
    const { AthleteRepostModal } = this.state;
    await this.setState({ AthleteRepostModal: !AthleteRepostModal });
  };

  assignDayWorkoutCalander = async (daysId) => {
    const Atp = this.props.viewWorkoutModalArray;

    this.setState({ viewWorkoutLoader: true });
    try {
      const res = await standardPostApi(
        "assigned_day_workout_calender",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: Atp?.annual_training_program_id,
          annual_training_program_week_id: Atp?.id,
          annual_training_program_day_id: daysId,
        },
        true
      );

      // console.log("res", res.data.code);

      if (res.data.code === 200) {
        // console.log("Response of assign day workout calender", res.data.data);
        this.setState({ workoutDetails: res?.data?.data });
      }
    } catch (error) {
      console.error("assign DayWise Calender Error", error);
    } finally {
      this.setState({ viewWorkoutLoader: false });
    }
  };

  switchStartWorkout = () => {
    this.setState({ viewWorkoutModal: false, startWorkoutModal: true });
  };

  toggleSpacificReportModal = (days) => {
    this.setState({
      spacificReportModal: !this.state.spacificReportModal,
      spacificDaysId: days?.id,
      spacificDayDetails: days,
    });
  };

  render() {
    const { AthleteRepostModal } = this.state;
    const {
      trainingSessionSpecificReportApi,
      trainingSessionReport,
      nextWeek,
      prevWeek,
    } = this.props;

    return (
      <div className="dashboard-wrapper">
        <section className="athlete_dasboard">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="week_section">
                  <div>
                    <div className="heading athlete_week_date_main_div ">
                      <h3 className="athlete_week_date_main_h3">
                        {this.props.viewWorkoutModalArray.week_number}
                        {/* {moment(
                          this.props.viewWorkoutModalArray.week_start
                        ).format("DD-MM-YYYY")} */}
                        <span className="athlete_week_date_main_dateFormate">
                          (&nbsp;
                          {moment(
                            this.props.viewWorkoutModalArray.week_start
                          ).format("MMMM Do")}
                          )
                        </span>
                      </h3>

                      <Link to="/athleteEvent">
                        <IconButton
                          style={{
                            border: "2px dashed #fff",
                            backgroundColor: "rgb(18 102 128)",
                            height: "40px",
                            width: "42px",
                          }}
                        >
                          <EventIcon style={{ color: "#fff" }} />
                        </IconButton>
                      </Link>
                      <div>
                        {!this.props.hidePrev && (
                          <IconButton
                            style={{
                              border: "2px dashed #fff",
                              backgroundColor: "rgb(18 102 128)",
                              height: "40px",
                              width: "42px",
                              marginRight: "20px",
                            }}
                            onClick={() => prevWeek()}
                          >
                            <ArrowBackIcon style={{ color: "#fff" }} />
                          </IconButton>
                        )}
                        {!this.props?.hideNext && (
                          <IconButton
                            style={{
                              border: "2px dashed #fff",
                              backgroundColor: "rgb(18 102 128)",
                              height: "40px",
                              width: "42px",
                            }}
                            onClick={() => nextWeek()}
                          >
                            <ArrowForwardIcon style={{ color: "#fff" }} />
                          </IconButton>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      {this.props.viewWorkoutModalArray.days.map((days) => {
                        return (
                          <div className="col-lg-3 " key={days.id}>
                            <div className="day_one">
                              <span
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                {days.day_number}
                                {days.day_workout_complete === true && (
                                  <>
                                    <i
                                      className="fa fa-check"
                                      aria-hidden="true"
                                    ></i>
                                    <span>
                                      <IconButton
                                        style={{
                                          height: "47px",
                                          backgroundColor: "#126680",
                                          border: "2px dashed #fff",
                                          margin: "0px",
                                        }}
                                        onClick={() =>
                                          this.toggleSpacificReportModal(days)
                                        }
                                      >
                                        <AssignmentIcon
                                          style={{
                                            color: "#fff",
                                            margin: "0px",
                                            fontSize: "21px",
                                          }}
                                        />
                                      </IconButton>
                                    </span>
                                  </>
                                )}
                              </span>

                              <ul
                                className="list-inline"
                                style={{ marginTop: "50px" }}
                              >
                                <li>
                                  <button
                                    className="Start_Workout"
                                    // onClick={() => {
                                    //   this.showStartWorkoutModal(
                                    //     days,
                                    //     this.props.viewWorkoutModalArray
                                    //   );
                                    // }}

                                    onClick={(e) => {
                                      this.showViewWorkoutModal(
                                        days,
                                        "startWorkout",
                                        this.props.viewWorkoutModalArray
                                      );
                                    }}
                                  >
                                    start workout
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="Start_Workout"
                                    onClick={(e) => {
                                      this.showViewWorkoutModal(days);
                                    }}
                                  >
                                    view workout
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <StartWorkoutModal
          show={this.state.startWorkoutModal}
          onHide={this.hideStartWorkoutModal}
          startWorkoutArray={this.props.startWorkoutArray}
          daysDetail={this.state.daysDetail}
          weekDetail={this.state.weekDetail}
        />

        {/* <ViewWeekModal
          show={this.state.viewWorkoutModal}
          onHide={this.hideViewWorkoutModal}
          viewWorkoutModalArray={this.props.viewWorkoutModalArray}
          annualTrainingProgram={this.state.annualTrainingProgram}
          viewWorkoutData={this.state.viewWorkoutData}
        /> */}

        <ViewAthleteWorkoutModal
          show={this.state.viewWorkoutModal}
          onHide={this.hideViewWorkoutModal}
          workoutDetails={this.state?.workoutDetails}
          viewWorkoutLoader={this.state.viewWorkoutLoader}
          startWorkoutClickEvent={this.state.startWorkoutClickEvent}
          switchStartWorkout={this.switchStartWorkout}
        />

        <AthleteTranningSessionRepostModal
          show={AthleteRepostModal}
          onHide={this.AthleteRepostModalToggle}
          trainingSessionReport={trainingSessionReport}
        />

        {this.state.spacificDaysId && (
          <ViewSpacificReportAthlete
            show={this.state.spacificReportModal}
            onHide={this.toggleSpacificReportModal}
            viewWorkoutModalArray={this.props.viewWorkoutModalArray}
            spacificDaysId={this.state.spacificDaysId}
            userId={this.props.userId}
            spacificDayDetails={this.state.spacificDayDetails}
          />
        )}
      </div>
    );
  }
}
