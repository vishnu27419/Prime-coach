import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calander from "../../Custom/images/celender.jpg";

export class ViewMedicalCriteriaModal extends Component {
  render() {
    const { show, onHide, parentState, selectPickerName } = this.props;

    return (
      <div>
        <Modal
          show={show}
          onHide={onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="lg"
          contentClassName="view-Modal"
        >
          <Modal.Body>
            <div className="modal-header">
              <h3
                className="modal-title"
                id="videopopupTitle"
                style={{ color: "#2F84CA", textTransform: "uppercase" }}
              >
                View Medical Criteria
              </h3>
              <button type="button" className="close" onClick={onHide}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
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

              <div className="form-group">
                <label style={{ fontWeight: "bold" }}>Comment</label>
                <div className="form-group">
                  <textarea
                    rows="4"
                    cols="70"
                    className="form-control"
                    style={{
                      cursor: "not-allowed",
                      border: "1px solid #2f84ca",
                    }}
                    defaultValue={parentState?.userStatusObj?.comment}
                    readOnly
                  ></textarea>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="form-group">
                  <label style={{ fontWeight: "bold" }}>Type</label>
                  <div className="form-group">
                    {parentState?.userStatusObj
                      ?.medical_status_criteria_type === "out" ? (
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
                          cursor: "not-allowed",
                        }}
                        disabled={true}
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
                          cursor: "not-allowed",
                        }}
                        disabled={true}
                      >
                        In
                      </button>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ fontWeight: "bold" }}>Entry Date</label>
                  <div>
                    <div className="form-group">
                      <DatePicker
                        selected={
                          new Date(parentState?.userStatusObj?.entry_date)
                        }
                        name="DateOfBirth"
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        showMonthDropdown
                        showYearDropdown
                        placeholderText="dd/MM/yyyy"
                        dropdownMode="select"
                        ref={(ref) => (this.accordionContent = ref)}
                        autoComplete="off"
                        disabled
                      />
                      <img
                        className="celender_img "
                        src={Calander}
                        alt={Calander}
                        onClick={() => this.accordionContent.onInputClick()}
                        style={{ cursor: "not-allowed" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <ModalFooter
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={onHide}
          >
            <button type="button" className="Model_btn ">
              Close
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ViewMedicalCriteriaModal;
