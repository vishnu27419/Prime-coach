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
import VideoModal from "./VideoModal";
import viewAthleteEvent from "../ViewAthleteEvent";
import AlternativeExerciseModal from "./AlternativeExerciseModal";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { Fragment } from "react";
import { standardPostApi } from "container/API/ApiWrapper";
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

export default function ViewAthleteWorkoutTable({ workoutDetails }) {
  const classes = useStyles();
  const [viewVideoModal, setViewVideoModal] = useState(false);
  const [videoModalDetails, setVideoModalDetails] = useState("");
  const [viewAlternativeExercise, setViewAlternativeExercise] = useState(false);
  const [alternativeExerciseDetails, setAlternativeExerciseDetails] = useState(
    []
  );
  const [loaderAthleteWorkout, setLoaderWorkout] = useState(false);
  // const [exerciseId, setExerciseId] = useState("");

  const toggleVideoModal = (data) => {
    setViewVideoModal(!viewVideoModal);
    setVideoModalDetails(data);
  };

  const toggleAlternativeExercise = (row) => {
    // setExerciseId(row?.workout_exercise);
    setViewAlternativeExercise(!viewAlternativeExercise);
    ListAthleteWorkout(row?.workout_exercise);
  };

  const closeAlternativeExercise = () => {
    setViewAlternativeExercise(false);
  };
  const ListAthleteWorkout = async (ExerciseId) => {
    setLoaderWorkout(true);
    try {
      const res = await standardPostApi(
        "exercise/get_alternate_exercises",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          exercise_id: ExerciseId,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log(
        //   "Response of List Athlete Workout",
        //   res?.data?.data?.alternate_exercises
        // );
        // this.setState({
        //   alternativeExerciseDetails: res?.data?.data?.alternate_exercises,
        // });

        setAlternativeExerciseDetails(res?.data?.data?.alternate_exercises);
      }
    } catch (error) {
      console.error("error of list athlete workout", error);
    } finally {
      setLoaderWorkout(false);
    }
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
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
                Reps
              </StyledTableCell>
              <StyledTableCell
                align="center"
                color="#fff"
                style={{ borderRight: "1px solid #fff" }}
              >
                Sets
              </StyledTableCell>
              <StyledTableCell
                align="center"
                color="#fff"
                style={{ borderRight: "1px solid #fff" }}
              >
                Rest
              </StyledTableCell>
              <StyledTableCell
                align="center"
                color="#fff"
                style={{ borderRight: "1px solid #fff" }}
              >
                Video
              </StyledTableCell>
              <StyledTableCell align="center" color="#fff">
                Alternative
              </StyledTableCell>
            </TableRow>
          </TableHead>

          {workoutDetails?.map((item) => {
            return (
              <Fragment>
                {item?.workout_group?.map((data) => {
                  return (
                    <Fragment key={item.id}>
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
                            {data?.group_name} - {data?.group_set_type}
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {data?.workout_group_exercise?.map((row, index) => (
                          <StyledTableRow key={row?.workout_exercise_name}>
                            <StyledTableCell component="th" scope="row">
                              {row?.workout_exercise_name}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row?.workout_reps} {row?.workout_repetition_type}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row?.workout_sets}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row?.workout_rest} secs
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <IconButton onClick={() => toggleVideoModal(row)}>
                                <SlowMotionVideoIcon />
                              </IconButton>
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <IconButton
                                onClick={() => toggleAlternativeExercise(row)}
                              >
                                {/* <ShareIcon /> */}
                                <AttachFileIcon />
                              </IconButton>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Fragment>
                  );
                })}
              </Fragment>
            );
          })}
        </Table>
      </TableContainer>

      <VideoModal
        onHide={toggleVideoModal}
        show={viewVideoModal}
        videoModalDetails={videoModalDetails}
      />

      <AlternativeExerciseModal
        onHide={closeAlternativeExercise}
        show={viewAlternativeExercise}
        alternativeExerciseDetails={alternativeExerciseDetails}
        setLoaderWorkout={loaderAthleteWorkout}
        // exerciseId={exerciseId}
      />
    </div>
  );
}
