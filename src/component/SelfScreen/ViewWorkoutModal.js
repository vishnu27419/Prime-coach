import React from "react";
import { Modal } from "react-bootstrap";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

class ViewWeekModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      annualTrainingProgram: this.props.annualTrainingProgram,
      exportToPdf: "",
      imputHead: [["Exercise", "Reps", "Sets", "Rest"]],
    };
  }

  pdfGeneraterTable = async () => {
    // const weekId = this.props.viewWorkoutModalArray;

    // const days = weekId.days.find((data) => data);
    const days = this.props.viewWorkoutData;
    // console.log("THIS IS DAYSSSSS", days);

    const doc = new jsPDF();

    days.groups.map((data, index) => {
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

    doc.text(`${days.day_number}${" "}Workout`, 10, 10);

    days.groups?.length === 0 && doc.text(`No data available`, 10, 20);

    doc.save(`${days.day_number}${" "}Workout.pdf`);
  };

  render() {
    // console.log(
    //   "This is View Workout through Props ---->",
    //   this.props.viewWorkoutData
    // );
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
                {/* Day 1 */}
                {this.props.viewWorkoutData.day_number}
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
              <button
                type="button"
                className="Model_btn"
                style={{
                  backgroundColor: "#f0ad4e",
                  border: "1px solid #f0ad4e",
                }}
                onClick={() => this.pdfGeneraterTable()}
              >
                Export to PDF
              </button>

              <div>
                {this.props.viewWorkoutData?.groups?.map((item) => {
                  return (
                    <div key={item.id}>
                      <div
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "larger",
                        }}
                      >
                        {item.group_name} - {item.group_set_type} -{" "}
                        {item.group_rest && "REST " + item.group_rest + " secs"}
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
                          {item.workout_group_exercise.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td>{item.workout_exercise_name}</td>
                                <td>
                                  {item.workout_reps}{" "}
                                  {item.workout_repetition_type}{" "}
                                  {item.workout_reps_each_side === "1"
                                    ? "ES"
                                    : " "}
                                  {/* ES */}
                                </td>
                                <td>{item.workout_sets}</td>
                                <td>{item.workout_rest}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ViewWeekModal;
