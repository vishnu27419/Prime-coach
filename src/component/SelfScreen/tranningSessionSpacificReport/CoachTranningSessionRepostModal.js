import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class CoachTranningSessionRepostModal extends Component {
  render() {
    const { show, onHide } = this.props;
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
              <h5 className="modal-title" id="managerecipientsTitle">
                Training Session Specific Report
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
              <button
                type="button"
                className="Model_btn export_to_pdf_btn"
                title="Coming Soon!"
              >
                Export to PDF
              </button>
              {/* <div
                dangerouslySetInnerHTML={{
                  __html: trainingSessionReport,
                }}
              ></div> */}
              {/* <Pdf trainingSessionReport={trainingSessionReport} /> */}
              <div style={{ fontSize: "30px" }}>coming soon!</div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
export default CoachTranningSessionRepostModal;
