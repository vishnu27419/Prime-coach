import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import Checkbox from "component/Checkbox/Checkbox";
import { Tooltip } from "@material-ui/core";
import { Fragment } from "react";

// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calander from "../../Custom/images/celender.jpg";
import moment from "moment";

export class AddCriteriaResutModal extends Component {
  render() {
    const {
      show,
      onHide,
      parentState,
      onChange,
      handleAddDateChange,
      handelAddUserMadicalStatus,
      selectPickerName,
      toggleTypeButton,
      toggleTypeOutButton,
    } = this.props;

    return (
      <div>
        <Modal show={show} onHide={onHide} centered size="lg">
          <Modal.Body>
            <div className="modal-header">
              <h3
                className="modal-title"
                id="protocol"
                style={{ color: "#2F84CA", textTransform: "uppercase" }}
              >
                Edit Medical Status
              </h3>
              <Tooltip arrow title="Close">
                <button type="button" className="close" onClick={onHide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </Tooltip>
            </div>

            <div className="modal-body">
              {/* {parentState?.criteriaObj?.comment_allowed == 1 && ( */}

              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Team Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  defaultValue={parentState?.userStatusObj?.team_name}
                  readOnly
                  style={{ cursor: "not-allowed", border: "1px solid #2f84ca" }}
                />
                {/* <p className="react_validation">{state.protocolNameError}</p> */}
              </div>

              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Player Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  defaultValue={`${parentState?.playerObj?.user_first_name} ${parentState?.playerObj?.user_last_name}`}
                  readOnly
                  style={{ cursor: "not-allowed", border: "1px solid #2f84ca" }}
                />
                {/* <p className="react_validation">{state.protocolNameError}</p> */}
              </div>

              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Medical Criteria Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  defaultValue={selectPickerName}
                  readOnly
                  style={{ cursor: "not-allowed", border: "1px solid #2f84ca" }}
                />
                {/* <p className="react_validation">{state.protocolNameError}</p> */}
              </div>

              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Criteria Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  defaultValue={parentState?.criteriaObj?.name}
                  readOnly
                  style={{ cursor: "not-allowed", border: "1px solid #2f84ca" }}
                />
                {/* <p className="react_validation">{state.protocolNameError}</p> */}
              </div>

              {console.log("parentState.comment", parentState.comment)}
              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>Comment</label>
                <div className="form-group">
                  <textarea
                    rows="4"
                    cols="70"
                    className="form-control"
                    style={{ border: "2px solid #2f84ca" }}
                    name="comment"
                    value={parentState.comment}
                    onChange={(e) => onChange(e)}
                  ></textarea>
                  <p className="react_validation">{parentState.commentError}</p>
                </div>
              </div>
              {/* )} */}

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="form-group">
                  <label style={{ fontWeight: "bold" }}>Type</label>
                  <div className="form-group">
                    <Tooltip title="Tap this button to switch out and in">
                      {parentState.inOutSwitchBtn === "out" ? (
                        <button
                          style={{
                            padding: "4px 64px",
                            background: "#C82332",
                            color: "#fff",
                            border: "1px solid #000",
                            fontWeight: "bold",
                            boxShadow:
                              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => toggleTypeOutButton("in")}
                        >
                          out
                        </button>
                      ) : (
                        <button
                          style={{
                            padding: "4px 64px",
                            background: "#5CB85C",
                            color: "#fff",
                            border: "1px solid #000",
                            fontWeight: "bold",
                            boxShadow:
                              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => toggleTypeButton("out")}
                        >
                          In
                        </button>
                      )}
                    </Tooltip>
                  </div>
                </div>
                <div className="form-group">
                  <label style={{ fontWeight: "bold" }}>Date</label>
                  <div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        defaultValue={moment(parentState?.date).format(
                          "DD-MM-YYYY"
                        )}
                        readOnly
                        style={{ cursor: "not-allowed " }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <ModalFooter>
            <Tooltip arrow title="Add Medical Status">
              <button
                type="button"
                className="Model_btn"
                data-dismiss="modal"
                onClick={() => handelAddUserMadicalStatus()}
                disabled={parentState.addLodaer}
                style={
                  parentState.addLodaer
                    ? { cursor: "not-allowed" }
                    : { cursor: "pointer" }
                }
              >
                Edit{" "}
                {parentState.addLodaer && (
                  <i
                    className="fa fa-spinner fa-spin fa-3x fa-fw"
                    style={{
                      color: "#fff",
                      fontSize: "15px",
                    }}
                  />
                )}
              </button>
            </Tooltip>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddCriteriaResutModal;
