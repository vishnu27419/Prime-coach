import React from "react";
import { Modal } from "react-bootstrap";

const DeleteTestingProtocolModal = (props) => {
  return (
    <div>
      <div>
        <Modal
          show={props.show}
          onHide={props.onHide}
          animation={true}
          centered
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
                onClick={props.onHide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="delete_modal_react">
              Are you sure you want to delete the protocol "
              {props.testingProtocolName} "? This change cannot be undone!
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="Model_btn_ok "
              data-dismiss="modal"
              onClick={props.deleteTestingProtocol}
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
      </div>
    </div>
  );
};

export default DeleteTestingProtocolModal;
