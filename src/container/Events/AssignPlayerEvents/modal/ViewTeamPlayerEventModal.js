import moment from "moment";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class ViewTeamPlayerEventModal extends Component {
  render() {
    const {
      state,
      onChange,
      handelStartTimeChange,
      handelEndTimeChange,
      calendar_events_update,
      closeModal,
      toggleDeleteModal,
    } = this.props;
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={() => closeModal()}
          animation={true}
          centered
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="teamcreate">
                View Events
              </h5>
              <button
                type="button"
                className="close "
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => closeModal()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="add-event-form form-group"
              style={{ border: "none", padding: "10px 20px 0px" }}
            >
              <div className="add-event-fields">
                <label htmlFor="" style={{ color: "#000" }}>
                  Event Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={state?.editEventName}
                  name="editEventName"
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
                <label htmlFor="" style={{ color: "#000" }}>
                  Start Time
                </label>
                <DatePicker
                  selected={state.startTime}
                  onChange={(date) => handelStartTimeChange(date)}
                  value={moment(state.editStartTime, "HH:mm:ss").format(
                    "hh:mm a"
                  )}
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
                <label htmlFor="" style={{ color: "#000" }}>
                  End Time
                </label>
                <DatePicker
                  selected={state.editEndTime}
                  onChange={(date) => handelEndTimeChange(date)}
                  value={moment(state.editEndTime, "HH:mm:ss").format(
                    "hh:mm a"
                  )}
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
                <label htmlFor="" style={{ color: "#000" }}>
                  Description
                </label>
                <textarea
                  rows="4"
                  cols="50"
                  className="form-control"
                  style={{ resize: "none" }}
                  // defaultValue={viewModalData?.event_description}
                  value={state.editDescription}
                  name="editDescription"
                  onChange={(e) => onChange(e)}
                ></textarea>
                <p
                  className="react_validation"
                  style={{ marginBottom: "0px", fontSize: "15px" }}
                >
                  {state.descriptionError}
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              type="button"
              className="Model_btn_Cancel "
              data-dismiss="modal"
              style={{
                background: "red",
                border: "1px solid red",
                color: "#fff",
              }}
              onClick={() => toggleDeleteModal()}
              disabled={state?.isDeleteLoading}
            >
              Delete
              {state?.isDeleteLoading && (
                <i
                  className="fa fa-spinner fa-pulse"
                  style={{ marginLeft: "7px", color: "#fff" }}
                />
              )}
            </button>{" "}
            <button
              type="button"
              className="Model_btn "
              data-dismiss="modal"
              // onClick={props.delete_annual_training_program_workout}
              onClick={() => calendar_events_update()}
              style={{ padding: "5px ​36p" }}
              disabled={state?.isEditLoading}
            >
              Save{" "}
              {state?.isEditLoading && (
                <i
                  className="fa fa-spinner fa-pulse"
                  style={{ marginLeft: "7px", color: "#fff" }}
                />
              )}
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ViewTeamPlayerEventModal;
