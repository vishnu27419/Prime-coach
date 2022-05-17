import LoaderWrapper from "container/Loader/LoaderWrapper";
import "./CoachAddEvent.css";
import CoachHeader from "container/PublicLayout/CoachHeader";
import Footer from "container/PublicLayout/Footer";
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Calendar from "rc-calendar";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@material-ui/core";
import AddEvent from "./addEvent/AddEvent";
import moment from "moment";
import { standardPostApi } from "container/API/ApiWrapper";
import ViewEvent from "./addEvent/ViewEvent";
import { errorToast, successToast } from "utils/toastMessage";
export class CoachAddEvent extends Component {
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
    };
  }

  handleDateChange = async (date) => {
    await this.setState({ date: date });
    this.onDayPress(date);

    console.log("date", this.state.date);
  };
  onDayPress = (day) => {
    // console.log("dateeeee1231", moment(day).format("D"));
    // this.setState({ showEvents: false, showWorkouts: false });
    let selected_workout = this.state.workoutData.find(
      (x) =>
        x.day_number === parseInt(moment(day).format("D")) &&
        x.assigned_user_events?.length > 0
    );
    this.setState({
      // selectedDate: day.dateString,
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
    const teamId = this.props.match.params.id;
    try {
      const res = await standardPostApi(
        "assigned_workout_calender",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          calender_month: month,
          calender_year: year,
          access_team_id: teamId,
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
    const teamId = this.props.match.params.id;
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
            assigned_team_id: teamId,
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

  render() {
    const { startTime, selectedEvent } = this.state;

    const highlightWithRanges = [
      {
        "react-datepicker__day--highlighted-custom-1": [
          ...this.state.markedDates,
        ],
      },
    ];
    // console.log("workoutData", this.state.selectedEvent);

    // console.log("event Name", this.state.eventName);
    // console.log("Description", this.state.Description);
    // console.log("START TIME", this.state.startTime);
    // console.log("END TIME", this.state.endTime);
    const coachRoles = localStorage.getItem("access_role");

    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid pr-0">
              <div className=" testing_protocol_react">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link
                      to={`/myplayers/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                    >
                      {this.props.match.params.teamname}
                    </Link>
                  </li>

                  {coachRoles === "Assistant Coach" ? null : (
                    <li className="breadcrumb-item">Add Event</li>
                  )}
                </ol>
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
                    className="table-responsive mt-5"
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
                      <ViewEvent
                        selectedEvent={selectedEvent}
                        teamId={this.props.match.params.id}
                        onLoadData={this.onLoadData}
                      />
                    )}
                    {coachRoles === "Assistant Coach" ? null : (
                      <>
                        {moment(moment().format("DD-MM-YYYY"), "DD-MM-YYYY")
                          .toDate()
                          .getTime() <=
                          moment(
                            moment(this.state.date).format("DD-MM-YYYY"),
                            "DD-MM-YYYY"
                          )
                            .toDate()
                            .getTime() && (
                          <AddEvent
                            startTime={startTime}
                            onChange={this.onChange}
                            state={this.state}
                            handelStartTime={this.handelStartTime}
                            handelEndTime={this.handelEndTime}
                            calendarAddEvent={this.calendarAddEvent}
                          />
                        )}
                      </>
                    )}
                  </div>
                )}{" "}
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default CoachAddEvent;
