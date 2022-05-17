import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export class ViewTeamPlayerWorkout extends Component {
  render() {
    const { viewWorrkoutList } = this.props;
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="view-workoutTitle">
                View Workout{" "}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.onHide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-left">
              {/* <button
                type="button"
                className="Model_btn"
                style={{
                  backgroundColor: "#f0ad4e",
                  border: "1px solid #f0ad4e",
                }}
                onClick={() => this.pdfGeneraterTable()}
              >
                Export to PDF
              </button> */}

              {!viewWorrkoutList && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <i
                    className="fa fa-spinner fa-spin fa-3x fa-fw"
                    // className="fa fa-spinner fa-pulse fa-3x fa-fw"
                    style={{
                      color: "var(--appBlue2)",
                      fontSize: "40px",

                      // marginTop: "50px",
                    }}
                  />
                </div>
              )}

              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: viewWorrkoutList,
                  }}
                ></div>
                {/* <div>
                  <div
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "larger",
                    }}
                  >
                    group_name item.group_set_type - group_rest "REST " +
                    item.group_rest + " secs"
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Exercise</th>
                        <th>Reps</th>
                        <th>Sets</th>
                        <th>Rest</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>workout_exercise_name</td>
                        <td>
                          workout_reps workout_repetition_type
                          workout_reps_each_side
                        </td>
                        <td>sets</td>
                        <td>Rest</td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ViewTeamPlayerWorkout;
