import React from "react";
import { Modal } from "react-bootstrap";

function ManageRecipientsModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="modal-header">
          <h5 className="modal-title" id="managerecipientsTitle">
            Report Email Recipients
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={props.onHide}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <table className="table">
            <thead>
              <tr>
                <th colSpan="2">Email Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>vibha@pairroxz.com</td>
                <td>
                  <a href="#" className="btn btn-danger">
                    Delete -
                  </a>
                </td>
              </tr>

              <tr>
                <td>
                  <input type="text" className="form-control" />
                </td>
                <td>
                  <a href="#" className="btn btn-success">
                    Add New +
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ManageRecipientsModal;
