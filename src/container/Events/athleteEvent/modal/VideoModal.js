import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "./videoModal.css";

export class VideoModal extends Component {
  render() {
    const { videoModalDetails } = this.props;
    // console.log("videoModalDetails", videoModalDetails);
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="lg"
          contentClassName="videoModal"
        >
          <Modal.Body>
            <div className="modal-header">
              <h5
                className="modal-title"
                id="videopopupTitle"
                style={{ color: "#fff" }}
              >
                {videoModalDetails?.workout_exercise_name}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.onHide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                <iframe
                  // onLoad={() => setLoading(false)}
                  // placeholder="abcccc"
                  width="100%"
                  title="video"
                  height="345"
                  src={this.props?.videoModalDetails?.workout_exercise_video}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
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
              onClick={() => this.props.onHide()}
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

export default VideoModal;
