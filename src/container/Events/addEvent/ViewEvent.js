import { Button } from "@material-ui/core";
import { standardPostApi } from "container/API/ApiWrapper";
import moment from "moment";
import React, { Component } from "react";
import { successToast } from "utils/toastMessage";
import "../CoachAddEvent.css";
import DeleteCoachEventModal from "../DeleteCoachEventModal";
import ViewEventModal from "./ViewEventModal";

export class ViewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewEventModal: false,
      viewModalData: {},
      editEventName: "",
      editStartTime: new Date(),
      editEndTime: new Date(),
      editDescription: "",
      date: new Date(),
      eventId: null,
      nameError: "",
      descriptionError: "",
      startTimeError: "",
      endTimeError: "",
      isEditLoading: false,
      isDeleteLoading: false,
      // deleteModal: false,
    };
  }

  toggleModal = (item) => {
    console.log("item", item);
    this.setState({
      viewEventModal: !this.state.viewEventModal,
      viewModalData: item,
      eventId: item.id,
      editEventName: item?.event_name,
      editStartTime: moment(item?.event_time, "HH:mm:ss").toDate(),
      editEndTime: moment(item?.event_end_time, "HH:mm:ss").toDate(),
      editDescription: item?.event_description,
      date: moment(item?.event_date, "YYYY-MM-DD").toDate(),
    });

    console.log("start Date", this.state.editStartTime);
  };

  closeModal = () => {
    this.setState({
      viewEventModal: false,
      nameError: "",
      descriptionError: "",
      startTimeError: "",
      endTimeError: "",
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("this is State", this.state);
  };

  handelStartTimeChange = async (date) => {
    await this.setState({ editStartTime: date });
    console.log("THIS IS DATE ", this.state.editStartTime);
  };

  handelEndTimeChange = async (date) => {
    await this.setState({ editEndTime: date });
    console.log("THIS IS END TIME ONCHANGE ", this.state.editEndTime);
  };

  calendar_events_update = async () => {
    const {
      editEventName,
      editDescription,
      editStartTime,
      editEndTime,
      date,
      eventId,
    } = this.state;
    const teamId = this.props.teamId;

    const Date = moment(date).format("YYYY-MM-DD");
    const start_Time = moment(editStartTime).format("HH:mm:ss");
    const end_Time = moment(editEndTime).format("HH:mm:ss");

    const isValid = this.validationCalenderUpdateEvent();
    if (isValid) {
      this.setState({ isEditLoading: true });
      try {
        const res = await standardPostApi(
          "calendar_events_add_update",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            assigned_team_id: teamId,
            event_id: eventId,
            event_name: editEventName,
            event_description: editDescription,
            event_date: Date,
            event_time: start_Time,
            event_end_time: end_Time,
            api_action: "update",
          },
          true
        );
        if (res.data.code === 200) {
          console.log("Response of Update event", res.data);
          successToast(res.data.message);
          this.props.onLoadData(
            moment(this.state.date).toDate().getMonth() + 1,
            moment(this.state.date).toDate().getFullYear()
          );
          this.closeModal();
        }
      } catch (error) {
        console.error("error of Update event", error);
      } finally {
        this.setState({ isEditLoading: false });
      }
    }
  };

  validationCalenderUpdateEvent = () => {
    const { editStartTime, editEndTime, date } = this.state;
    let nameError = "";
    let descriptionError = "";
    let startTimeError = "";
    let endTimeError = "";

    let Time = moment(editStartTime).format("HH:mm:ss");

    const StartTimeStamp = moment(
      moment(date).format("YYYY-MM-DD") + " " + Time,
      "YYYY-MM-DD HH:mm:ss"
    )
      .toDate()
      .getTime();

    let EndTime = moment(editEndTime).format("HH:mm:ss");
    const EndTimeStamp = moment(
      moment(date).format("YYYY-MM-DD") + " " + EndTime,
      "YYYY-MM-DD HH:mm:ss"
    )
      .toDate()
      .getTime();

    if (!this.state.editEventName) {
      nameError = "Event name field is required.";
    }

    if (!this.state.editDescription) {
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

  calendar_events_delete = async () => {
    const { viewModalData } = this.state;

    const Date = moment(viewModalData?.event_date).format("YYYY-MM-DD");
    const start_Time = moment(viewModalData?.event_time).format("HH:mm:ss");
    const end_Time = moment(viewModalData?.event_end_time).format("HH:mm:ss");
    if (
      window.confirm(
        "Are you sure you want to delete this event, this change cannot be undone?"
      )
    ) {
      this.setState({ isDeleteLoading: true });
      try {
        const res = await standardPostApi(
          "calendar_events_add_update",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            assigned_team_id: viewModalData?.assigned_team,
            event_id: viewModalData?.id,
            event_name: viewModalData?.event_name,
            event_description: viewModalData?.event_description,
            event_date: Date,
            event_time: start_Time,
            event_end_time: end_Time,
            api_action: "delete",
          },
          true
        );
        if (res.data.code === 200) {
          console.log("response", res.data);
          successToast(res.data.message);
          this.props.onLoadData(
            moment(this.state.date).toDate().getMonth() + 1,
            moment(this.state.date).toDate().getFullYear()
          );
          this.closeModal();
        }
      } catch (error) {
        console.error("Errror of Delete event", error);
      } finally {
        this.setState({ isDeleteLoading: false });
      }
    }
  };

  render() {
    const { selectedEvent } = this.props;

    return (
      <div
        className="add-event "
        style={
          selectedEvent.length < 3
            ? {
                background: "rgba(255, 255, 255, 0.06)",
                color: "#fff",
                padding: "15px 15px 15px",
                borderRadius: " 10px",
              }
            : {
                background: "rgba(255, 255, 255, 0.06)",
                color: "#fff",
                padding: "15px 15px 15px",
                borderRadius: " 10px",
                overflowY: "scroll",
                height: "500px",
              }
        }
      >
        {selectedEvent?.map((item) => {
          return (
            <div class="custom-event" key={item?.id}>
              <h5>
                {item?.event_name} (
                {moment(item.event_time, "HH:mm:ss").format("hh:mm a")} -{" "}
                {moment(item.event_end_time, "HH:mm:ss").format("hh:mm a")})
              </h5>
              <h6>{item?.event_description}</h6>
              <Button
                variant="outlined"
                style={{
                  padding: "5px 56px",
                  border: "1px solid green",
                  color: "#fff",
                }}
                onClick={() => this.toggleModal(item)}
              >
                View Event
              </Button>
            </div>
          );
        })}
        <ViewEventModal
          show={this.state.viewEventModal}
          onHide={this.toggleModal}
          viewModalData={this.state.viewModalData}
          state={this.state}
          onChange={this.onChange}
          handelStartTimeChange={this.handelStartTimeChange}
          handelEndTimeChange={this.handelEndTimeChange}
          calendar_events_update={this.calendar_events_update}
          closeModal={this.closeModal}
          toggleDeleteModal={this.calendar_events_delete}
        />

        {/* <DeleteCoachEventModal
          show={this.state.deleteModal}
          onHide={this.toggleDeleteModal}
        /> */}
      </div>
    );
  }
}

export default ViewEvent;
