import React from "react";
import { Modal } from "react-bootstrap";

function StartWorkoutDaysModal(props) {
  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.onHide}
        animation={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="modal-header">
            <h5 className="modal-title" id="teamcreate">
              Day 1
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

          <div>
            <h2
              style={{
                color: "#555",
                fontSize: "38px",
                fontWeight: "100",
                lineHeight: "50px",
                margin: "5% 22%",
              }}
            >
              Workout Completed
              <i
                className="fa fa-check"
                aria-hidden="true"
                style={{ color: "green" }}
              ></i>
            </h2>
          </div>

          <div>
            <div style={{ marginLeft: "32%", marginBottom: "2%" }}>
              Please estimate the workout intensity
            </div>
            <ul className="d-flex justify-content-around">
              <li>low</li>
              <li>medium</li>
              <li>high</li>
            </ul>
            <div className="middle">
              <label>
                <input type="radio" name="radio" />
                <div className="front-end box">
                  <span>1</span>
                </div>
              </label>
              &nbsp;
              <label>
                <input type="radio" name="radio" />
                <div className="back-end box">
                  <span>2</span>
                </div>
              </label>
              &nbsp;
              <label>
                <input type="radio" name="radio" />
                <div className="back-end box">
                  <span>3</span>
                </div>
              </label>
              &nbsp;
              <label>
                <input type="radio" name="radio" />
                <div className="back-end box">
                  <span>4</span>
                </div>
              </label>
              &nbsp;
              <label>
                <input type="radio" name="radio" />
                <div className="back-end box">
                  <span>5</span>
                </div>
              </label>
              &nbsp;
              <label>
                <input type="radio" name="radio" />
                <div className="back-end box">
                  <span>6</span>
                </div>
              </label>
              &nbsp;
              <label>
                <input type="radio" name="radio" />
                <div className="back-end box">
                  <span>7</span>
                </div>
              </label>
              &nbsp;
              <label>
                <input type="radio" name="radio" />
                <div className="back-end box">
                  <span>8</span>
                </div>
              </label>
              &nbsp;
              <label>
                <input type="radio" name="radio" />
                <div className="back-end box">
                  <span>9</span>
                </div>
              </label>
              &nbsp;
              <label>
                <input type="radio" name="radio" />
                <div className="back-end box">
                  <span>10</span>
                </div>
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div
            className="modal-footer next_footer showhide text-right"
            id="show"
          >
            <button type="type" id="next_btn" className="btn btn-default">
              Next
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StartWorkoutDaysModal;
