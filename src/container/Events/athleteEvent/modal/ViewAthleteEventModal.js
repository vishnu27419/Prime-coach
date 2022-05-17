import moment from "moment";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class ViewAthleteEventModal extends Component {
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
                <label
                  htmlFor=""
                  style={{
                    color: "#000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  Event Name
                </label>

                <div>
                  <div class="card">
                    <div
                      class="container"
                      style={{
                        // backgroundColor: "rgb(228 227 227)",
                        textAlign: "justify",
                        borderRadius: "5px",
                        border: "1px dashed #2EA6FE ",
                        padding: "5px",
                      }}
                    >
                      <p style={{ color: "#000" }}>{state?.editEventName}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-event-fields">
                <label
                  htmlFor=""
                  style={{
                    color: "#000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  Start Time
                </label>

                <div>
                  <div class="card">
                    <div
                      class="container"
                      style={{
                        // backgroundColor: "rgb(228 227 227)",
                        textAlign: "justify",
                        borderRadius: "5px",
                        border: "1px dashed #2EA6FE ",
                        padding: "5px",
                      }}
                    >
                      <p style={{ color: "#000" }}>
                        {moment(state.editStartTime, "HH:mm:ss").format(
                          "hh:mm a"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-event-fields">
                <label
                  htmlFor=""
                  style={{
                    color: "#000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  End Time
                </label>

                <div>
                  <div class="card">
                    <div
                      class="container"
                      style={{
                        // backgroundColor: "rgb(228 227 227)",
                        textAlign: "justify",
                        borderRadius: "5px",
                        border: "1px dashed #2EA6FE ",
                        padding: "5px",
                      }}
                    >
                      <p style={{ color: "#000" }}>
                        {moment(state.editEndTime, "HH:mm:ss").format(
                          "hh:mm a"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-event-fields">
                <label
                  htmlFor=""
                  style={{
                    color: "#000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  Description
                </label>

                <div>
                  <div class="card">
                    <div
                      class="container"
                      style={{
                        // backgroundColor: "rgb(228 227 227)",
                        textAlign: "justify",
                        borderRadius: "5px",
                        border: "1px dashed #2EA6FE ",
                        padding: "5px",
                      }}
                    >
                      <p style={{ color: "#000" }}>{state.editDescription}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="add-event-fields">
                <label
                  htmlFor=""
                  style={{
                    color: "#000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  Attendance
                </label>

                <div>
                  <div class="card">
                    <div
                      class="container"
                      style={{
                        // backgroundColor: "rgb(228 227 227)",
                        textAlign: "justify",
                        borderRadius: "5px",
                        border: "1px dashed #2EA6FE ",
                        padding: "5px",
                      }}
                    >
                      <p style={{ color: "#000" }}>
                        {state?.userAttandance === false
                          ? "Not Available"
                          : "Available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="button"
              className="Model_btn "
              data-dismiss="modal"
              onClick={() => closeModal()}
              style={{ padding: "5px ​36p" }}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ViewAthleteEventModal;
