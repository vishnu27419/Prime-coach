import React, { Component } from "react";
import "../CoachAddEvent.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@material-ui/core";

export class AddTeamPlayerEvent extends Component {
  render() {
    const {
      startTime,
      onChange,
      state,
      handelStartTime,
      handelEndTime,
      calendarAddEvent,
    } = this.props;

    return (
      <div>
        <div className="add-event-form form-group">
          <div className="add-event-fields">
            <label htmlFor="">Event Name</label>
            <input
              type="text"
              className="form-control"
              name="eventName"
              value={state.eventName}
              onChange={(e) => onChange(e)}
            />
            <p
              className="react_validation"
              style={{ marginBottom: "0px", fontSize: "15px" }}
            >
              {state.nameError}
            </p>
          </div>
          <div className="add-event-fields">
            <label htmlFor="">Start Time</label>
            <DatePicker
              selected={startTime}
              onChange={(date) => handelStartTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
            <p
              className="react_validation"
              style={{ marginBottom: "0px", fontSize: "15px" }}
            >
              {state.startTimeError}
            </p>
          </div>
          <div className="add-event-fields">
            <label htmlFor="">End Time</label>
            <DatePicker
              selected={state.endTime}
              onChange={(date) => handelEndTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
            <p
              className="react_validation"
              style={{ marginBottom: "0px", fontSize: "15px" }}
            >
              {state.endTimeError}
            </p>
          </div>
          <div className="add-event-fields">
            <label htmlFor="">Description</label>
            <textarea
              rows="4"
              cols="50"
              className="form-control"
              style={{ resize: "none" }}
              name="Description"
              value={state.Description}
              onChange={(e) => onChange(e)}
            ></textarea>
            <p
              className="react_validation"
              style={{ marginBottom: "0px", fontSize: "15px" }}
            >
              {state.descriptionError}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              style={{
                padding: "5px 56px",
                border: "1px solid green",
                color: "#fff",
                marginTop: "20px",
              }}
              onClick={() => calendarAddEvent()}
              disabled={state.onAddLoader}
            >
              Add
              {state.onAddLoader && (
                <i
                  className="fa fa-spinner fa-pulse"
                  style={{ marginLeft: "7px" }}
                />
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTeamPlayerEvent;
