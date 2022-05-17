import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import Checkbox from "component/Checkbox/Checkbox";
// import CircularProgressWithLabel from "../progressBar/ProgressBar";
import LinearWithValueLabel from "../progressBar/LinerBar";
import { Tooltip } from "@material-ui/core";

class EditScreeningProtocol extends Component {
  constructor(props) {
    super(props);
    this.state = { fileInpIndex: undefined };
  }
  render() {
    const {
      show,
      onHide,
      state,
      onChange,
      updateToggleCb,
      handelUpdateScreeningProtocol,
      onFileUpdateChange,
      addNewScreeningProtocolOnUpdate,
      updateTest,
      updateDescription,
      updateNameField,
      updateToggleInUpdateCb,
      onFileUpdatePreArrayChange,
      updateScreeningProtocolApi,
      editModalDeleteEvent,
      toggleEditDelete,
    } = this.props;

    return (
      <div>
        <div>
          <Modal show={show} onHide={() => false} centered size="lg">
            <Modal.Body>
              <div className="modal-header">
                <h5 className="modal-title" id="protocol">
                  Edit Screening Protocol
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
                    name="updateNameField"
                    defaultValue={updateNameField}
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>NAME OF THE TEST</th>
                        <th>DESCRIPTION OF TEST</th>
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
                            name="updateTest"
                            value={updateTest}
                            onChange={(e) => onChange(e)}
                          />
                          <p className="react_validation">
                            {state.updateTestError}
                          </p>
                        </td>

                        <td>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            name="updateDescription"
                            value={updateDescription}
                            onChange={(e) => onChange(e)}
                          />
                          <p className="react_validation">
                            {state.updateDescriptionError}
                          </p>
                        </td>

                        <td colSpan="2">
                          <div className="form-inline">
                            <div>
                              <Checkbox
                                checked={state.updateComment}
                                toggleCb={() => updateToggleCb()}
                              />
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="custom-control custom-checkbox">
                            <div>
                              <Tooltip arrow title="Add new Test">
                                <button
                                  type="button"
                                  className="btn btn-danger add_Check_Button"
                                  onClick={() =>
                                    addNewScreeningProtocolOnUpdate()
                                  }
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
                          style={{ borderTop: "none" }}
                          className="screening_protocol_comment_td"
                        >
                          <input
                            type="file"
                            onChange={(e) => onFileUpdateChange(e)}
                            style={{ display: "none" }}
                            accept="video/mp4"
                            ref={(ref) => (this.fileInput1 = ref)}
                            onClick={(e) => (e.target.value = null)}
                          />
                          <button
                            className="screening_protocol_comment_btn form-control"
                            onClick={() => this.fileInput1.click()}
                            style={
                              state.editNewVideoUploadProgress !== null &&
                              state.editNewVideoUploadProgress !== undefined &&
                              state.editNewVideoUploadProgress.length !== 0
                                ? { cursor: "not-allowed" }
                                : { cursor: "pointer" }
                            }
                            disabled={
                              state.editNewVideoUploadProgress !== null &&
                              state.editNewVideoUploadProgress !== undefined &&
                              state.editNewVideoUploadProgress.length !== 0 &&
                              true
                            }
                          >
                            Upload video
                            <i className="fa fa-upload" aria-hidden="true"></i>
                            {/* {state.protocolUploadUpdateLoader && (
                              <i
                                className="fa fa-spinner fa-spin fa-3x fa-fw"
                                style={{
                                  color: "#337ab7",
                                  fontSize: "18px",
                                  marginRight: "5px",
                                }}
                              />
                            )} */}
                            {state.editNewVideoUploadProgress !== null &&
                              state.editNewVideoUploadProgress !== undefined &&
                              state.editNewVideoUploadProgress.length !== 0 && (
                                <LinearWithValueLabel
                                  progress={state.editNewVideoUploadProgress}
                                />
                              )}
                          </button>

                          <p
                            className="react_validation"
                            style={{ marginTop: "2px" }}
                          >
                            {state.selectedVideoUpdateError}
                          </p>
                        </td>
                        {state.showCreateProtocolViedioUpdate && (
                          <td
                            style={{ borderTop: "none" }}
                            className="screening_protocol_comment_td"
                          >
                            {state.selectedVideoUpdate && (
                              <video
                                width="220"
                                height="120"
                                controls
                                style={{ outline: 0 }}
                                src={URL.createObjectURL(
                                  state.selectedVideoUpdate
                                )}
                              >
                                {/* <source
                                  src={URL.createObjectURL(
                                    state.selectedVideoUpdate
                                  )}
                                /> */}
                              </video>
                            )}
                          </td>
                        )}
                      </tr>

                      {/* this is for input list start */}
                      {state.editDetails?.length !== 0 &&
                        state.editDetails?.map((item, ind) => {
                          return (
                            <>
                              <tr>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    defaultValue={item?.name}
                                    onChange={(text) =>
                                      handelUpdateScreeningProtocol(
                                        ind,
                                        "name",
                                        text
                                      )
                                    }
                                  />
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    defaultValue={item?.description}
                                    onChange={(text) =>
                                      handelUpdateScreeningProtocol(
                                        ind,
                                        "description",
                                        text
                                      )
                                    }
                                  />
                                </td>

                                <td colSpan="2">
                                  <div className="form-inline">
                                    <div>
                                      <Checkbox
                                        style={{ marginLeft: "5px" }}
                                        checked={
                                          item?.comment_allowed == "1"
                                            ? true
                                            : false
                                        }
                                        toggleCb={() =>
                                          updateToggleInUpdateCb(item, ind)
                                        }
                                      />
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <div className="custom-control custom-checkbox">
                                    <div>
                                      <Tooltip
                                        arrow
                                        title={`Delete ${item?.name} test`}
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-danger "
                                          onClick={() =>
                                            // editModalDeleteEvent(ind)
                                            toggleEditDelete(ind)
                                          }
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
                                  <video
                                    width="250"
                                    height="140"
                                    controls
                                    src={item?.full_path}
                                  >
                                    {/* <source
                                      src={item?.full_path}
                                      type="video/mp4"
                                    /> */}
                                  </video>

                                  <input
                                    type="file"
                                    onChange={(event) => {
                                      onFileUpdatePreArrayChange(
                                        event,
                                        this.state.fileInpIndex
                                      );
                                    }}
                                    style={{ display: "none" }}
                                    accept=" video/webm, video/mp4"
                                    ref={(ref) => (this.fileInput = ref)}
                                    onClick={(e) => (e.target.value = null)}
                                  />
                                  <button
                                    className="screening_protocol_comment_btn form-control"
                                    onClick={() => {
                                      this.setState({ fileInpIndex: ind });
                                      this.fileInput.click();
                                    }}
                                    style={
                                      state.videoUploadProgress[ind] !== null &&
                                      state.videoUploadProgress[ind] !==
                                        undefined
                                        ? {
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            cursor: "not-allowed",
                                          }
                                        : {
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            cursor: "pointer",
                                          }
                                    }
                                    disabled={
                                      state.videoUploadProgress[ind] !== null &&
                                      state.videoUploadProgress[ind] !==
                                        undefined &&
                                      true
                                    }
                                  >
                                    <span style={{ flexDirection: "none" }}>
                                      Upload video{" "}
                                      <i
                                        className="fa fa-upload"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    {/* {state.protocolUploadUpdatePreLoader &&
                                      state.updateIndex == ind && (
                                        <i
                                          className="fa fa-spinner fa-spin fa-3x fa-fw"
                                          style={{
                                            color: "#337ab7",
                                            fontSize: "18px",
                                            marginRight: "5px",
                                          }}
                                        />
                                        
                                      )} */}
                                    {state.videoUploadProgress[ind] !== null &&
                                      state.videoUploadProgress[ind] !==
                                        undefined && (
                                        // <CircularProgressWithLabel
                                        // progress={
                                        //   state.videoUploadProgress[ind]
                                        // }
                                        // />
                                        <LinearWithValueLabel
                                          progress={
                                            state.videoUploadProgress[ind]
                                          }
                                        />
                                      )}
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })}

                      {/* this is input list ends */}
                    </tbody>
                  </table>
                </div>
              </div>
            </Modal.Body>
            <ModalFooter>
              <Tooltip
                arrow
                title={`Edit ${updateNameField} screening protocol`}
              >
                <button
                  type="button"
                  className="Model_btn"
                  data-dismiss="modal"
                  onClick={() => updateScreeningProtocolApi()}
                >
                  Edit
                </button>
              </Tooltip>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default EditScreeningProtocol;
