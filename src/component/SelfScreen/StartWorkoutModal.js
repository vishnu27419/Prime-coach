import React from "react";
import { Modal, ModalBody, Form } from "react-bootstrap";
import StartWorkoutDaysModal from "../SelfScreen/StartWorkoutDaysModal";
import { standardPostApi } from "../../container/API/ApiWrapper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FreshnessLevel from "../StartWorkout/FreshnessLevel";
import SorenessLevel from "../StartWorkout/SorenessLevel";
import FatigueLevel from "../StartWorkout/FatigueLevel";
import SleepLevel from "../StartWorkout/SleepLevel";
import FourthModal from "../StartWorkout/FourthModal";
import WellBeingWarningModal from "../StartWorkout/WellBeingWarningModal";
import ExerciseModal from "../StartWorkout/ExerciseModal";
import WorkoutCompletedModal from "../StartWorkout/WorkoutCompletedModal";
import Model from "react-body-highlighter";
import { Button, IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import StartWorkoutAlternativeExercise from "./tranningSessionSpacificReport/startworkoutAlternativeExercise/StartWorkoutAlternativeExercise";
import beep from "Custom/beep.mpeg";
const INTENSE_ERR = "The field Intensity must be between 1 and 10.";

class StartWorkoutModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutDays: false,
      // nextButton: false,
      visibleWellBeingQuestionnaire: true,
      visibleSecondExerciseModal: false,
      visibleThirdExerciseFormModal: false,
      freshDoYouFeel: null,
      howSoreAreYou: null,
      fatigueLevel: null,
      howDidYouSleep: null,
      annual_training_program_id: this.props.startWorkoutArray.id,
      // weekIdFromObject: this.props.startWorkoutArray.weeks,
      freshnessLevelError: "",
      sorenessLevelError: "",
      fatigueLevelError: "",
      sleepLevelError: "",
      Reps_Data: "0",
      Load_Data: "0",
      visibleFourthModal: false,
      bodyHighlighter: false,
      visibleWellBeingWarnin: false,
      visibleCountdownModal: false,
      bodyWeight: 0,
      sleep_level: 0,
      water_level: 0,
      exercisesArr: [],
      index: 0,
      previousIndex: 0,
      daysDetail: null,
      restTime: 0,
      allSurveyDone: false,
      hasCompletedWorkouts: false,
      visibleWellBeingInformation: false,
      visibleSubmitButton: true,
      selectedMuscles: [],
      bodyData: [],
      showingPreExercises: false,
      preExercises: [],
      hasPreExercises: false,
      preExerciseIndex: 0,
      skippingAllWorkouts: false,
      selectedIntensity: null,
      wellBeingResult: [],
      accompsResult: null,
      startWorkoutAlternativeExerciseModal: false,
      alternativeExerciseDetails: [],
      loaderAlternativeExercise: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onValueChangeSecond = this.onValueChangeSecond.bind(this);
    this.onValueChangeFatigueLevel = this.onValueChangeFatigueLevel.bind(this);
    this.onValueChangeHowDidYouSleep =
      this.onValueChangeHowDidYouSleep.bind(this);
    this.setSelectedIntensity = this.setSelectedIntensity.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onValueChange(event) {
    this.setState({
      freshDoYouFeel: event.target.value,
    });
  }

  onValueChangeSecond(event) {
    this.setState({
      howSoreAreYou: event.target.value,
    });
  }

  onValueChangeFatigueLevel(event) {
    this.setState({
      fatigueLevel: event.target.value,
    });
  }

  onValueChangeHowDidYouSleep(event) {
    this.setState({
      howDidYouSleep: event.target.value,
    });
  }

  async setSelectedIntensity(event) {
    await this.setState({
      selectedIntensity: event.target.value,
    });
    // console.log("The selected intensity is ", this.state.selectedIntensity);
  }

  showStartWorkoutDays = async () => {
    await this.setState({ workoutDays: !this.state.workoutDays });
  };

  hideStartWorkoutDays = async () => {
    await this.setState({ workoutDays: false });
  };

  showNextButton = async () => {
    const isValid = this.wellBeingQuestionnaireValidation();
    const { freshDoYouFeel, howSoreAreYou, fatigueLevel, howDidYouSleep } =
      this.state;
    const TOTAL =
      Number(freshDoYouFeel) +
      Number(howSoreAreYou) +
      Number(fatigueLevel) +
      Number(howDidYouSleep);
    if (isValid) {
      if (TOTAL <= 12) {
        this.setState({
          visibleWellBeingQuestionnaire: false,
          visibleWellBeingWarnin: true,
        });
      } else {
        this.save_workout_well_being_questionnaire();
      }
    }
  };

  // fourthModalfunction = async () => {
  //   await this.setState({
  //     nextButton: false,
  //     visibleWellBeingQuestionnaire: false,
  //     visibleSecondExerciseModal: false,
  //     visibleThirdExerciseFormModal: false,
  //     visibleFourthModal: false,
  //     bodyHighlighter: true,
  //   });
  // };

  wellBeingWarninButton = async () => {
    this.save_workout_well_being_questionnaire();
  };

  save_workout_well_being_questionnaire = async () => {
    try {
      const res = await standardPostApi(
        "save_workout_well_being_questionnaire",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: this.state.annual_training_program_id,
          annual_training_program_week_id: this.props.weekDetail.id,
          annual_training_program_day_id: this.props.daysDetail.id,
          freshness_level: this.state.freshDoYouFeel,
          soreness_level: this.state.howSoreAreYou,
          fatigue_level: this.state.fatigueLevel,
          sleep_level: this.state.howDidYouSleep,
        },
        true
      );
      if (res.data.code === 200) {
        await this.setState({
          visibleWellBeingQuestionnaire: false,
          visibleFourthModal: true,
          visibleWellBeingWarnin: false,
        });
        toast.success(res.data.message, { autoClose: 2500 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  wellBeingQuestionnaireValidation = () => {
    let freshnessLevelError = "";
    let sorenessLevelError = "";
    let fatigueLevelError = "";
    let sleepLevelError = "";

    if (!this.state.freshDoYouFeel) {
      freshnessLevelError = toast.error("Please Select How Fresh Do You Feel", {
        autoClose: 2500,
      });
    }

    if (!this.state.howSoreAreYou) {
      sorenessLevelError = toast.error("Please Select How Sore Are You", {
        autoClose: 2500,
      });
    }

    if (!this.state.fatigueLevel) {
      fatigueLevelError = toast.error("Please Select Fatigue Level", {
        autoClose: 2500,
      });
    }

    if (!this.state.howDidYouSleep) {
      sleepLevelError = toast.error("Please Select How Did You Sleep", {
        autoClose: 2500,
      });
    }

    if (
      freshnessLevelError ||
      sorenessLevelError ||
      fatigueLevelError ||
      sleepLevelError
    ) {
      this.setState({
        freshnessLevelError,
        sorenessLevelError,
        fatigueLevelError,
        sleepLevelError,
      });
      return false;
    } else {
      return true;
    }
  };

  isInputNumber = (event) => {
    var char = String.fromCharCode(event.which);
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  };

  workout_sleep_water_level = async (weight) => {
    console.log("weight", weight);
    try {
      const res = await standardPostApi(
        "workout_sleep_water_level",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: this.state.annual_training_program_id,
          annual_training_program_week_id: this.props.weekDetail.id,
          annual_training_program_day_id: this.props.daysDetail.id,
          body_weight:
            weight === 0
              ? this.state.bodyWeight
              : (parseFloat(this.state.bodyWeight) * 2.20462).toString(),
          sleep_level: this.state.sleep_level,
          water_level: this.state.water_level,
        },
        true
      );
      if (res.data.code === 200) {
        await this.setState({
          visibleFourthModal: false,
          bodyHighlighter: true,
        });
        toast.success(res.data.message, { autoClose: 2500 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  async UNSAFE_componentWillReceiveProps(newProps) {
    await this.setState({ daysDetail: newProps.daysDetail });
    try {
      let output = this.state.daysDetail.groups.reduce((result, group) => {
        if (group.workout_group_exercise.length > 0) {
          const { workout_sets, workout_rest } =
            group.workout_group_exercise[0];
          for (let set = 1; set <= workout_sets; set++) {
            group.workout_group_exercise.forEach((workout) => {
              result.push({
                type: "EXERCISE",
                data: {
                  ...workout,
                  setNumber: set,
                  group_name: group.group_name,
                  workout_type: group.workout_type,
                  old_exercise_id: null,
                },
              });
              result.push({
                type: "INPUT",
                data: {
                  workout_load_required: workout.workout_load_required,
                  restTime: workout_rest,
                  setNumber: set,
                  id: workout.id,
                  old_exercise_id: null,
                },
              });
            });
            result.push({
              type: "REST",
              data: {},
            });
          }
        }
        return result;
      }, []);
      await this.setState({ exercisesArr: output });
    } catch (err) {
      console.log("Caught err ", JSON.stringify(err));
    }
  }

  goNext = async () => {
    const { index, exercisesArr } = this.state;
    if (index !== exercisesArr.length - 1) {
      await this.setState({
        index: index + 1,
      });
    }
  };

  goPrevious = async () => {
    const { index, exercisesArr, previousIndex } = this.state;
    if (index > 0) {
      if (exercisesArr[index - 3]?.type === "EXERCISE")
        this.setState({
          index: index - 3,
          previousIndex: previousIndex + 1,
        });
      else if (exercisesArr[index - 2]?.type === "EXERCISE")
        this.setState({
          index: index - 2,
          previousIndex: previousIndex + 1,
        });
    }
  };

  async componentDidUpdate() {
    const ELEMENT = this.state.exercisesArr[this.state.index];
    const { index, exercisesArr } = this.state;
    if (this.state.restTime === 0 && ELEMENT && ELEMENT.type === "REST") {
      clearInterval(this.interval);
      await this.setState({
        index:
          index !== exercisesArr.length - 1
            ? index + 1
            : this.setState({
                hasCompletedWorkouts: true,
                allSurveyDone: false,
              }),
      });
    }
  }

  // startInterval = async () => {
  //   if (this.state.restTime > 0) {
  //     this.interval = setInterval(
  //       async () =>
  //         await this.setState((prevState) => ({
  //           restTime: prevState.restTime - 1,
  //         })),
  //       1000
  //     );
  //   }
  // };

  startInterval = async () => {
    if (this.state.restTime > 0) {
      if (this.state.restTime < 6) this.PlayLocalSoundFile();
      this.interval = setInterval(async () => {
        this.setState((prevState) => ({
          restTime: prevState.restTime - 1,
        }));
        if (this.state.restTime < 6 && this.state.restTime > 0)
          this.PlayLocalSoundFile();
      }, 1000);
    }
  };

  PlayLocalSoundFile = () => {
    document.getElementById(
      "sound"
    ).innerHTML = `<audio id="audio-player" src="${beep}" type="audio/mpeg" autoplay>`;
  };

  skipRestTime = async () => {
    const { index, exercisesArr } = this.state;
    clearInterval(this.interval);
    await this.setState({
      index:
        index !== exercisesArr.length - 1
          ? index + 1
          : this.setState({
              hasCompletedWorkouts: true,
              allSurveyDone: false,
            }),
    });
  };

  completeWorkoutExercise = async () => {
    const { index, exercisesArr } = this.state;
    const ELEMENT = this.state.exercisesArr[this.state.index];
    const NEXT_ELEMENT = this.state.exercisesArr[this.state.index + 1];
    try {
      const res = await standardPostApi(
        "complete_single_day_workout_exercise",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: this.state.annual_training_program_id,
          annual_training_program_week_id: this.props.weekDetail.id,
          annual_training_program_day_id: this.props.daysDetail.id,
          annual_training_program_exercise_id: ELEMENT.data.id,
          annual_training_program_exercise_set_number: ELEMENT.data.setNumber,
          annual_training_program_reps_completed: this.state.Reps_Data,
          annual_training_program_load_completed: this.state.Load_Data,
          annual_training_program_replaced_alternate_id:
            ELEMENT?.data?.old_exercise_id,
        },
        true,
        false
      );
      if (res.data.code == 301) {
        await this.setState({
          Reps_Data: "0",
          Load_Data: "0",
          restTime: ELEMENT.data.restTime,
          index: index !== exercisesArr.length - 1 ? index + 1 : 0,
        });
        if (NEXT_ELEMENT.type == "REST") this.startInterval();
        toast.error(res.data.message, { autoClose: 2500 });
      }
      if (res.data.code == 200) {
        await this.setState({
          Reps_Data: "0",
          Load_Data: "0",
          restTime: ELEMENT.data.restTime,
          index: index !== exercisesArr.length - 1 ? index + 1 : 0,
        });
        if (NEXT_ELEMENT.type == "REST") this.startInterval();
        toast.success(res.data.message, { autoClose: 2500 });
        console.log("====>COMPLETE_SINGLE_DAY_WORKOUT->", res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  completeWorkoutButton = async () => {
    await this.setState({
      visibleWellBeingQuestionnaire: false,
      hasCompletedWorkouts: true,
      skippingAllWorkouts: true,
    });
  };

  verifyIntensity = () => {
    const { selectedIntensity } = this.state;
    if (selectedIntensity === null) {
      toast.error(INTENSE_ERR, { autoClose: 2500 });
      return false;
    }
    return true;
  };

  completeSingleDayWorkout = async () => {
    const { skippingAllWorkouts } = this.state;
    if (this.verifyIntensity()) {
      try {
        const res = await standardPostApi(
          "complete_single_day_workout",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            annual_training_program_id: this.state.annual_training_program_id,
            annual_training_program_week_id: this.props.weekDetail.id,
            annual_training_program_day_id: this.props.daysDetail.id,
            workout_direct_complete: skippingAllWorkouts ? 1 : 0,
            workout_intensity: this.state.selectedIntensity,
          },
          true,
          false
        );
        if (res.data.code == 301) {
          toast.error(res.data.message, { autoClose: 2500 });
        }
        if (res.data.code == 200) {
          console.log("workout completed ", res.data.data);
          let wellInfo = Object.values(
            res.data.data.WorkoutWellBeingQuestonnaire
          );
          await this.setState({
            accompsResult: res.data.data.WorkoutAccomplishments,
            wellBeingResult: wellInfo,
            showAccomps: true,
            visibleWellBeingInformation: true,
            visibleSubmitButton: false,
          });
          console.log("accompsResult ", this.state.accompsResult);
          toast.success(res.data.message, { autoClose: 2500 });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  addMusclesToArray = async (exercise) => {
    const { muscle } = exercise;
    const { selectedMuscles, bodyData } = this.state;
    const found = selectedMuscles.some((el) => el.muscles[0] == muscle);
    if (!found) {
      selectedMuscles.push({ muscles: [muscle] });
      bodyData.push(muscle);
      await this.setState({ selectedMuscles, bodyData });
    } else {
      await this.setState({
        bodyData: bodyData.filter((el) => el !== muscle),
        selectedMuscles: selectedMuscles.filter(
          (el) => el.muscles[0] !== muscle
        ),
      });
    }
  };

  clearSection = async () => {
    await this.setState({ selectedMuscles: [], bodyData: [] });
  };

  workout_soreness_muscle_exercise = async () => {
    const { bodyData } = this.state;
    if (bodyData.length > 0) {
      try {
        const res = await standardPostApi(
          "workout_soreness_muscle_exercise",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            annual_training_program_id: this.state.annual_training_program_id,
            annual_training_program_week_id: this.props.weekDetail.id,
            annual_training_program_day_id: this.props.daysDetail.id,
            soreness_muscle: JSON.stringify(this.state.bodyData),
          },
          true
        );
        if (res.data.code === 200) {
          let response = res.data.data;
          let pre_exercises = [];
          response.forEach((item) => {
            pre_exercises.push(...item.Exercises);
          });
          this.setState({ preExercises: pre_exercises });
          if (pre_exercises.length > 0) {
            this.setState({
              hasPreExercises: true,
              bodyHighlighter: false,
              showingPreExercises: true,
            });
          }
          if (pre_exercises.length === 0) {
            this.setState({
              bodyHighlighter: false,
              allSurveyDone: true,
            });
            toast.success(
              "There are no pre exercises for you to perform, kindly continue with the Workouts.",
              { autoClose: 2500 }
            );
          }
          console.log(
            "RESPONSE OF workout_soreness_muscle_exercise",
            res.data.data
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      this.setState({
        bodyHighlighter: false,
        allSurveyDone: true,
      });
    }
  };

  nextExercise = async () => {
    const { preExercises, preExerciseIndex } = this.state;
    if (preExerciseIndex !== preExercises.length - 1) {
      await this.setState({ preExerciseIndex: preExerciseIndex + 1 });
    } else {
      toast.success(
        "You have completed the pre workout exercises, now you may continue with the Workouts.",
        { autoClose: 2500 }
      );
      await this.setState({ showingPreExercises: false, allSurveyDone: true });
    }
  };

  refreshPageonComplete = async () => {
    await window.location.reload(false);
    // await this.setState({});

    return this.props.onHide;
  };

  toggleStartWorkoutAlternativeExercise = () => {
    this.setState({
      startWorkoutAlternativeExerciseModal:
        !this.state.startWorkoutAlternativeExerciseModal,
    });
    this.ListAthleteWorkout(
      this.state.exercisesArr[this.state.index]?.data?.id
    );
  };

  // ListAthleteWorkout = async () => {
  //   try {
  //     const res = await standardPostApi(
  //       "list_alternative_exercise",
  //       undefined,
  //       { access_token: await localStorage.getItem("access_token") },
  //       true
  //     );
  //     if (res.data.code === 200) {
  //       console.log("Response of List athlete Workout---->", res.data.data);
  //       this.setState({ alternativeExerciseDetails: res.data.data });
  //     }
  //   } catch (error) {
  //     console.error("Error of list athlete workout", error);
  //   }
  // };

  ListAthleteWorkout = async (ExerciseId) => {
    this.setState({ loaderAlternativeExercise: true });
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
        this.setState({
          alternativeExerciseDetails: res?.data?.data?.alternate_exercises,
        });
      }
    } catch (error) {
      console.error("error of list athlete workout", error);
    } finally {
      this.setState({ loaderAlternativeExercise: false });
    }
  };

  onAlternativeSelect = (item) => {
    const { exercisesArr, index } = this.state;

    // console.log("After Assign", exercisesArr);

    let Temp = exercisesArr[index];

    let TempExercises = [...exercisesArr];
    for (var i = 0; TempExercises.length > i; i++) {
      if (
        TempExercises[i].type === "EXERCISE" &&
        TempExercises[i].data.id === Temp?.data?.id
      ) {
        TempExercises[i].data.workout_exercise_name = item?.exercise;
        TempExercises[i].data.workout_exercise_video = item?.video;
        TempExercises[i].data.old_exercise_id = item?.id;
      } else if (
        TempExercises[i].type === "INPUT" &&
        TempExercises[i].data.id === Temp?.data?.id
      ) {
        TempExercises[i].data.old_exercise_id = item?.id;
      } else if (TempExercises[i].type === "REST") {
      }
    }
    this.setState({
      exercisesArr: [...TempExercises],
      startWorkoutAlternativeExerciseModal: false,
    });
  };

  isInputNumber = (event) => {
    var char = String.fromCharCode(event.which);
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  };

  render() {
    const {
      daysDetail,
      Reps_Data,
      Load_Data,
      allSurveyDone,
      accompsResult,
      alternativeExerciseDetails,
    } = this.state;
    const ELEMENT = allSurveyDone && this.state.exercisesArr[this.state.index];
    const currentPreExercise =
      this.state.preExercises[this.state.preExerciseIndex];
    // console.log("The element is ", ELEMENT);

    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={() => false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          keyboard
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="workout-sheetTitle">
                {this.state.visibleWellBeingWarnin === true
                  ? "Well Being Warning"
                  : this.state.visibleWellBeingQuestionnaire
                  ? "Well Being Questionnaire"
                  : daysDetail && daysDetail.day_number}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  this.props.onHide();
                  this.setState({
                    workoutDays: false,
                    visibleWellBeingQuestionnaire: true,
                    visibleSecondExerciseModal: false,
                    visibleThirdExerciseFormModal: false,
                    freshDoYouFeel: null,
                    howSoreAreYou: null,
                    fatigueLevel: null,
                    howDidYouSleep: null,
                    annual_training_program_id: this.props.startWorkoutArray.id,
                    freshnessLevelError: "",
                    sorenessLevelError: "",
                    fatigueLevelError: "",
                    sleepLevelError: "",
                    Reps_Data: "0",
                    Load_Data: "0",
                    visibleFourthModal: false,
                    bodyHighlighter: false,
                    visibleWellBeingWarnin: false,
                    visibleCountdownModal: false,
                    bodyWeight: 0,
                    sleep_level: 0,
                    water_level: 0,
                    exercisesArr: [],
                    index: 0,
                    previousIndex: 0,
                    daysDetail: null,
                    restTime: 0,
                    allSurveyDone: false,
                    hasCompletedWorkouts: false,
                    visibleWellBeingInformation: false,
                    visibleSubmitButton: true,
                    selectedMuscles: [],
                    bodyData: [],
                    showingPreExercises: false,
                    preExercises: [],
                    hasPreExercises: false,
                    preExerciseIndex: 0,
                    skippingAllWorkouts: false,
                    selectedIntensity: null,
                    wellBeingResult: [],
                    accompsResult: null,
                    startWorkoutAlternativeExerciseModal: false,
                    alternativeExerciseDetails: [],
                    loaderAlternativeExercise: false,
                  });
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            {this.state.visibleWellBeingQuestionnaire && (
              <div className="modal-body text-center">
                <form action="" id="main_worksheet">
                  <FreshnessLevel onValueChange={this.onValueChange} />

                  <SorenessLevel
                    onValueChangeSecond={this.onValueChangeSecond}
                  />

                  <FatigueLevel
                    onValueChangeFatigueLevel={this.onValueChangeFatigueLevel}
                  />

                  <SleepLevel
                    onValueChangeHowDidYouSleep={
                      this.onValueChangeHowDidYouSleep
                    }
                  />

                  <button
                    type="button"
                    id="newtab"
                    className="btn btn-success"
                    onClick={() => {
                      this.showNextButton();
                    }}
                    style={{ padding: "5px 74px" }}
                  >
                    Submit
                  </button>
                </form>
                <button
                  onClick={this.completeWorkoutButton}
                  className="workout_Complete_Btn"
                ></button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.completeWorkoutButton}
                  style={{ float: "right", backgroundColor: "#2F84CA" }}
                >
                  Complete Workout
                </Button>
              </div>
            )}
          </Modal.Body>

          {/* second Exercise modal start */}
          {ELEMENT && ELEMENT.type == "EXERCISE" && (
            <div>
              <Modal.Body>
                <div>
                  <div>
                    <div className="modal-content">
                      <div
                        className="modal-body"
                        style={{ textAlign: "center", color: "black" }}
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <div>
                              <div>
                                <div>
                                  <div className="panel">
                                    <div className="panel-heading">
                                      <h2
                                        style={{
                                          color: "#555",
                                          fontSize: "38px",
                                          fontWeight: "100",
                                          lineHeight: "50px",
                                          marginTop: "10px",
                                        }}
                                      >
                                        {ELEMENT.data.group_name}{" "}
                                        {ELEMENT.data.workout_type}
                                      </h2>
                                      <div>
                                        <h3
                                          id="workout-exercise-name"
                                          style={{
                                            color: "#555",
                                            fontSize: "22px",
                                            fontWeight: "300",
                                            lineHeight: "30px",
                                          }}
                                        >
                                          {ELEMENT.data.workout_exercise_name}
                                        </h3>

                                        <hr />
                                        <div>
                                          <table
                                            className="table"
                                            style={{
                                              color: "black",
                                              textAlign: "left",
                                            }}
                                          >
                                            <thead>
                                              <tr>
                                                <th>Sets</th>
                                                <th>Reps</th>
                                                <th>Load</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td>
                                                  {ELEMENT.data.setNumber} /{" "}
                                                  {ELEMENT.data.workout_sets}
                                                </td>
                                                <td>
                                                  {ELEMENT.data.workout_reps}{" "}
                                                  {ELEMENT.data.workout_repetition_type.toLowerCase()}
                                                  {ELEMENT.data
                                                    .workout_reps_each_side ===
                                                    "1" && " ES"}
                                                </td>
                                                <td>
                                                  {ELEMENT.data.workout_load} kg
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <iframe
                                        title="try"
                                        width="100%"
                                        height="315"
                                        src={
                                          ELEMENT.data.workout_exercise_video
                                        }
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen=""
                                      ></iframe>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer style={{ justifyContent: "space-between" }}>
                <div style={{ display: "contents" }}>
                  {this.state.index !== 0 && (
                    <button
                      type="button"
                      className="Model_btn_ok "
                      data-dismiss="modal"
                      style={{
                        backgroundColor: "#28a745",
                        border: "1px solid #28a745",
                        color: "#fff",
                      }}
                      onClick={() => this.goPrevious()}
                    >
                      Previous
                    </button>
                  )}

                  {ELEMENT.data.setNumber === 1 && (
                    <IconButton
                      style={{
                        backgroundColor: "#2F84CA",
                        border: "2px dotted #fff",
                      }}
                      onClick={() =>
                        this.toggleStartWorkoutAlternativeExercise()
                      }
                      // onClick={() => alert("Coming Soon!")}
                    >
                      <AttachFileIcon style={{ color: "#fff" }} />
                    </IconButton>
                  )}

                  <button
                    type="button"
                    className="Model_btn_ok "
                    data-dismiss="modal"
                    onClick={() => {
                      this.goNext();
                    }}
                    style={{
                      backgroundColor: "#2F84CA",
                      color: "#fff",
                      border: "1px solid #2F84CA",
                    }}
                  >
                    Next
                  </button>
                </div>
              </Modal.Footer>
            </div>
          )}
          {/* second Exercise  Modal end */}

          {/* Third Exercise Form Modal Start */}
          {ELEMENT && ELEMENT.type == "INPUT" && (
            <div>
              <Modal.Body>
                <div>
                  <div className="modal-content">
                    <div
                      className="modal-body"
                      style={{ textAlign: "center", color: "black" }}
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <form>
                            <div className="col-md-12">
                              <label
                                style={{
                                  display: "inline-block",
                                  maxWidth: "100%",
                                  marginBottom: "5px",
                                  fontWeight: "700",
                                }}
                              >
                                Completed Reps
                              </label>
                              <input
                                className="form-control "
                                type="text"
                                placeholder="0"
                                name="Reps_Data"
                                value={Reps_Data}
                                onChange={(e) => this.onChange(e)}
                                onKeyPress={this.isInputNumber}
                                maxLength={4}
                              />
                            </div>
                            {ELEMENT.data.workout_load_required == "1" && (
                              <div className="col-md-12">
                                <label
                                  style={{
                                    display: "inline-block",
                                    maxWidth: "100%",
                                    marginBottom: "5px",
                                    fontWeight: "700",
                                  }}
                                >
                                  Completed Load
                                </label>
                                <input
                                  className="form-control "
                                  type="text"
                                  placeholder="0"
                                  name="Load_Data"
                                  value={Load_Data}
                                  onChange={(e) => this.onChange(e)}
                                  onKeyPress={this.isInputNumber}
                                  maxLength={4}
                                />
                              </div>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  className="Model_btn_ok "
                  data-dismiss="modal"
                  onClick={() => {
                    this.completeWorkoutExercise();
                  }}
                  style={{
                    backgroundColor: "#2F84CA",
                    color: "#fff",
                    border: "1px solid #2F84CA",
                  }}
                >
                  Next
                </button>
              </Modal.Footer>
            </div>
          )}
          {/* Third Exercise Form Modal end */}

          {/* this is Countdown Modal start */}
          {ELEMENT && ELEMENT.type == "REST" && (
            <div>
              <Modal.Body>
                <div
                  className="modal-body"
                  style={{ textAlign: "center", color: "black" }}
                >
                  <div className="row">
                    <div className="col-md-12">
                      <h2
                        style={{
                          color: "#41a7fa ",
                          fontSize: "38px",
                          fontWeight: "421",
                          lineHeight: "50px",
                          marginTop: "10px",
                          marginBottom: "20%",
                        }}
                      >
                        REST {this.state.restTime} seconds remaining
                      </h2>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => this.skipRestTime()}
                  className="Model_btn_ok"
                  style={{
                    backgroundColor: "#2F84CA",
                    color: "#fff",
                    border: "1px solid #2F84CA",
                    float: "right",
                    marginBottom: "20px",
                  }}
                >
                  Skip Rest
                </button>
              </Modal.Body>
            </div>
          )}
          {/* this is Countdown Modal end */}

          {/* this is a  Fourth Modal starting Which is now second modal */}
          {this.state.visibleFourthModal && (
            <div>
              <Modal.Body>
                <FourthModal
                  // fourthModalfunction={() => this.fourthModalfunction()}
                  onChange={(e) => this.onChange(e)}
                  value={
                    (this.state.bodyWeight,
                    this.state.sleep_level,
                    this.state.water_level)
                  }
                  workout_sleep_water_level={this.workout_sleep_water_level}
                  onKeyPress={(event) => this.isInputNumber(event)}
                />
              </Modal.Body>
            </div>
          )}
          {/* this is the end of fourth Modal */}

          {/* this is a 5th modal The body Highlighter modal start */}
          {this.state.bodyHighlighter && (
            <div>
              <Modal.Body>
                {/* <BodyHighlighterModal
                  workout_soreness_muscle_exercise={
                    this.workout_soreness_muscle_exercise
                  }
                /> */}
                <div>
                  <div className="row">
                    <div className="col-md-12 ">
                      {/* <Form> */}
                      <div style={{ fontWeight: "bold", textAlign: "center" }}>
                        <label>
                          Please Choose The Sore body muscles from the below
                          Body Chart
                        </label>
                      </div>

                      <div className="reactBodyHighliter">
                        <Model
                          data={this.state.selectedMuscles}
                          highlightedColors={["#db2f2f"]}
                          onClick={async (exercise) => {
                            this.addMusclesToArray(exercise);
                          }}
                        />

                        <Model
                          type="posterior"
                          data={this.state.selectedMuscles}
                          highlightedColors={["#db2f2f"]}
                          onClick={async (exercise) =>
                            this.addMusclesToArray(exercise)
                          }
                        />
                      </div>

                      {this.state.bodyData.length !== 0 && (
                        <>
                          <div
                            style={{ fontWeight: "bold", textAlign: "center" }}
                          >
                            <label>
                              You have selected the following muscles
                            </label>
                          </div>
                          <button
                            className="workout_Complete_Btn"
                            onClick={() => this.clearSection()}
                            style={{
                              marginLeft: "80%",
                              marginTop: "2%",
                              fontSize: "20px",
                            }}
                          >
                            Clear Selection
                          </button>
                        </>
                      )}
                      {/* <button>2</button> */}
                      {this.state.bodyData.map((data, index) => {
                        return (
                          <div className="form-group" key={index}>
                            <i
                              className="fa fa-hand-o-right"
                              style={{
                                color: "blue",
                                fontSize: "20px",
                              }}
                            >
                              {" "}
                              <label
                                style={{
                                  color: "#000",
                                  fontSize: "20px",
                                  marginLeft: "10px",
                                }}
                              >
                                {data}
                              </label>
                            </i>
                          </div>
                        );
                      })}

                      <div className="col-md-12">
                        <button
                          type="button"
                          id="exercise-input-btn-save"
                          className="btn btn-success col-md-2 col-md-offset-2"
                          style={{
                            marginTop: "3%",
                            margin: "0 38%",
                          }}
                          onClick={this.workout_soreness_muscle_exercise}
                        >
                          Submit
                        </button>
                      </div>
                      {/* </Form> */}
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </div>
          )}
          {/* this is a 5th modal The body Highlighter modal end */}

          {/* this is Well Being Warning modal start */}
          {this.state.visibleWellBeingWarnin ? (
            <div>
              <Modal.Body>
                <WellBeingWarningModal
                  wellBeingWarninButton={() => this.wellBeingWarninButton()}
                />
              </Modal.Body>
            </div>
          ) : null}
          {/* this is Well Being Warning modal ends  */}

          {/* this is Workout Completed Modal starts */}
          {this.state.hasCompletedWorkouts ? (
            <div>
              <Modal.Body>
                <WorkoutCompletedModal
                  visibleWellBeingInformation={
                    this.state.visibleWellBeingInformation
                  }
                  setSelectedIntensity={this.setSelectedIntensity}
                  wellInfo={this.state.wellBeingResult}
                  setPercent={
                    accompsResult &&
                    accompsResult.workout_accomplishments_sets_percent
                  }
                  repsPercent={
                    accompsResult &&
                    accompsResult.workout_accomplishments_reps_percent
                  }
                  loadPercent={
                    accompsResult &&
                    accompsResult.workout_accomplishments_load_percent
                  }
                />
              </Modal.Body>
              <Modal.Footer>
                {this.state.visibleSubmitButton ? (
                  <button
                    type="button"
                    className=" btn btn-info btn-submit "
                    data-dismiss="modal"
                    onClick={this.completeSingleDayWorkout}
                  >
                    Submit
                  </button>
                ) : null}

                {this.state.visibleWellBeingInformation ? (
                  <button
                    type="button"
                    className="btn btn-success "
                    data-dismiss="modal"
                    onClick={this.refreshPageonComplete}
                  >
                    Complete
                  </button>
                ) : null}
              </Modal.Footer>
            </div>
          ) : null}
          {/* this is Workout Completed Modal ends  */}

          {/* this is Exercise Modal start */}
          {this.state.hasPreExercises && this.state.showingPreExercises && (
            <div>
              <Modal.Body>
                <ExerciseModal
                  exerciseType={currentPreExercise.exercise_type}
                  videoUrl={currentPreExercise.exercise_video}
                  onNext={() => this.nextExercise()}
                />
              </Modal.Body>
            </div>
          )}
          {/* this is Exercise Modal Ends  */}
        </Modal>

        <StartWorkoutDaysModal
          show={this.state.workoutDays}
          onHide={this.hideStartWorkoutDays}
        />

        <StartWorkoutAlternativeExercise
          show={this.state.startWorkoutAlternativeExerciseModal}
          onHide={this.toggleStartWorkoutAlternativeExercise}
          alternativeExerciseDetails={alternativeExerciseDetails}
          onAlternativeSelect={this.onAlternativeSelect}
          loaderAlternativeExercise={this.state.loaderAlternativeExercise}
        />

        <div id="sound" style={{ display: "none" }}></div>
      </div>
    );
  }
}

export default StartWorkoutModal;
