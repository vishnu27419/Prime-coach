import NoDataFound from "component/lottiLoader/LottiLoader";
import React from "react";
import { Modal } from "react-bootstrap";

class SupersetExerciseModal extends React.Component {
  render() {
    console.log("this.props.exerciseGroupId", this.props.exerciseGroupId);
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Body>
          <div className="modal-header">
            <h5 className="modal-title" id="teamcreate">
              Update Exercise
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

          <div className="form-group " style={{ padding: "10px 15px" }}>
            <label
              htmlFor=""
              style={{
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              Exercise Group
            </label>
            <select
              className="form-control"
              onChange={this.props.onHandelChange}
              value={this.props.exerciseGroupId}
            >
              <option value="">Select Exercise Group</option>
              {this.props.preWorkoutGroupExercise &&
                this.props.preWorkoutGroupExercise.map((data) => {
                  return (
                    <option value={data.value} key={data.id}>
                      {data.label}
                    </option>
                  );
                })}
            </select>
          </div>
          {this.props.exerciseGroupId?.length !== 0 ? (
            <>
              {!this.props.displayExerciseLoader &&
                this.props.exerciseGroupName?.length === 0 && (
                  <NoDataFound
                    height={250}
                    width={250}
                    text="No exercise available yet."
                  />
                )}
            </>
          ) : this.props.exerciseGroupId?.length === undefined ? null : null}

          {this.props.displayExerciseLoader ? (
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
                  fontSize: "50px",
                }}
              />
            </div>
          ) : (
            <div style={{ padding: "10px 15px" }}>
              <table className="table table-condensed table-bordered">
                {this.props.exerciseGroupName?.length !== 0 &&
                  this.props.exerciseGroupId?.length !== 0 && (
                    <thead>
                      <tr>
                        <th>Exercise Name</th>
                        <th></th>
                      </tr>
                    </thead>
                  )}
                <tbody style={{ color: "black" }}>
                  {this.props.exerciseGroupName &&
                    this.props.exerciseGroupName.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>
                            {/* {item.exercise} */}
                            <p style={{ marginBottom: "0px" }}>
                              {" "}
                              {item?.exercise}
                            </p>
                            <p
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                                marginBottom: "0px",
                              }}
                            >
                              {item?.type === "coach" ? "(Coach)" : null}
                            </p>
                          </td>
                          <td>
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <button
                                title="Select Active Knee extension "
                                data-id="417"
                                // className="btn-success  col-md-3 workout-builder-workout-select-exercise"
                                className="btn week_btn"
                                // style={{ paddingRight: "0px" }}
                                onClick={() =>
                                  this.props.SelectExercisePicker(item)
                                }
                              >
                                <i className="fa fa-check"></i>
                              </button>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }
}

export default SupersetExerciseModal;
