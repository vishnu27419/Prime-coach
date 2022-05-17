import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export class DeleteMedicalCriteriaModal extends Component {
  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          animation={true}
          centered
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="teamcreate">
                Delete Medical Criteria
              </h5>
              <button
                type="button"
                className="close "
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.onHide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="delete_modal_react">
              Are you sure you want to delete the criteria{" "}
              {this.props.selectPickerName} ? This change cannot be undone!
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="Model_btn_ok "
              data-dismiss="modal"
              onClick={this.props.handelDeleteMadicalStatus}
              style={
                this.props.deleteLoader
                  ? { padding: "5px 38px", cursor: "not-allowed" }
                  : { padding: "5px 38px", cursor: "pointer" }
              }
              disabled={this.props.deleteLoader}
            >
              OK{" "}
              {this.props.deleteLoader && (
                <i
                  className="fa fa-spinner fa-spin fa-3x fa-fw"
                  style={{
                    color: "#000",
                    fontSize: "15px",
                  }}
                />
              )}
            </button>
            <button
              type="button"
              className="Model_btn_Cancel "
              data-dismiss="modal"
              onClick={this.props.onHide}
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default DeleteMedicalCriteriaModal;
