import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export class DeleteAlternativeExercise extends Component {
  render() {
    const { show, onHide, deleteAlternativeExercise, isDeleteLoading } =
      this.props;
    return (
      <div>
        <Modal show={show} onHide={onHide} animation={true} centered>
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="teamcreate">
                Delete Exercise
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
              Are you sure you want to delete this exercise, this change cannot
              be undone?
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
              onClick={deleteAlternativeExercise}
              style={{ padding: "5px 46px" }}
              disabled={isDeleteLoading}
            >
              OK {isDeleteLoading && <i className="fa fa-spinner fa-pulse" />}
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default DeleteAlternativeExercise;
