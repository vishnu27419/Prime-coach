import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import "./ViewResult.css";

export class ViewResultModal extends Component {
  render() {
    const { show, onHide, state } = this.props;

    const exercise = state.viewModalDetails;

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
                {/* View Testing Result */}
                {state.viewModalExerciseName}
              </h3>
              <button type="button" className="close" onClick={onHide}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* <div className="addResult_heading">
                {state.viewModalExerciseName}
              </div> */}
              {exercise?.user_video && (
                <div>
                  <div>
                    <video width="100%" height="350" controls>
                      <source src={exercise?.user_video} type="video/mp4" />
                    </video>
                  </div>
                </div>
              )}
              {/* <div>
                <button
                  className="screening_protocol_comment_btn form-control"
                  onClick={() => alert("Coming Soon !!")}
                >
                  Upload New Viedo{" "}
                  <i className="fa fa-upload" aria-hidden="true"></i>
                </button>
              </div> */}

              {exercise?.user_comment && (
                <div className="form-group">
                  {/* <label className="addResult_label">Comments :</label> */}

                  <div>
                    <div class="card">
                      <div class="container">
                        <p style={{ color: "#3b4044" }}>
                          {exercise.user_comment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Modal.Body>
          {/* <ModalFooter>
            <button type="button" className="Model_btn pull-right">
              Update
            </button>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

export default ViewResultModal;
