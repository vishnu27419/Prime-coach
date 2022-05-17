import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Pdf from "../../exportPdf/PDF";

class AthleteTranningSessionRepostModal extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  pdfGenerater = async () => {
    const { trainingSessionReport } = this.props;

    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      floatPrecision: 16,
    });

    doc.html(
      trainingSessionReport,

      {
        html2canvas: {
          scale: 0.45,
        },

        callback: function (doc) {
          doc.save("Training Session Specific Report.pdf");
        },
        x: 10,
        y: 0,
      }
    );
  };

  render() {
    const { show, onHide, trainingSessionReport } = this.props;
    // console.log(trainingSessionReport);
    return (
      <div>
        <Modal
          show={show}
          onHide={onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="lg"
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="managerecipientsTitle">
                Training Session Specific Report
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
            <div className="modal-body">
              <button
                type="button"
                className="Model_btn export_to_pdf_btn"
                onClick={this.pdfGenerater}
              >
                Export to PDF
              </button>

              <div
                dangerouslySetInnerHTML={{
                  __html: trainingSessionReport,
                }}
              ></div>
              {/* <Pdf trainingSessionReport={trainingSessionReport} /> */}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AthleteTranningSessionRepostModal;
