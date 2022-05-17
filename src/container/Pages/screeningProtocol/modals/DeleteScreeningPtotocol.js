import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export class DeleteScreeningPtotocol extends Component {
  render() {
    const { state } = this.props;
    return (
      <div>
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
                  Delete Screening Protocol
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
                Are you sure you want to delete the protocol{" "}
                {state.screenHeadPreName} ? This change cannot be undone!
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="Model_btn_ok "
                data-dismiss="modal"
                onClick={this.props.deleteScreeningProtocolApi}
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
      </div>
    );
  }
}

export default DeleteScreeningPtotocol;
