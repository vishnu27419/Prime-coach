import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
import ShareIcon from "@material-ui/icons/Share";
import { Button, Divider, IconButton } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import CreateAwardsModal from "./CreateAwardsModal";

import { Fragment } from "react";
import NoDataFound from "component/lottiLoader/LottiLoader";
import UpdateAwardModal from "./UpdateAwardModal";

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: "#2F84CA",
    color: "#fff",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CreateAwairdsTable({
  workoutDetails,
  listAward,
  toggleModal,
  parentState,
  toggleAssignTo,
  onChange,
  handelCreateAward,
  toggleUpdateAwardModal,
  updateChange,
  toggleUpdateAssignTo,
  handelUpdateAwards,
}) {
  const classes = useStyles();

  console.log("listAward", listAward);
  return (
    <div>
      {/* {parentState.isLoading ? (
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
            }}
          />
        </div>
      ) : (
        <>
          {!parentState.isLoading && listAward === 0 ? (
            <NoDataFound
              height={250}
              width={250}
              text="No award available yet."
            />
          ) : ( */}

      {parentState.isLoading ? (
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
            }}
          />
        </div>
      ) : (
        <table className="table table-condensed coachList-table">
          <tr style={{ fontSize: "16px" }}>
            <th style={{ padding: "0.78rem 0.76rem" }}> Award Name</th>
            <th style={{ padding: "0.78rem 0.76rem" }}>Awarded time(s)</th>
            <th style={{ padding: "0.78rem 0.76rem" }}></th>
          </tr>
          {listAward.length !== 0 &&
            listAward.map((item) => {
              return (
                <tr>
                  <td style={{ padding: "0.78rem 0.76rem" }}>{item?.name}</td>
                  <td
                    style={{
                      padding: "0.78rem 0.76rem",
                      paddingLeft: "5rem",
                    }}
                  >
                    {item.award_assigned_count}
                  </td>

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
                          marginLeft: "20px",
                          backgroundColor: "#2F84CA",
                        }}
                        onClick={() => toggleUpdateAwardModal(item)}
                      >
                        update
                      </Button>

                      <UpdateAwardModal
                        onHide={toggleUpdateAwardModal}
                        show={
                          parentState.updateModalId === item.id &&
                          parentState.updateModal
                        }
                        parentState={parentState}
                        toggleUpdateAssignTo={toggleUpdateAssignTo}
                        updateChange={updateChange}
                        handelUpdateAwards={handelUpdateAwards}
                      />

                      {/* <Button
                            variant="contained"
                            color="secondary"
                            style={{
                              marginLeft: "20px",
                              backgroundColor: "#D9535F",
                            }}
                          >
                            Delete
                          </Button> */}
                    </span>
                  </td>
                </tr>
              );
            })}
        </table>
      )}
      {/* )} */}
      {!parentState.isLoading && listAward == 0 && (
        <NoDataFound height={250} width={250} text="No award available yet." />
      )}
      <CreateAwardsModal
        onHide={toggleModal}
        show={parentState.viewModal}
        assignTo={parentState.assignTo}
        toggleAssignTo={toggleAssignTo}
        onChange={(e) => onChange(e)}
        awardName={parentState.awardName}
        parentState={parentState}
        handelCreateAward={handelCreateAward}
        updateChange={updateChange}
      />
    </div>
  );
}
