import React from "react";
import { Modal } from "react-bootstrap";

class DeleteTestingProtocolModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          animation={true}
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="teamcreate">
                Delete Testing Protocol
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
              Are you sure you want to delete the protocol "
              {this.props.testingProtocol}"? This change cannot be undone!
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="Model_btn_ok "
              data-dismiss="modal"
              onClick={this.props.deleteTestingProtocol}
            >
              OK
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

export default DeleteTestingProtocolModal;
