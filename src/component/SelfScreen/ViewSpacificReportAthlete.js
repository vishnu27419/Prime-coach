import NoDataFound from "component/lottiLoader/LottiLoader";
import { standardPostApi } from "container/API/ApiWrapper";
import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import SpacificReportTableAthlete from "./SpacificReportTableAthlete";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export class ViewSpacificReportAthlete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportWeekDayDetails: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.trainingSessionDayWiseReport();
  }

  trainingSessionDayWiseReport = async () => {
    const Atp = this.props.viewWorkoutModalArray;
    const daysId = this.props.spacificDaysId;
    this.setState({ isLoading: true });
    try {
      const res = await standardPostApi(
        // "training_session_day_wise_report",
        "training_session_day_wise_report_v3",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: Atp?.annual_training_program_id,
          annual_training_program_week_id: Atp?.id,
          annual_training_program_week_day_id: daysId,
          access_user_id: this.props.userId,
        },
        true
      );
      if (res.data.code === 200) {
        console.log("response of trainingSessionDayWiseReport", res.data.data);
        this.setState({ reportWeekDayDetails: res?.data?.data });
      }
    } catch (error) {
      console.log("error of trainingSessionDayWiseReport", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  pdfGeneraterTable = async () => {
    const { reportWeekDayDetails } = this.state;

    const doc = new jsPDF();

    doc.autoTable({
      theme: "grid",
      head: [
        [
          {
            content: this.props?.spacificDayDetails?.day_number,
            colSpan: 4,
            styles: { halign: "center", fillColor: [22, 160, 133] },
          },
        ],
        ["Exercise", " Set Number", " Reps Completed", "Load Lifted"],
      ],
      body: reportWeekDayDetails.map((item) => [
        item?.exercise_name,
        item?.set_number,
        item?.reps_completed,
        `${item.load_completed}kg`,
      ]),
      margin: { top: 20, bottom: 20 },
    });

    doc.text(
      `${this.props?.spacificDayDetails?.day_number}${" "}WORKOUT`,
      10,
      10
    );

    reportWeekDayDetails.length === 0 && doc.text(`No data available`, 10, 20);

    doc.save(
      `${this.props?.spacificDayDetails?.day_number}${" "} Workout Report.pdf`
    );
  };

  createCSV = async () => {
    const Atp = this.props.viewWorkoutModalArray;
    const daysId = this.props.spacificDaysId;
    try {
      const res = await standardPostApi(
        // "training_session_day_wise_report",
        "training_session_day_wise_report_v3",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: Atp?.annual_training_program_id,
          annual_training_program_week_id: Atp?.id,
          annual_training_program_week_day_id: daysId,
          access_user_id: this.props.userId,
        },
        true,
        false
      );
      if (res.data.code === 301) {
        this.setState({
          downloadingPdf: false,
        });
        console.log("Error ", JSON.stringify(res.data, null, 2));
      }
      if (res.data.code === 200) {
        let VALUES = [];
        res.data.data.map((item) => {
          VALUES.push([
            item.exercise_name,
            item.set_number,
            item.load_completed,
            `${item.load_completed}kg`,
          ]);
        });
        let header_string =
          "Exercise,Set-Number,Completed Load,Completed Reps\n";
        const rowString = VALUES.map(
          (d) => `${d[0]},${d[1]},${d[2]},${d[3]}\n`
        ).join("");
        const csvString = `${header_string}${rowString}`;
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
    const { show, onHide } = this.props;

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
                Workout Report
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
                {!this.state.isLoading &&
                this.state.reportWeekDayDetails.length === 0 ? (
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
                        {/* {reportDetails?.name} */}
                      </p>
                      {/* <SpacificReportTable
                        reportWeekDayDetails={reportDetails?.week_days}
                      /> */}

                      <SpacificReportTableAthlete
                        spacificDayDetails={this.props.spacificDayDetails}
                        reportWeekDayDetails={this.state.reportWeekDayDetails}
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

export default ViewSpacificReportAthlete;
