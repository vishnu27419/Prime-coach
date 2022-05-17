import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
// import firstVideo from "Custom/Standing.mp4";
import no_video from "Custom/images/no_video.jpg";
import { Tooltip } from "@material-ui/core";

export class AddResultModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      show,
      onHide,
      state,
      onChange,
      onAddFileChange,
      addTestResultTest,
    } = this.props;

    const exercise = state.exerciseDetail;
    // console.log("this is Exercise Detial", exercise);
    // console.log("state.uploadAddVideo", state.uploadAddVideo);

    // state.uploadAddVideo &&
    //   console.log("URL", URL.createObjectURL(state.uploadAddVideo));
    return (
      <div>
        <Modal
          show={show}
          onHide={onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="lg"
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="videopopupTitle">
                Add New Testing Result
              </h5>
              <button type="button" className="close" onClick={onHide}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="addResult_heading">{exercise?.name}</div>

              {/* {exercise?.video_ref && ( */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <video width="58%" height="250" controls>
                  <source src={exercise?.video_ref} type="video/mp4" />
                </video>
              </div>
              <p
                style={{
                  marginTop: "33px",
                  marginBottom: "3rem",
                  textAlign: "justify",
                }}
              >
                {exercise?.description}
              </p>
              <hr />
              {/* )} */}
              <div className="row">
                {exercise?.comment_allowed !== "0" && (
                  <div className="form-group col-md-6">
                    <label className="addResult_label">Comments :</label>
                    <textarea
                      rows="7"
                      cols="70"
                      className="form-control"
                      style={{ border: "2px solid #2f84ca" }}
                      name="addComment"
                      value={state.addComment}
                      onChange={(e) => onChange(e)}
                    ></textarea>
                  </div>
                )}
                <div className=" col-md-6">
                  <div style={{ marginBottom: "2%" }}>
                    {state.uploadAddVideo ? (
                      <>
                        <label className="addResult_label">User Video :</label>
                        <video
                          width="100%"
                          height="auto"
                          controls
                          style={{ outline: 0 }}
                          // src={state.uploadAddVideo}
                          src={URL.createObjectURL(state.uploadAddVideo)}
                        >
                          {/* <source src={state.uploadAddVideo} /> */}
                        </video>
                      </>
                    ) : null}
                  </div>
                  <input
                    type="file"
                    ref={(ref) => (this.fileInput = ref)}
                    onChange={(e) => onAddFileChange(e)}
                    accept="video/mp4"
                    style={{ display: "none" }}
                    onClick={(e) => (e.target.value = null)}
                  />
                  <button
                    className="screening_protocol_comment_btn form-control"
                    onClick={() => this.fileInput.click()}
                    style={{ cursor: "pointer" }}
                  >
                    Upload Athlete Video{" "}
                    <i className="fa fa-upload" aria-hidden="true"></i>
                  </button>

                  {!state.uploadAddVideo && (
                    <div>
                      <img
                        src={no_video}
                        style={{ outline: 0, width: "100%", height: "auto" }}
                        alt="no_img"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
          <ModalFooter>
            <Tooltip arrow title="Add testing result">
              <button
                type="button"
                className="Model_btn pull-right"
                onClick={() => addTestResultTest()}
              >
                {state.addModalLoader !== false ? (
                  <i
                    className="fa fa-spinner fa-spin fa-3x fa-fw"
                    style={{
                      color: "#fff",
                      fontSize: "18px",
                    }}
                  />
                ) : (
                  "Add"
                )}
              </button>
            </Tooltip>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddResultModal;
