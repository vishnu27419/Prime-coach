import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export class DeleteCoachEventModal extends Component {
  render() {
    const { show, onHide } = this.props;
    return (
      <div>
        <Modal show={show} onHide={onHide} animation={true} centered>
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="teamcreate">
                Delete Event
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
              Are you sure you want to delete this event, this change cannot be
              undone?
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="Model_btn_Cancel "
              data-dismiss="modal"
              onClick={onHide}
            >
              Cancel
            </button>

            <button
              type="button"
              className="Model_btn_ok "
              data-dismiss="modal"
              //   onClick={() =>
              //     props.delete_annual_training_program_week_days(
              //       props.indexOfDeleteIcon
              //     )
              //   }
            >
              OK
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default DeleteCoachEventModal;
