import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { Fragment } from "react";
import { Modal } from "react-bootstrap";

export class ViewPlayerResultSet extends Component {
  render() {
    const { playerResultList, statisticResultArray } = this.props;
    console.log("playerResultList", playerResultList);
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={() => false}
          animation={true}
          centered
          size="lg"
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="teamcreate">
                View Player Result For {playerResultList?.name}
              </h5>
              <button
                type="button"
                className="close "
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.props.onHide()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="form-group"
              style={{ border: "none", padding: "10px 20px 0px" }}
            >
              <table className="table table-condensed coachList-table">
                <tr style={{ fontSize: "16px" }}>
                  <th style={{ padding: "0.78rem 0.76rem" }}> Player Name</th>
                  {statisticResultArray?.map((item) => {
                    return (
                      <th style={{ padding: "0.78rem 0.76rem" }} key={item.id}>
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {item?.criteria?.name}
                        </span>
                      </th>
                    );
                  })}
                </tr>
                {playerResultList?.players?.map((item) => {
                  return (
                    <tr key={item?.id}>
                      <td
                        style={{
                          padding: "0.78rem 0.76rem",
                        }}
                      >
                        {item?.user_first_name} {item?.user_last_name}
                      </td>

                      {item?.criteria.map((data) => {
                        return (
                          <td
                            style={{
                              padding: "0.78rem 0.76rem",
                            }}
                            key={item.id}
                          >
                            <span
                              style={{
                                color: "#2f84ca",
                                fontSize: "17px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {data?.player_result?.player_value ?? "-"}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              className="Model_btn"
              onClick={() => this.props.onHide()}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ViewPlayerResultSet;
