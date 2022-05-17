import React from "react";
import { Modal } from "react-bootstrap";

function DeleteWorkoutModal(props) {
  return (
    <Modal show={props.show} onHide={props.onHide} animation={true}>
      <Modal.Body>
        <div className="modal-header">
          <h5 className="modal-title" id="teamcreate">
            Delete Period workout
          </h5>
          <button
            type="button"
            className="close "
            data-dismiss="modal"
            aria-label="Close"
            onClick={props.onHide}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="delete_modal_react">
          Are you sure you want to delete this period workout, this change
          cannot be undone?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="Model_btn_ok "
          data-dismiss="modal"
          onClick={props.delete_annual_training_program_workout}
        >
          OK
        </button>
        <button
          type="button"
          className="Model_btn_Cancel "
          data-dismiss="modal"
          onClick={props.onHide}
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteWorkoutModal;
