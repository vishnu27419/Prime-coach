import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
// import Checkbox from "../../component/Checkbox/Checkbox";
import Checkbox from "component/Checkbox/Checkbox";
import { Fragment } from "react";
// import LinearWithValueLabel from "../progressBar/LinerBar";
import { Tooltip } from "@material-ui/core";

export class CreateCoachLibrary extends Component {
  render() {
    const {
      show,
      onHide,
      parentState,
      onChange,
      addNewTips,
      hendelAddCoachLibrary,
      currentTeamName,
      deleteEvent,
    } = this.props;
    return (
      <div>
        <Modal
          show={show}
          // onHide={onHide}
          centered
          size="lg"
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="protocol">
                Create Coach Library
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={parentState.createLibraryLoader ? null : onHide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Activity Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="activityName"
                  value={parentState.activityName}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="form-group">
                  <label htmlFor="" style={{ fontWeight: "bold" }}>
                    Video Link
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="videoName"
                    value={parentState.videoName}
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="" style={{ fontWeight: "bold" }}>
                    Team Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    // name="teamName"
                    // value={parentState.teamName}
                    defaultValue={currentTeamName}
                    // onChange={(e) => onChange(e)}
                    readOnly
                    style={{ cursor: "not-allowed" }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Description
                </label>
                <textarea
                  cols="4"
                  rows="4"
                  className="form-control"
                  style={{ resize: "none" }}
                  name="description"
                  value={parentState.description}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ borderTop: "none" }}>Tips</th>

                      {/* <th style={{ borderTop: "none" }}></th> */}
                      <th style={{ borderTop: "none" }}></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      style={
                        parentState?.inputList.length
                          ? {
                              borderBottom: "3px solid #338AB7",
                            }
                          : {}
                      }
                    >
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          // placeholder="Tips Name"
                          style={{ width: "100%" }}
                          name="tips"
                          value={parentState.tips}
                          onChange={(e) => onChange(e)}
                        />
                        <p className="react_validation">
                          {parentState.tipsError}
                        </p>
                      </td>

                      <td>
                        <div className="custom-control custom-checkbox">
                          <div>
                            <Tooltip arrow title="Add new tip">
                              <button
                                type="button"
                                className="btn btn-danger add_Check_Button"
                                onClick={() => addNewTips()}
                              >
                                <i className="fa fa-check"></i>
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {/* this is for input list start */}
                    {parentState.inputList.map((item, index) => {
                      return (
                        <Fragment>
                          <tr key={item?.id}>
                            <td
                              style={{
                                borderTop: "none",
                                cursor: "not-allowed",
                              }}
                            >
                              <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                readOnly
                                defaultValue={item?.tip}
                              />
                            </td>

                            <td style={{ borderTop: "none" }}>
                              <div className="custom-control custom-checkbox">
                                <div>
                                  <Tooltip arrow title="Delete test">
                                    <button
                                      type="button"
                                      className="btn btn-danger "
                                      onClick={() => deleteEvent(index)}
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  </Tooltip>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Modal.Body>
          <ModalFooter>
            <Tooltip arrow title="Save coach library">
              <button
                type="button"
                className="Model_btn"
                data-dismiss="modal"
                onClick={() => hendelAddCoachLibrary()}
                disabled={parentState.createLibraryLoader}
                style={
                  parentState.createLibraryLoader
                    ? { cursor: "not-allowed" }
                    : {}
                }
              >
                Save{" "}
                {parentState.createLibraryLoader && (
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

export default CreateCoachLibrary;
