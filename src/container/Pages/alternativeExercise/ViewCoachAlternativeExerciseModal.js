import { Tooltip } from "@material-ui/core";
import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";

export class ViewCoachAlternativeExerciseModal extends Component {
  render() {
    const { show, onHide, parentState } = this.props;
    return (
      <div>
        <Modal show={show} onHide={onHide} centered size="lg">
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="protocol">
                View Alternative Exercise
              </h5>
              <Tooltip arrow title="close">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={onHide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </Tooltip>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Exercise Group Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={
                    parentState?.exerciseObj?.exercise_group?.exercise_group
                  }
                  readOnly
                  style={{ cursor: "not-allowed" }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Exercise Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={parentState?.exerciseObj?.exercise}
                  readOnly
                  style={{ cursor: "not-allowed" }}
                />
              </div>

              {parentState?.exerciseObj?.video && (
                <div>
                  <label htmlFor="" style={{ fontWeight: "bold" }}>
                    Exercise Video
                  </label>
                  <iframe
                    width="100%"
                    height="315"
                    src={parentState?.exerciseObj?.video}
                    title=" video"
                    frameborder="0"
                    //   allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </Modal.Body>
          <ModalFooter style={{ display: "flex", justifyContent: "center" }}>
            <Tooltip arrow title="close">
              <button type="button" className="Model_btn " onClick={onHide}>
                Close
              </button>
            </Tooltip>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ViewCoachAlternativeExerciseModal;
