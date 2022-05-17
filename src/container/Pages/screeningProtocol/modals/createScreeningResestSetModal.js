import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class CreateScreeningResestSetModal extends Component {
  render() {
    const {
      show,
      onHide,
      screeningProtocolValue,
      createUpdateScreeningProtocolResultset,
    } = this.props;
    return (
      <div>
        <Modal show={show} onHide={onHide} animation={true} centered>
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="teamcreate">
                Create New Screening Results Page
              </h5>
              <button
                type="button"
                className="close "
                data-dismiss="modal"
                aria-label="Close"
                onClick={onHide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="delete_modal_react">
              Are you sure you want to add new screening results page?
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="Model_btn_ok "
              data-dismiss="modal"
              onClick={() =>
                createUpdateScreeningProtocolResultset(
                  screeningProtocolValue,
                  "message"
                )
              }
            >
              Yes
            </button>
            <button
              type="button"
              className="Model_btn_Cancel "
              data-dismiss="modal"
              onClick={onHide}
            >
              No
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CreateScreeningResestSetModal;
