import LoaderWrapper from "container/Loader/LoaderWrapper";
import "../CoachAddEvent.css";
import CoachHeader from "container/PublicLayout/CoachHeader";
import Footer from "container/PublicLayout/Footer";
import React, { Component } from "react";
import { Link } from "react-router-dom";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@material-ui/core";
import moment from "moment";
import {
  standardPostApi,
  standardPostApiJsonBased,
} from "container/API/ApiWrapper";
import { errorToast, successToast } from "utils/toastMessage";
// import ViewTeamPlayerEvent from "./ViewTeamPlayerEvent";
import ViewAthleteEvent from "../athleteEvent/ViewAthleteEvent";
import InnerHeader from "container/PublicLayout/InnerHeader";
import ViewAthleteWorkoutModal from "./modal/ViewAthleteWorkoutModal";
// import AddTeamPlayerEvent from "./AddTeamPlayerEvent";
// import ViewTeamPlayerWorkout from "./modal/ViewTeamPlayerWorkout";

export class AthleteEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      workoutData: [],
      isLoading: false,
      markedDates: [],
      selectedEvent: [],
      eventName: "",
      Description: "",
      nameError: "",
      descriptionError: "",
      startTimeError: "",
      endTimeError: "",
      onAddLoader: false,
      selectedWorkout: [],
      viewWorkoutModal: false,
      workoutDetails: [],
      viewWorkoutLoader: false,
    };
  }

  handleDateChange = async (date) => {
    await this.setState({ date: date });
    this.onDayPress(date);

    console.log("date", this.state.date);
  };

  onDayPress = (day) => {
    let selected_workout = this.state.workoutData.find(
      (x) =>
        x.day_number === parseInt(moment(day).format("D")) &&
        (x.assigned_workout?.length > 0 || x.assigned_user_events?.length > 0)
    );
    this.setState({
      selectedWorkout: selected_workout?.assigned_workout
        ? selected_workout?.assigned_workout
        : [],
      selectedEvent: selected_workout?.assigned_user_events
        ? selected_workout?.assigned_user_events?.sort(function (a, b) {
            let x = moment(
              a?.event_date + " " + a?.event_time,
              "YYYY-MM-DD HH:mm:ss"
            )
              .toDate()
              .getTime();
            let y = moment(
              b?.event_date + " " + b?.event_time,
              "YYYY-MM-DD HH:mm:ss"
            )
              .toDate()
              .getTime();
            return x - y;
          })
        : [],
    });
  };
  componentDidMount() {
    let d = new Date();
    this.onLoadData(d.getMonth() + 1, d.getFullYear());
  }

  onLoadData = async (month, year, message) => {
    this.setState({ isLoading: true });
    const userId = this.props.match.params.playerId;
    try {
      const res = await standardPostApi(
        "assigned_workout_calender",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          calender_month: month,
          calender_year: year,
          access_user_id: userId,
        },
        true
      );
      if (res.data.code == 200) {
        await this.createMarkedDates(res.data.data);
        this.setState({
          isLoading: false,
          workoutData: res.data.data,
          eventName: "",
          Description: "",
          startTime: new Date(),
          endTime: new Date(),
          nameError: "",
          descriptionError: "",
          startTimeError: "",
          endTimeError: "",
        });
      }
    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error);
    }
  };

  createMarkedDates = async (data) => {
    let TempMark = [];
    for (var i = 0; i < data?.length; i++) {
      if (
        data[i]?.assigned_workout.length > 0 ||
        data[i]?.assigned_user_events.length > 0
      ) {
        TempMark.push(moment(data[i]?.date, "YYYY-MM-DD").toDate());
      }
    }
    this.setState({ markedDates: TempMark });

    setTimeout(() => {
      this.onDayPress(this.state.date);
    }, 700);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log("state onChange", this.state);
  };

  handelStartTime = async (date) => {
    await this.setState({ startTime: date });
    // console.log("The date selected is ", this.state.startTime);
  };

  handelEndTime = async (date) => {
    await this.setState({ endTime: date });
    // console.log("The date selected is ", this.state.endTime);
  };

  calendarAddEvent = async () => {
    const userId = this.props.match.params.playerId;
    const { eventName, Description, startTime, endTime, date } = this.state;
    const Date = moment(date).format("YYYY-MM-DD");
    const start_Time = moment(startTime).format("HH:mm:ss");
    const end_Time = moment(endTime).format("HH:mm:ss");

    const isValid = this.validationCalenderAddEvent();

    if (isValid) {
      this.setState({ onAddLoader: true });
      try {
        const res = await standardPostApi(
          "calendar_events_add_update",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            assigned_user_id: userId,
            event_name: eventName,
            event_description: Description,
            event_date: Date,
            event_time: start_Time,
            event_end_time: end_Time,
            api_action: "add",
          },
          true
        );
        console.log("resssssss", res);
        if (res.data.code === 200) {
          console.log("RESPONSE OF ADD EVENT", res.data);
          successToast(res.data.message);

          this.onLoadData(
            moment(date).toDate().getMonth() + 1,
            moment(date).toDate().getFullYear(),
            "addCalenderEvent"
          );
        }
      } catch (error) {
        console.error("ERROR OF calendar_events_add_update", error);
      } finally {
        this.setState({
          onAddLoader: false,
        });
      }
    }
  };

  validationCalenderAddEvent = () => {
    const { startTime, endTime, date } = this.state;
    let nameError = "";
    let descriptionError = "";
    let startTimeError = "";
    let endTimeError = "";

    let Time = moment(startTime).format("HH:mm:ss");

    const StartTimeStamp = moment(
      moment(date).format("YYYY-MM-DD") + " " + Time,
      "YYYY-MM-DD HH:mm:ss"
    )
      .toDate()
      .getTime();

    let EndTime = moment(endTime).format("HH:mm:ss");
    const EndTimeStamp = moment(
      moment(date).format("YYYY-MM-DD") + " " + EndTime,
      "YYYY-MM-DD HH:mm:ss"
    )
      .toDate()
      .getTime();

    if (!this.state.eventName) {
      nameError = "Event name field is required.";
    }

    if (!this.state.Description) {
      descriptionError = "Description field is required.";
    }

    if (StartTimeStamp < moment().toDate().getTime()) {
      startTimeError = "You cannot add an event for an older time.";
    }

    if (EndTimeStamp < StartTimeStamp) {
      endTimeError = "End time can not be older than start time.";
    }

    if (nameError || descriptionError || startTimeError || endTimeError) {
      this.setState({
        nameError,
        descriptionError,
        startTimeError,
        endTimeError,
      });
      return false;
    } else {
      return true;
    }
  };

  toggleViewWorkoutModal = async (item) => {
    await this.setState({ viewWorkoutModal: !this.state.viewWorkoutModal });
    this.assignDayWorkoutCalander();
  };

  assignDayWorkoutCalander = async () => {
    const { selectedWorkout } = this.state;
    this.setState({ viewWorkoutLoader: true });
    try {
      const res = await standardPostApi(
        "assigned_day_workout_calender",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: selectedWorkout[0]?.atp_id,
          annual_training_program_week_id: selectedWorkout[0]?.atp_week_id,
          annual_training_program_day_id: selectedWorkout[0].atp_day_id,
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

  render() {
    const { startTime, selectedEvent } = this.state;

    const highlightWithRanges = [
      {
        "react-datepicker__day--highlighted-custom-1": [
          ...this.state.markedDates,
        ],
      },
    ];
    console.log("selectedWorkout", this.state.selectedWorkout);
    // console.log("workoutDetails", this.state.workoutDetails);
    return (
      <div className="loader_sec">
        <InnerHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid pr-0">
              <div className=" testing_protocol_react">
                {/* <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link
                      to={`/myplayers/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                    >
                      {this.props.match.params.teamname}
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link
                      // to={`/coachplayerinner/${this.props.match.params.id}/${this.props.match.params.playerId}`}
                      to={{
                        pathname: `/coachplayerinner/${this.props.match.params.id}/${this.props.match.params.playerId}/${this.props.match.params.teamname}`,
                        state: this.props.location.state,
                      }}
                    >
                      {this.props.location.state.player.first_name}{" "}
                      {this.props.location.state.player.last_name}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Add Event
                  </li>
                </ol> */}
                {this.state.selectedWorkout.length !== 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px",
                      marginRight: "3%",
                    }}
                  >
                    <span></span>
                    <Button
                      variant="outlined"
                      style={{
                        padding: "5px 56px",
                        border: "1px solid green",
                        color: "#fff",
                      }}
                      onClick={() =>
                        this.toggleViewWorkoutModal(
                          this.state.selectedWorkout?.[0]
                        )
                      }
                    >
                      View Workout
                    </Button>
                    {/* <ViewTeamPlayerWorkout /> */}
                  </div>
                )}
                {this.state.isLoading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <i
                      className="fa fa-spinner fa-spin fa-3x fa-fw"
                      // className="fa fa-spinner fa-pulse fa-3x fa-fw"
                      style={{
                        color: "var(--appBlue2)",
                        fontSize: "60px",
                        marginTop: "50px",
                        marginBottom: "50px",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className="table-responsive "
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <div className="form-group">
                      <DatePicker
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                        onMonthChange={async (date) => {
                          await this.onLoadData(
                            moment(date).toDate().getMonth() + 1,
                            moment(date).toDate().getFullYear()
                            // "addCalenderEvent"
                          );
                          this.handleDateChange(date);
                        }}
                        onYearChange={async (date) => {
                          await this.onLoadData(
                            moment(date).toDate().getMonth() + 1,
                            moment(date).toDate().getFullYear()
                            // "addCalenderEvent"
                          );
                          this.handleDateChange(date);
                        }}
                        name="DateOfBirth"
                        className=" add-event"
                        dateFormat="dd/MM/yyyy"
                        // maxDate={new Date()}
                        showMonthDropdown
                        showYearDropdown
                        placeholderText="dd/MM/yyyy"
                        dropdownMode="select"
                        ref={(ref) => (this.accordionContent = ref)}
                        inline
                        // withPortal
                        highlightDates={highlightWithRanges}
                      />
                    </div>
                    {selectedEvent.length === 0 ? (
                      <p style={{ marginBottom: "0px", color: "#2f84ca" }}>
                        {`No event on ${moment(this.state.date).format(
                          "MMMM Do"
                        )}`}
                      </p>
                    ) : (
                      <ViewAthleteEvent
                        selectedEvent={selectedEvent}
                        playerId={this.props.match.params.playerId}
                        onLoadData={this.onLoadData}
                      />
                    )}
                  </div>
                )}{" "}
              </div>
            </div>
          </section>
        </div>
        <Footer />

        <ViewAthleteWorkoutModal
          show={this.state.viewWorkoutModal}
          onHide={this.toggleViewWorkoutModal}
          workoutDetails={this.state?.workoutDetails}
          viewWorkoutLoader={this.state.viewWorkoutLoader}
          selectedWorkout={this.state.selectedWorkout}
        />
      </div>
    );
  }
}

export default AthleteEvent;
