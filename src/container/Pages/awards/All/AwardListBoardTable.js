import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import TableCell from "@material-ui/core/TableCell";

import TableRow from "@material-ui/core/TableRow";

import { Avatar, Button } from "@material-ui/core";
import moment from "moment";

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

export default function AwardListBoardTable({ allAssignAwards }) {
  const classes = useStyles();

  return (
    <div>
      {/* <div
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
      </div> */}

      <table className="table table-condensed coachList-table">
        <tr style={{ fontSize: "16px" }}>
          <th style={{ padding: "0.78rem 0.76rem" }}>Award Name </th>
          {/* <th style={{ padding: "0.78rem 0.76rem" }}>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Team Name{" "}
            </span>
          </th> */}
          <th style={{ padding: "0.78rem 0.76rem" }}>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Sports
            </span>
          </th>
          <th style={{ padding: "0.78rem 0.76rem" }}>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Assign To{" "}
            </span>
          </th>
          <th style={{ padding: "0.78rem 0.76rem" }}>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Assign Date{" "}
            </span>
          </th>
          <th style={{ padding: "0.78rem 0.76rem" }}>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Assignee
            </span>
          </th>
        </tr>

        {allAssignAwards?.map((item) => {
          return (
            <tr>
              <td style={{ padding: "0.78rem 0.76rem" }}>
                {" "}
                {item?.award?.name}
              </td>
              {/* <td
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
                  {item.team.team_name}
                </span>
              </td> */}
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
                  <img
                    src={item?.team?.sport?.sport_image}
                    alt="no_image"
                    style={{
                      height: "25px",
                      width: "25px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />

                  {item?.team?.sport?.sport_name}
                </span>
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
                  {item?.award?.award_type == "individual"
                    ? `${item?.player?.player_first_name} ${item?.player?.player_last_name} (Player)`
                    : `${item?.team?.team_name} (Team)`}
                </span>
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
                  {moment.unix(item.created_at).format("DD-MM-YYYY")}
                </span>
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
                  {`${item?.coach?.first_name} ${item?.coach?.last_name}`}
                </span>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
