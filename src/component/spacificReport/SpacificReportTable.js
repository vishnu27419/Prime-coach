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
import { Divider, IconButton } from "@material-ui/core";

import { Fragment } from "react";
import moment from "moment";
const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: "#2E84AF",
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

export default function SpacificReportTable({ reportWeekDayDetails }) {
  const classes = useStyles();
  console.log("asasdasdasdasd", reportWeekDayDetails);

  return (
    <div>
      <TableContainer component={Paper}>
        {reportWeekDayDetails?.map((item) => {
          return (
            <Table
              className={classes.table}
              aria-label="customized table"
              key={item.id}
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    align="center"
                    color="#fff"
                    colSpan={6}
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {`   Day ${
                      item?.day_number
                    } - Session completed on : ${moment(
                      reportWeekDayDetails?.updated_at
                    ).format("DD/MM/YYYY hh:mm a")}`}
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              <Fragment>
                <TableHead>
                  <TableRow>
                    <StyledTableCell
                      color="#fff"
                      style={{ borderRight: "1px solid #fff" }}
                    >
                      Exercise
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      color="#fff"
                      style={{ borderRight: "1px solid #fff" }}
                    >
                      Set Number
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      color="#fff"
                      style={{ borderRight: "1px solid #fff" }}
                    >
                      Reps Completed
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      color="#fff"
                      style={{ borderRight: "1px solid #fff" }}
                    >
                      Load Lifted
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                {item?.completed_exercises.map((data) => {
                  return (
                    <Fragment key={data.id}>
                      <TableBody>
                        <StyledTableRow>
                          <StyledTableCell component="th" scope="row">
                            {data?.exercise?.exercise}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {data?.annual_training_program_exercise_set_number}{" "}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {data?.annual_training_program_reps_completed}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {data.annual_training_program_load_completed}
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    </Fragment>
                  );
                })}
              </Fragment>
            </Table>
          );
        })}
      </TableContainer>
    </div>
  );
}
