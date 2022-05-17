import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
// import Checkbox from "../../component/Checkbox/Checkbox";
import Checkbox from "component/Checkbox/Checkbox";
import { Fragment } from "react";
import LinearWithValueLabel from "../progressBar/LinerBar";
import { Tooltip } from "@material-ui/core";

export class CreateScreeningProtocol extends Component {
  render() {
    const {
      show,
      onHide,
      state,
      onChange,
      toggleCb,
      onFileChange,
      addNewScreeningProtocol,
      deleteEvent,
      createScreeningProtocolApi,
    } = this.props;

    // console.log(
    //   "URL.createObjectURL(state.selectedVideo)",
    //   state.selectedVideo ? URL.createObjectURL(state.selectedVideo) : null
    // );

    return (
      <div>
        <Modal show={show} onHide={() => false} centered size="lg">
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="protocol">
                Create Screening Protocol
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onHide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="protocolName"
                  value={state.protocolName}
                  onChange={(e) => onChange(e)}
                />
                <p className="react_validation">{state.protocolNameError}</p>
              </div>

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>NAME OF THE TEST</th>
                      <th>DESCRIPTION OF THE TEST</th>
                      <th>Comment</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="nameOfTest"
                          value={state.nameOfTest}
                          onChange={(e) => onChange(e)}
                        />
                        <p className="react_validation">
                          {state.nameOfTestError}
                        </p>
                      </td>

                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="descriptionOfTest"
                          value={state.descriptionOfTest}
                          onChange={(e) => onChange(e)}
                        />
                        <p className="react_validation">
                          {state.descriptionOfTestError}
                        </p>
                      </td>

                      <td colSpan="2">
                        <div className="form-inline">
                          <div>
                            <Checkbox
                              style={{ marginLeft: "5px" }}
                              checked={state.comments}
                              toggleCb={() => toggleCb()}
                            />
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="custom-control custom-checkbox">
                          <div>
                            <Tooltip arrow title="Add new test">
                              <button
                                type="button"
                                className="btn btn-danger add_Check_Button"
                                onClick={() => addNewScreeningProtocol()}
                                title="adbkabndj,"
                              >
                                <i className="fa fa-check"></i>
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style={{ borderTop: "none", cursor: "pointer" }}
                        className="screening_protocol_comment_td"
                      >
                        <input
                          type="file"
                          onChange={(e) => onFileChange(e)}
                          style={{ display: "none" }}
                          accept="video/mp4"
                          ref={(ref) => (this.fileInput = ref)}
                          onClick={(e) => (e.target.value = null)}
                        />
                        <button
                          className="screening_protocol_comment_btn form-control"
                          onClick={() => this.fileInput.click()}
                          style={
                            state.createVideoUploadProgress !== null &&
                            state.createVideoUploadProgress !== undefined &&
                            state.createVideoUploadProgress.length !== 0
                              ? { cursor: "not-allowed" }
                              : { cursor: "pointer" }
                          }
                          disabled={
                            state.createVideoUploadProgress !== null &&
                            state.createVideoUploadProgress !== undefined &&
                            state.createVideoUploadProgress.length !== 0 &&
                            true
                          }
                        >
                          Upload video
                          <i className="fa fa-upload" aria-hidden="true"></i>
                          {/* {state.protocolUploadLoader && (
                            <i
                              className="fa fa-spinner fa-spin fa-3x fa-fw"
                              style={{
                                color: "#337ab7",
                                fontSize: "18px",
                                marginRight: "5px",
                              }}
                            />
                          )} */}
                          {state.createVideoUploadProgress !== null &&
                            state.createVideoUploadProgress !== undefined &&
                            state.createVideoUploadProgress.length !== 0 && (
                              <LinearWithValueLabel
                                progress={state.createVideoUploadProgress}
                              />
                            )}
                        </button>
                        <p className="react_validation">
                          {state.selectedVideoError}
                        </p>
                      </td>

                      {state.showCreateProtocolViedio && (
                        <td
                          style={{ borderTop: "none" }}
                          className="screening_protocol_comment_td"
                        >
                          {state.selectedVideo ? (
                            <video
                              width="220"
                              height="120"
                              controls
                              style={{ outline: 0 }}
                              src={URL.createObjectURL(state.selectedVideo)}
                            >
                              {/* <source
                                src={URL.createObjectURL(state.selectedVideo)}
                              /> */}
                            </video>
                          ) : null}
                        </td>
                      )}
                    </tr>

                    {/* this is for input list start */}

                    <>
                      {state.inputDisplay.length !== 0 &&
                        state.inputDisplay.map((data, index) => {
                          return (
                            <Fragment key={index}>
                              <tr>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    defaultValue={data.name}
                                    readOnly
                                  />
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    defaultValue={data.description}
                                    readOnly
                                  />
                                </td>

                                <td colSpan="2">
                                  <div className="form-inline">
                                    <div>
                                      <Checkbox
                                        style={{ marginLeft: "5px" }}
                                        checked={data.comment_allowed}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </td>

                                <td>
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

                              <tr>
                                <td
                                  style={{ borderTop: "none", paddingTop: 0 }}
                                  className="screening_protocol_comment_td"
                                >
                                  <video width="250" height="140" controls>
                                    <source src={data.video} type="video/mp4" />
                                  </video>
                                </td>
                              </tr>
                            </Fragment>
                          );
                        })}
                    </>

                    {/* this is input list ends */}
                  </tbody>
                </table>
              </div>
            </div>
          </Modal.Body>
          <ModalFooter>
            <Tooltip arrow title="Save screening protocol">
              <button
                type="button"
                className="Model_btn"
                data-dismiss="modal"
                onClick={() => createScreeningProtocolApi()}
                // disabled={state.disableCreateButton ? false : true}
                // style={
                //   state.disableCreateButton
                //     ? {}
                //     : { backgroundColor: "lightgray" }
                // }
              >
                Save
              </button>
            </Tooltip>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CreateScreeningProtocol;
