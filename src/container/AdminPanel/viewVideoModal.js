import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export class ViewVideoModal extends Component {
  render() {
    const { state } = this.props;
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="lg"
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="videopopupTitle">
                {/* Back to wall shoulder */}
                {state?.viewName}
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
                  src={state?.viewVideoData}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ViewVideoModal;
