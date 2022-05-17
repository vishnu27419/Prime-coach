import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import SpacificReportTable from "component/spacificReport/SpacificReportTable";
import { standardPostApi } from "container/API/ApiWrapper";
import NoDataFound from "component/lottiLoader/LottiLoader";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export class ViewSpacificReportModal extends Component {
  state = { reportDetails: {}, isLoading: false };

  componentDidMount() {
    this.trainingSessionSpecificReport();
  }

  trainingSessionSpecificReport = async () => {
    const playerId = this.props.playerId;
    this.setState({ isLoading: true });
    try {
      const res = await standardPostApi(
        "training_session_day_wise_report_v2",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),

          access_user_id: playerId,
        },
        true
      );

      if (res.status === 200) {
        console.log("response of training_session_specific_report", res.data);
        this.setState({ reportDetails: res?.data[0] });
      }
    } catch (error) {
      console.error("training_session_specific_report error", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  pdfGeneraterTable = async () => {
    const { reportDetails } = this.state;

    const doc = new jsPDF();

    reportDetails.week_days.map((data, index) => {
      doc.autoTable({
        theme: "grid",
        head: [
          [
            {
              content: `   Day ${
                data?.day_number
              } - Session completed on : ${moment(
                reportDetails.week_days?.updated_at
              ).format("DD/MM/YYYY hh:mm a")}`,
              colSpan: 4,
              styles: { halign: "center", fillColor: [22, 160, 133] },
            },
          ],
          ["Exercise", " Set Number", " Reps Completed", "Load Lifted"],
        ],
        body: data.completed_exercises.map((item) => [
          item?.exercise?.exercise,
          item?.annual_training_program_exercise_set_number,
          item?.annual_training_program_reps_completed,
          item.annual_training_program_load_completed,
        ]),
        margin: { top: 20, bottom: 20 },
      });
    });

    doc.text(`${reportDetails?.name}${" "}WORKOUT`, 10, 10);

    !reportDetails && doc.text(`No data available`, 10, 20);

    doc.save(`${reportDetails?.name}${" "}Athlete Workout Report.pdf`);
  };

  createCSV = async () => {
    // alert('This functionality is in under process.');
    this.setState({ downloadingPdf: true });

    const playerId = this.props.playerId;
    try {
      const res = await standardPostApi(
        "training_session_day_wise_report_v2",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          access_user_id: playerId,
        },
        true,
        false
      );
      console.log("resssssssss", res.data);

      console.log("Error ", JSON.stringify(res.data, null, 2));

      if (res.data.length > 0) {
        console.log("ress", res.data);
        let VALUES = [];
        res.data.map((x) => {
          VALUES.push([x?.name, "  ", " ", " "]);
          x.week_days.map((y) => {
            VALUES.push([
              `Day ${y?.day_number}`,
              "Session completed on:",
              `${moment(y?.updated_at).format("DD/MM/YYYY")}`,
              `${moment(y?.updated_at).format("hh:mm a")}`,
            ]);
            VALUES.push([
              "Exercise",
              "Set-Number",
              "Completed Load",
              "Completed Reps",
            ]);
            y.completed_exercises.map((z) => {
              VALUES.push([
                `${z?.exercise?.exercise}`,
                `${z?.annual_training_program_exercise_set_number}`,
                `${z?.annual_training_program_reps_completed}`,
                `${z?.annual_training_program_load_completed}`,
              ]);
            });
          });
        });

        const rowString = VALUES.map(
          (d) => `${d[0]},${d[1]},${d[2]},${d[3]}\n`
        ).join("");
        const csvString = `${rowString}`;
        let csvData = new Blob([csvString], { type: "text/csv" });
        let csvUrl = URL.createObjectURL(csvData);
        let hiddenElement = document.createElement("a");
        hiddenElement.href = csvUrl;
        hiddenElement.target = "_blank";
        hiddenElement.download = "Athlete Workout.csv";
        hiddenElement.click();
      }
    } catch (error) {
      this.setState({ downloadingPdf: false });
      console.log(error);
    }
  };

  render() {
    const { onHide, show } = this.props;
    const { reportDetails } = this.state;
    console.log("reportDetails", this.state.reportDetails);
    return (
      <div>
        <Modal
          show={show}
          onHide={onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="lg"
          //   contentClassName="videoModal"
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="teamcreate">
                Athlete Workout
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onHide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            {this.state.isLoading ? (
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
                    marginTop: "50px",
                  }}
                />
              </div>
            ) : (
              <>
                {!this.state.isLoading && !reportDetails ? (
                  <NoDataFound
                    height={250}
                    width={250}
                    text="No workout available yet."
                  />
                ) : (
                  <div>
                    <div style={{ marginTop: "20px" }}>
                      <button
                        type="button"
                        className="Model_btn"
                        style={{
                          backgroundColor: "#f0ad4e",
                          border: "1px solid #f0ad4e",

                          marginBottom: "20px",
                        }}
                        onClick={() => this.pdfGeneraterTable()}
                      >
                        Export to PDF
                      </button>

                      <button
                        type="button"
                        className="Model_btn"
                        style={{
                          backgroundColor: "#f0ad4e",
                          border: "1px solid #f0ad4e",
                          marginLeft: "20px",
                          marginBottom: "20px",
                        }}
                        onClick={() => this.createCSV()}
                      >
                        Export to CSV
                      </button>
                    </div>

                    <div>
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "#2E84AF",
                        }}
                      >
                        {reportDetails?.name}
                      </p>
                      <SpacificReportTable
                        reportWeekDayDetails={reportDetails?.week_days}
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            <div style={{ borderBottom: "1px solid #fff" }}></div>
          </Modal.Body>
          <ModalFooter
            style={{
              display: "flex",
              justifyContent: "center",
              borderTop: "none",
            }}
          >
            <div>
              <button type="button" className="Model_btn" onClick={onHide}>
                close
              </button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ViewSpacificReportModal;
