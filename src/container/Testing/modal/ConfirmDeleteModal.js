import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export class ConfirmDeleteModal extends Component {
  render() {
    const { deleteExerciseEvent } = this.props;
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        animation={true}
        centered
      >
        <Modal.Body>
          <div className="modal-header">
            <h5 className="modal-title" id="teamcreate">
              Delete Protocol Exercise
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
            Are you sure you want to delete this exercise ? this change cannot
            be undone.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="Model_btn_Cancel "
            data-dismiss="modal"
            onClick={this.props.onHide}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="Model_btn_ok "
            data-dismiss="modal"
            ref={(node) => (this.btn = node)}
            onClick={() => deleteExerciseEvent(this.props.deleteExeIndex)}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmDeleteModal;
