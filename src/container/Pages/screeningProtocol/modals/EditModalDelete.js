import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export class EditModalDelete extends Component {
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
                Delete Protocol Test
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
              Are you sure you want to delete the test ? This change can be
              reflect after click on edit button.
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="Model_btn_ok "
              data-dismiss="modal"
              onClick={() =>
                this.props.editModalDeleteEvent(this.props.deleteEditIndex)
              }
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

export default EditModalDelete;
