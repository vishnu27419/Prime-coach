import NoDataFound from "component/lottiLoader/LottiLoader";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ViewAthleteWorkoutTable from "./ViewAthleteWorkoutTable";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export class ViewAthleteWorkoutModal extends Component {
  state = { visiblePdfAndCsvButton: false };

  pdfGeneraterTable = async (workoutDetails) => {
    // const weekId = this.props.viewWorkoutModalArray;

    const groups = workoutDetails.find((data) => data);
    // const days = this.props.viewWorkoutData;
    // console.log("THIS IS DAYSSSSS", days);

    const doc = new jsPDF();

    console.log("groups", groups);

    groups.workout_group.map((data, index) => {
      doc.autoTable({
        theme: "grid",
        head: [
          [
            {
              content: ` ${data.group_name} - ${data.group_set_type} -${" "}${
                data.group_rest && "REST " + data.group_rest + " secs"
              }`,
              colSpan: 4,
              styles: { halign: "center", fillColor: [22, 160, 133] },
            },
          ],
          ["Exercise", "Reps", "Sets", "Rest"],
        ],
        body: data.workout_group_exercise.map((item) => [
          item.workout_exercise_name,
          `${item.workout_reps} ${item.workout_repetition_type} ${
            item.workout_reps_each_side === "1" ? "ES " : " "
          }`,
          item.workout_sets,
          item.workout_rest,
        ]),
        margin: { top: 20, bottom: 20 },
      });
    });
    doc.text(`WORKOUT`, 10, 10);
    doc.save(`Workout.pdf`);
    // doc.text(`${days.day_number}${" "}Workout`, 10, 10);

    // days.groups?.length === 0 && doc.text(`No data available`, 10, 20);

    // doc.save(`${days.day_number}${" "}Workout.pdf`);
  };

  exportCSV = async (mainData, day) => {
    console.log("mainData", mainData);

    this.setState({ downloadingCSV: true });

    let VALUES = [];

    const DAY_DETAILS = day;

    mainData[0].workout_group.map((item) => {
      VALUES.push(["", item.group_name, item.group_set_type, ""]);
      item.workout_group_exercise.map((exer) => {
        VALUES.push([
          exer.workout_exercise_name,
          exer.workout_sets,
          `${exer.workout_reps} ${exer.workout_repetition_type}`,
          exer.workout_rest,
        ]);
      });
    });

    let header_string = "Exercise,Sets,Reps,Rest\n";
    const rowString = VALUES.map(
      (d) => `${d[0]},${d[1]},${d[2]},${d[3]}\n`
    ).join("");
    const csvString = `${header_string}${rowString}`;
    let csvData = new Blob([csvString], { type: "text/csv" });
    let csvUrl = URL.createObjectURL(csvData);
    let hiddenElement = document.createElement("a");
    hiddenElement.href = csvUrl;
    hiddenElement.target = "_blank";
    hiddenElement.download = "workout.csv";
    hiddenElement.click();
  };
  render() {
    const {
      workoutDetails,
      viewWorkoutLoader,
      startWorkoutClickEvent,
      switchStartWorkout,
    } = this.props;

    // console.log("workoutDetails----on Build", workoutDetails);
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

            {viewWorkoutLoader ? (
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
                  style={{
                    color: "var(--appBlue2)",
                    fontSize: "40px",
                    marginTop: "50px",
                  }}
                />
              </div>
            ) : (
              <div className="modal-body text-left">
                <div>
                  <>
                    {startWorkoutClickEvent === "startWorkout" ? (
                      <>
                        <button
                          type="button"
                          className="Model_btn"
                          style={{
                            backgroundColor: "#f0ad4e",
                            border: "1px solid #f0ad4e",

                            marginBottom: "20px",
                          }}
                          onClick={() => switchStartWorkout()}
                        >
                          Start Workout
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="Model_btn"
                          style={{
                            backgroundColor: "#f0ad4e",
                            border: "1px solid #f0ad4e",

                            marginBottom: "20px",
                          }}
                          onClick={() => this.pdfGeneraterTable(workoutDetails)}
                        >
                          Export to PDF
                        </button>
                        <button
                          type="button"
                          className="Model_btn"
                          style={{
                            backgroundColor: "#f0ad4e",
                            border: "1px solid #f0ad4e",
                            marginBottom: "20px",
                            marginLeft: "20px",
                          }}
                          onClick={() =>
                            this.exportCSV(
                              workoutDetails,
                              this.props.selectedWorkout
                            )
                          }
                        >
                          Export to CSV
                        </button>
                      </>
                    )}
                  </>
                  {!viewWorkoutLoader && workoutDetails.length === 0 ? (
                    <NoDataFound
                      height={250}
                      width={250}
                      text="No Workout available yet"
                    />
                  ) : (
                    <div>
                      <ViewAthleteWorkoutTable
                        workoutDetails={workoutDetails}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ViewAthleteWorkoutModal;
