import { Button } from "@material-ui/core";
import React, { Component } from "react";
import AddResultSetModal from "./AddResultSetModal";
import EditIcon from "@material-ui/icons/Edit";
import ViewPlayerResultSet from "./ViewPlayerResultSet";

export class ResultTable extends Component {
  render() {
    const {
      selectPickerObject,
      togglerResultSetModal,
      parentState,
      homeTeamObj,
      awayTeamObj,
      onChange,
      handelCrateStatisticResult,
      statisticResultArray,
      onSelectChange,
      closeReseltSetModal,
      toggleViewPlayerModal,
      playerResultList,
    } = this.props;
    return (
      <div>
        <table className="table table-condensed coachList-table">
          <tr style={{ fontSize: "16px" }}>
            <th style={{ padding: "0.78rem 0.76rem" }}> Criteria</th>
            <th style={{ padding: "0.78rem 0.76rem" }}>
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Home Team{" "}
                {homeTeamObj?.team_name && `(${homeTeamObj?.team_name})`}
              </span>
            </th>
            <th style={{ padding: "0.78rem 0.76rem" }}>
              {" "}
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Away Team {awayTeamObj?.name && `(${awayTeamObj?.name})`}
              </span>{" "}
            </th>
            <th style={{ padding: "0.78rem 0.76rem" }}>
              {" "}
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></span>{" "}
            </th>
          </tr>
          {statisticResultArray?.length !== 0 &&
            statisticResultArray?.map((item) => {
              return (
                <tr key={item?.id}>
                  <td
                    style={{
                      padding: "0.78rem 0.76rem",
                    }}
                  >
                    {item?.criteria?.name}
                  </td>
                  <td
                    style={{
                      padding: "0.78rem 0.76rem",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span>{item?.criteria?.home_team?.result}</span>
                    </span>
                  </td>{" "}
                  <td
                    style={{
                      padding: "0.78rem 0.76rem",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span> {item?.criteria?.away_team?.result} </span>
                    </span>
                  </td>{" "}
                  <td
                    style={{
                      padding: "0.78rem 0.76rem",

                      width: "314px",
                    }}
                  >
                    <span style={{ justifyContent: "center", display: "flex" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          marginRight: "3%",
                          color: "#fff",
                          backgroundColor: "#338AB7",
                        }}
                        onClick={() => togglerResultSetModal(item)}
                      >
                        <EditIcon />
                      </Button>
                    </span>
                  </td>
                </tr>
              );
            })}
        </table>

        <AddResultSetModal
          onHide={closeReseltSetModal}
          show={parentState.resultSetModal}
          homeTeamObj={homeTeamObj}
          awayTeamObj={awayTeamObj}
          parentState={parentState}
          onChange={onChange}
          handelCrateStatisticResult={handelCrateStatisticResult}
          onSelectChange={onSelectChange}
          playerListObj={this.props.playerListObj}
        />

        <ViewPlayerResultSet
          show={parentState?.viewPlayerModal}
          onHide={toggleViewPlayerModal}
          playerResultList={playerResultList}
          statisticResultArray={statisticResultArray}
        />
      </div>
    );
  }
}

export default ResultTable;
