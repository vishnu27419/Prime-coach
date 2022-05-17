import NoDataFound from "component/lottiLoader/LottiLoader";
import React from "react";
import { Modal } from "react-bootstrap";

function UpdateWorkoutGroupExerciseModal(props) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
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
            onClick={props.onHide}
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
            value={props.exerciseGroupId}
            onChange={props.onHandelChange}
          >
            <option value="">Select Exercise Group</option>
            {props.preWorkoutGroupExercise &&
              props.preWorkoutGroupExercise.map((data) => {
                return (
                  <option value={data.value} key={data.id}>
                    {data.label}
                  </option>
                );
              })}
          </select>
        </div>
        {props.exerciseGroupId?.length !== 0 ? (
          <>
            {!props.displayExerciseLoader &&
              props.exerciseGroupName?.length === 0 && (
                <NoDataFound
                  height={250}
                  width={250}
                  text="No exercise available yet."
                />
              )}
          </>
        ) : props.exerciseGroupId?.length === undefined ? null : null}

        {props.displayExerciseLoader ? (
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
              {props.exerciseGroupName?.length !== 0 &&
                props.exerciseGroupId?.length !== 0 && (
                  <thead>
                    <tr>
                      <th>Exercise Name</th>
                      <th></th>
                    </tr>
                  </thead>
                )}
              <tbody style={{ color: "black" }}>
                {props.exerciseGroupName &&
                  props.exerciseGroupName.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>
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
                                props.updateSelectExercisePicker(item)
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

export default UpdateWorkoutGroupExerciseModal;
