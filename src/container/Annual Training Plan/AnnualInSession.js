import React, { Component } from "react";
import "../Annual Training Plan/AnnualInSession.css";
import { Link } from "react-router-dom";
import CoachHeader from "../PublicLayout/CoachHeader";
import Footer from "../PublicLayout/Footer";
import { Modal } from "react-bootstrap";
import { standardPostApi } from "../API/ApiWrapper";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calander from "../../Custom/images/celender.jpg";
// moment and timestamp in react js
import moment from "moment";
// react toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import WorkoutNameTop from "../../component/AtpINSeison/WorkoutNameTop";
import WorkoutGroups from "../../component/AtpINSeison/WorkoutGroups";
import SuperSet from "../../component/AtpINSeison/SuperSet";
import WeekDays from "../../component/AtpINSeison/WeekDays";
import DaysWorkout from "../../component/AtpINSeison/DaysWorkout";
import SupersetExerciseModal from "../../component/AtpINSeison/SupersetExerciseModal";
import DeleteWeekModal from "../../component/AtpINSeison/DeleteWeekModal";
import DeleteDayModal from "../../component/AtpINSeison/DeleteDayModal";
import DeleteWorkoutModal from "../../component/AtpINSeison/DeleteWorkoutModal";
import DeleteWorkoutGroupModal from "../../component/AtpINSeison/DeleteWorkoutGroupModal";
import DeleteWorkoutGroupExerciseModal from "../../component/AtpINSeison/DeleteWorkoutGroupExerciseModal";
import UpdateWorkoutGroupExerciseModal from "../../component/AtpINSeison/UpdateWorkoutGroupExerciseModal";
import UpdateWorkoutGroupModal from "component/AtpINSeison/UpdateWorkoutGroupModal";
import { errorToast, successToast } from "utils/toastMessage";

class AnnualInSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      selectExerciseModal: false,
      visibleDays: false,
      visibleWorkout: false,
      visibleWorkoutGroup: false,
      visibleSuperset: false,
      visibleWorkoutNameTop: false,
      setsResets: false,
      in_season: this.props.match.params.in_season,
      date: new Date(`${this.props.location.state.start_date}`),
      hasSetDate: false,
      // endDate: new Date(`${this.props.location.state.end_date}`),
      endDate: "",
      annual_training_program_id: this.props.match.params.id,
      annualTrainingProgramWeek: [],
      annualTrainingProgramWeekName: "",
      weekTopName: "",
      dayTopName: "",
      addAnnualTrainingProgramWeek: [],
      deleteWeekModal: false,
      deleteWeekId: "",
      deleteWeekStartDate: "",
      deleteWeekEndDate: "",
      dayArray: [],
      daysWeekId: "",
      weekObject: {},
      deleteDays: false,
      daysId: "",
      workoutLocation: [],
      WorkoutType: [],
      description: "",
      workoutLocationChange: "",
      intensity: "",
      workoutType: "",
      workout: [],
      descriptionError: "",
      workoutLocationError: "",
      intensityError: "",
      workoutTypeError: "",
      showWorkoutDeleteModal: false,
      workoutId: "",
      editWorkoutObject: {},
      descriptionEdit: "",
      workoutLocationEdit: "",
      intensityEdit: "",
      workoutTypeEdit: "",
      descriptionEditError: "",
      workoutLocationEditError: "",
      intensityEditError: "",
      workoutTypeEditError: "",
      workoutIdOnClick: "",
      descriptionGroup: "",
      setsType: "",
      setsGroup: "",
      restGroup: "",
      workoutGroupArray: [],
      visiblePreWorkout_Group: true,
      deleteWorkoutGroup: false,
      descriptionGroupError: "",
      setsTypeError: "",
      setsGroupError: "",
      restGroupError: "",
      workoutGroupId: "",
      deleteWorkoutGroupArray: [],
      visibleAddWorkout_Group: true,
      WorkoutNameTopExerciseName: "",
      workoutGroupIdForExercise: "",
      preWorkoutGroupExercise: [],
      workoutGroupIdForExerciseObject: {},
      exerciseGroupId: "",
      exerciseGroupName: [],
      exercisePickerName: "",
      exercisePickerId: "",
      repsData: "",
      loadData: "",
      repetitionType: "",
      setsWorkoutExercise: "",
      restWorkoutExercise: "",
      deleteWorkoutGroupExerciseModal: false,
      workoutGroupExerciseId: "",
      exerciseError: "",
      repsDataError: "",
      loadDataError: "",
      repetitionTypeError: "",
      setsWorkoutExerciseError: "",
      restWorkoutExerciseError: "",
      updateExerciseGroupModal: false,
      updateExercisePickerId: "",
      updateExerciseField: "",
      updateRepsData: [],
      updateLoadData: [],
      updateRepetitionType: "",
      updateSetsWorkoutExercise: "",
      updateRestWorkoutExercise: "",
      workout_group_exercise_Array: [],
      visibleGreenMessage: false,
      visibleRedMessage: false,
      exerciseCountRed: "",
      listExercise: "",
      dayUpdateState: "",
      dayss: [],
      WorkoutUpdateState: "",
      weekCloneData: "",
      indexOfDeleteIcon: "",
      loadRequiredChecked: 0,
      repsEachside: 0,
      selectedLoadRequired: [],
      updateLoadRequired: 0,
      updateRipsEachSide: 0,
      setsTypeNew: "",
      showMessage: false,
      warningMessage: "",
      workoutGroupData: "",
      GroupItem: "",
      addNewWorkoutGroup: false,
      workoutExerciseLoader: false,
      updateWorkoutGroupModal: false,
      updateWorkoutGroupDetails: {},
      updateDescription: "",
      updateSetsType: "",
      hideSetsAndRest: false,
      updateSets: "",
      updateRest: "",
      UpdateDescriptionError: "",
      updateSetsTypeError: "",
      updateSetsError: "",
      updateRestError: "",
      updateGroupExerciseLoader: false,
      weekLoader: true,
      dayLoader: true,
      workoutLoder: true,
      updateExerciseItem: {},
      updateExerciseIndex: "",
      displayExerciseLoader: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.annual_training_program_details();
    this.weekDatePicker();
  }

  async onChange(e) {
    await this.setState({
      [e.target.name]: e.target.value,
      descriptionGroupError: " ",
    });

    console.log("this is updateDescription", this.state.updateDescription);
  }

  handleUploadLoadDataName = (e, i) => {
    let data = this.state.updateLoadData;
    data[i] = e.target.value;
    this.setState({ updateLoadData: data });
  };

  handelUpdateRepsData = (e, i) => {
    let data1 = this.state.updateRepsData;
    data1[i] = e.target.value;
    this.setState({ updateRepsData: data1 });
  };

  annual_training_program_details = async () => {
    const annual_training_program_id = this.state.annual_training_program_id;
    const in_season = this.state.in_season;
    // this.setState({ weekLoader: true });
    try {
      const res = await standardPostApi(
        "annual_training_program_details",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: annual_training_program_id,
          training_type: in_season,
        },
        true
      );
      if (res.data.code === 200) {
        this.setState({
          annualTrainingProgramWeek: res.data.data.weeks,
          annualTrainingProgramWeekName: res.data.data.name,
          weekLoader: false,
          weekCloneData: res.data.data,
        });
        console.log(
          "this is Annual_Training_program_detail api",
          res.data.data
        );
      }
    } catch (error) {
      // this.setState({ weekLoader: false });
      errorToast(error?.message);
      console.log(error);
    }
  };

  // Week
  annual_training_program_week = async () => {
    const annual_training_program_id = this.state.annual_training_program_id;
    const in_season = this.state.in_season;

    const week_start_date = moment(this.toTimestamp(this.state.date) * 1000)
      .format("YYYY-MM-DD")
      .toString();
    const weekStartDate = week_start_date;

    const week_end_date = moment(this.toTimestamp(this.state.endDate) * 1000)
      .format("YYYY-MM-DD")
      .toString();
    const WeekEndDate = week_end_date;

    try {
      const res = await standardPostApi(
        "annual_training_program_week",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: annual_training_program_id,
          training_type: in_season,
          annual_training_program_week_start_date: weekStartDate,
          annual_training_program_week_end_date: WeekEndDate,
        },
        true
      );
      if (res.data.code === 200) {
        await this.setState({
          addAnnualTrainingProgramWeek: res.data.data.TrainingProgram.weeks,
        });
        // console.log(
        //   "This is res of annual_training_program_week Api",
        //   res.data.data.TrainingProgram.weeks
        // );
        await this.annual_training_program_details();

        return toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  delete_annual_training_program_week = async () => {
    const annual_training_program_id = this.state.annual_training_program_id;
    const in_season = this.state.in_season;
    const annual_training_program_week_id = this.state.deleteWeekId;
    const annual_training_program_week_start_date =
      this.state.deleteWeekStartDate;
    const annual_training_program_week_end_date = this.state.deleteWeekEndDate;

    try {
      const res = await standardPostApi(
        "annual_training_program_week",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: annual_training_program_id,
          training_type: in_season,
          annual_training_program_week_id: annual_training_program_week_id,
          annual_training_program_week_start_date:
            annual_training_program_week_start_date,
          annual_training_program_week_end_date:
            annual_training_program_week_end_date,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("this is res of delete Week=*>", res.data.data);
        this.setState({
          visibleWorkoutNameTop: false,
          showMessage: false,
          visibleWorkoutGroup: false,
          visibleSuperset: false,
          visibleDays: false,
          visibleWorkout: false,
        });
        await this.hideWeekModal();
        await this.annual_training_program_details();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Day
  annual_training_program_week_days = async (index) => {
    const annual_training_program_id = this.state.annual_training_program_id;
    const in_season = this.state.in_season;
    const annual_training_program_week_id = this.state.daysWeekId;

    try {
      const res = await standardPostApi(
        "annual_training_program_week_days",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: annual_training_program_id,
          training_type: in_season,
          annual_training_program_week_id: annual_training_program_week_id,
          annual_training_program_week_day: index + 1,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("this is res of Add Days=::>", res.data.data.weeks);
        await this.annual_training_program_details();
        this.weekButton(this.state.dayUpdateState);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  delete_annual_training_program_week_days = async (index) => {
    const annual_training_program_id = this.state.annual_training_program_id;
    const in_season = this.state.in_season;
    const annual_training_program_week_id = this.state.daysWeekId;
    try {
      const res = await standardPostApi(
        "annual_training_program_week_days",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: annual_training_program_id,
          training_type: in_season,
          annual_training_program_week_id: annual_training_program_week_id,
          annual_training_program_week_day: index + 1,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("This is res of delete Days =>", res.data.data);
        await this.hideDeleteDaysModal();
        await this.annual_training_program_details();
        this.weekButton(this.state.dayUpdateState);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Workout
  pre_add_annual_training_program_workout = async () => {
    const annual_training_program_id = this.state.annual_training_program_id;
    const in_season = this.state.in_season;
    const annual_training_program_week_id = this.state.daysWeekId;
    const annual_training_program_week_day_id = this.state.daysId;

    try {
      const res = await standardPostApi(
        "pre_add_annual_training_program_workout",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: annual_training_program_id,
          training_type: in_season,
          annual_training_program_week_id: annual_training_program_week_id,
          annual_training_program_week_day_id:
            annual_training_program_week_day_id,
        },
        true
      );
      if (res.data.code === 200) {
        this.setState({
          workoutLocation: res.data.data.WorkoutLocation.pickerArray,
          WorkoutType: res.data.data.WorkoutType.pickerArray,
        });
        // console.log("this is res of pre Add Workout =>", res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  isInputNumber = (event) => {
    var char = String.fromCharCode(event.which);
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  };

  annual_training_program_workout = async () => {
    const annual_training_program_id = this.state.annual_training_program_id;
    const in_season = this.state.in_season;
    const annual_training_program_week_id = this.state.daysWeekId;
    const annual_training_program_week_day_id = this.state.daysId;

    const isValid = this.workoutValidation();
    if (isValid) {
      try {
        const res = await standardPostApi(
          "annual_training_program_workout",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            annual_training_program_id: annual_training_program_id,
            training_type: in_season,
            annual_training_program_week_id: annual_training_program_week_id,
            annual_training_program_week_day_id:
              annual_training_program_week_day_id,
            workout_description: this.state.description,
            workout_location: this.state.workoutLocationChange,
            workout_intensity: this.state.intensity,
            workout_type: this.state.workoutType,
            api_action: "add",
          },
          true
        );
        if (res.data.code === 200) {
          await this.setState({
            descriptionError: " ",
            workoutLocationError: " ",
            intensityError: " ",
            workoutTypeError: " ",
          });
          // console.log("this is res of add workout", res.data.data.weeks);
          await this.annual_training_program_details();
          this.weekDayButton(this.state.WorkoutUpdateState);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  workoutValidation = () => {
    let descriptionError = "";
    let workoutLocationError = "";
    let intensityError = "";
    let workoutTypeError = "";

    if (!this.state.description) {
      descriptionError = "Description field is required";
    }

    if (!this.state.workoutLocationChange) {
      workoutLocationError = "Choose Workout Location";
    }

    if (!this.state.intensity) {
      intensityError = "Intensity field is required";
    } else if (this.state.intensity > 10) {
      intensityError = "Intensity field has to be between 1 - 10";
    } else if (this.state.intensity == 0) {
      intensityError = "Intensity field has to be between 1 - 10";
    }

    if (!this.state.workoutType) {
      workoutTypeError = "Choose Workout Type";
    }

    if (
      descriptionError ||
      workoutLocationError ||
      intensityError ||
      workoutTypeError
    ) {
      this.setState({
        descriptionError,
        workoutLocationError,
        intensityError,
        workoutTypeError,
      });
      return false;
    } else {
      return true;
    }
  };

  delete_annual_training_program_workout = async () => {
    const annual_training_program_id = this.state.annual_training_program_id;
    const in_season = this.state.in_season;
    const annual_training_program_week_id = this.state.daysWeekId;
    const annual_training_program_week_day_id = this.state.daysId;
    const annual_training_program_workout_id = this.state.workoutId;

    try {
      const res = await standardPostApi(
        "annual_training_program_workout",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: annual_training_program_id,
          training_type: in_season,
          annual_training_program_week_id: annual_training_program_week_id,
          annual_training_program_week_day_id:
            annual_training_program_week_day_id,
          annual_training_program_workout_id:
            annual_training_program_workout_id,
          api_action: "delete",
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("this is res of delete Workout", res.data.data);
        await this.hideWorkoutDeleteButton();
        await this.annual_training_program_details();
        this.weekDayButton(this.state.WorkoutUpdateState);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  update_annual_training_program_workout = async () => {
    const annual_training_program_id = this.state.annual_training_program_id;
    const in_season = this.state.in_season;
    const annual_training_program_week_id = this.state.daysWeekId;
    const annual_training_program_week_day_id = this.state.daysId;
    const annual_training_program_workout_id = this.state.editWorkoutObject.id;

    const isValid = this.updateWorkoutValidation();

    if (isValid) {
      try {
        const res = await standardPostApi(
          "annual_training_program_workout",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            annual_training_program_id: annual_training_program_id,
            training_type: in_season,
            annual_training_program_week_id: annual_training_program_week_id,
            annual_training_program_week_day_id:
              annual_training_program_week_day_id,
            annual_training_program_workout_id:
              annual_training_program_workout_id,
            workout_description: this.state.descriptionEdit,
            workout_location: this.state.workoutLocationEdit,
            workout_intensity: this.state.intensityEdit,
            workout_type: this.state.workoutTypeEdit,
            api_action: "update",
          },
          true
        );
        if (res.data.code === 200) {
          // console.log("this is res of update workout", res.data.data);
          await this.hideModal();
          await this.annual_training_program_details();
          this.weekDayButton(this.state.WorkoutUpdateState);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  updateWorkoutValidation = () => {
    let descriptionEditError = "";
    let workoutLocationEditError = "";
    let intensityEditError = "";
    let workoutTypeEditError = "";

    if (!this.state.descriptionEdit) {
      descriptionEditError = "Description field is required";
    }

    if (!this.state.workoutLocationEdit) {
      workoutLocationEditError = "Choose Workout Location field";
    }

    if (!this.state.intensityEdit) {
      intensityEditError = "Intensity field is required";
    } else if (this.state.intensityEdit > 10) {
      intensityEditError = "Intensity field has to be between 1 - 10";
    } else if (this.state.intensityEdit == 0) {
      intensityEditError = "Intensity field has to be between 1 - 10";
    }

    if (!this.state.workoutTypeEdit) {
      workoutTypeEditError = "Choose  Workout Type field";
    }

    if (
      descriptionEditError ||
      workoutLocationEditError ||
      intensityEditError ||
      workoutTypeEditError
    ) {
      this.setState({
        descriptionEditError,
        workoutLocationEditError,
        intensityEditError,
        workoutTypeEditError,
      });
      return false;
    } else {
      return true;
    }
  };

  // Workout Group
  annual_training_program_workout_group = async () => {
    const isValid = this.workoutGroupValidation();
    this.setState({ addNewWorkoutGroup: true });

    if (isValid) {
      try {
        const res = await standardPostApi(
          "annual_training_program_workout_group",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            annual_training_program_id: this.state.annual_training_program_id,
            training_type: this.state.in_season,
            annual_training_program_week_id: this.state.daysWeekId,
            annual_training_program_week_day_id: this.state.daysId,
            annual_training_program_workout_id: this.state.workoutIdOnClick,
            workout_group_description: this.state.descriptionGroup,
            workout_group_set_type: this.state.setsType,
            workout_group_sets: this.state.setsGroup ? this.state.setsGroup : 0,
            workout_group_rest: this.state.restGroup ? this.state.restGroup : 0,
          },
          true
        );
        if (res.data.code === 200) {
          console.log("Response--?", res);
          await this.setState({
            workoutGroupArray: res.data.data.weeks,
            // visiblePreWorkout_Group: false,
            restGroupError: " ",
            setsGroupError: " ",
            descriptionGroup: "",
            setsGroup: "",
            restGroup: "",
            setsType: "",
            addNewWorkoutGroup: false,
          });
          // console.log("this is res of workout group", res.data.data);
          await this.annual_training_program_details();
          await this.DaysWorkoutButton(this.state.GroupItem);
          toast.success(res.data.message);
        }
      } catch (error) {
        this.setState({ addNewWorkoutGroup: false });
        console.log(error);
      }
    }
  };

  workoutGroupValidation = () => {
    let descriptionGroupError = "";
    let setsTypeError = "";

    if (!this.state.descriptionGroup) {
      descriptionGroupError = "Workout group description can not be empty";
      toast.error("Workout group description can not be empty", {
        autoClose: 2000,
      });
    }

    if (!this.state.setsType) {
      setsTypeError = "Choose Sets Type ";
    }

    if (descriptionGroupError || setsTypeError) {
      this.setState({
        descriptionGroupError,
        setsTypeError,
      });
      return false;
    } else {
      return true;
    }
  };

  delete_annual_training_program_workout_group = async () => {
    try {
      const res = await standardPostApi(
        "annual_training_program_workout_group",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: this.state.annual_training_program_id,
          training_type: this.state.in_season,
          annual_training_program_week_id: this.state.daysWeekId,
          annual_training_program_week_day_id: this.state.daysId,
          annual_training_program_workout_id: this.state.workoutIdOnClick,
          annual_training_program_workout_group_id: this.state.workoutGroupId,
          api_action: "delete",
        },
        true
      );
      if (res.data.code === 200) {
        await this.setState({
          deleteWorkoutGroupArray: res.data.data.weeks,
          // visiblePreWorkout_Group: false,
          // visibleAddWorkout_Group: false,
          visibleSuperset: false,
          showMessage: false,
        });
        // console.log("This is res of delete Workout Group", res.data.data);
        await this.hidedeleteWorkoutGroup();
        await this.annual_training_program_details();
        await this.DaysWorkoutButton(this.state.GroupItem);
        toast.success(res.data.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  update_annual_training_program_workout_group = async () => {
    const { updateDescription, updateSetsType, updateSets, updateRest } =
      this.state;

    const isValid = this.WorkoutGroupUpdateValidation();

    if (isValid) {
      this.setState({ updateGroupExerciseLoader: true });
      try {
        const res = await standardPostApi(
          "annual_training_program_workout_group",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            annual_training_program_id: this.state.annual_training_program_id,
            training_type: this.state.in_season,
            annual_training_program_week_id: this.state.daysWeekId,
            annual_training_program_week_day_id: this.state.daysId,
            annual_training_program_workout_id: this.state.workoutIdOnClick,
            annual_training_program_workout_group_id: this.state.workoutGroupId,
            workout_group_description: updateDescription,
            workout_group_set_type: updateSetsType,
            workout_group_sets: updateSets,
            workout_group_rest: updateRest,
            api_action: "update",
          },
          true
        );
        if (res.data.code === 200) {
          console.log("Response of Update Workout Group--->", res.data);
          await this.annual_training_program_details();
          await this.DaysWorkoutButton(this.state.GroupItem);
          this.setState({
            updateGroupExerciseLoader: false,
            updateWorkoutGroupModal: false,
            updateDescription: "",
            updateSetsType: "",
            updateSets: "",
            updateRest: "",
            visibleSuperset: false,
            visibleWorkoutNameTop: false,
            showMessage: false,
            updateSetsTypeError: "",
            UpdateDescriptionError: "",
            updateSetsError: "",
            updateRestError: "",
          });

          successToast("Workout group updated sucessfully");
        }
      } catch (error) {
        this.setState({ updateGroupExerciseLoader: false });
        console.error(error);
      }
    }
  };

  WorkoutGroupUpdateValidation = () => {
    let UpdateDescriptionError = "";
    let updateSetsTypeError = "";
    let updateSetsError = "";
    let updateRestError = "";

    if (this.state.updateSetsType === "procedural") {
      if (!this.state.updateDescription) {
        UpdateDescriptionError = "Description field is required.";
      }
      if (!this.state.updateSetsType) {
        updateSetsTypeError = "Please Choose sets type";
      }

      if (UpdateDescriptionError || updateSetsTypeError) {
        this.setState({
          UpdateDescriptionError,
          updateSetsTypeError,
        });
        return false;
      } else {
        return true;
      }
    } else {
      if (!this.state.updateDescription) {
        UpdateDescriptionError = "Description field is required.";
      }
      if (!this.state.updateSetsType) {
        updateSetsTypeError = "Please Choose sets type.";
      }

      if (!this.state.updateSets) {
        updateSetsError = "Sets field is required.";
      }

      if (!this.state.updateRest) {
        updateRestError = "Rest field is required.";
      }
      if (
        UpdateDescriptionError ||
        updateSetsTypeError ||
        updateSetsError ||
        updateRestError
      ) {
        this.setState({
          UpdateDescriptionError,
          updateSetsTypeError,
          updateSetsError,
          updateRestError,
        });
        return false;
      } else {
        return true;
      }
    }
  };

  // Workout Group exercise
  pre_annual_training_program_workout_group_exercise = async () => {
    try {
      const res = await standardPostApi(
        "pre_annual_training_program_workout_group_exercise",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: this.state.annual_training_program_id,
          training_type: this.state.in_season,
          annual_training_program_week_id: this.state.daysWeekId,
          annual_training_program_week_day_id: this.state.daysId,
          annual_training_program_workout_id: this.state.workoutIdOnClick,
          annual_training_program_workout_group_id:
            this.state.workoutGroupIdForExercise,
        },
        true
      );
      if (res.data.code === 200) {
        await this.setState({
          preWorkoutGroupExercise:
            res.data.data.WorkoutExerciseGroup.pickerArray,
        });
        // console.log(
        //   "this is res of pre Workout group exercise",
        //   res.data.data.WorkoutExerciseGroup
        // );
      }
    } catch (error) {
      console.log(error);
    }
  };

  pre_annual_training_program_workout_group_exercise_With_exercise_id =
    async () => {
      this.setState({ displayExerciseLoader: true });
      try {
        const res = await standardPostApi(
          "pre_annual_training_program_workout_group_exercise",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            annual_training_program_id: this.state.annual_training_program_id,
            training_type: this.state.in_season,
            annual_training_program_week_id: this.state.daysWeekId,
            annual_training_program_week_day_id: this.state.daysId,
            annual_training_program_workout_id: this.state.workoutIdOnClick,
            annual_training_program_workout_group_id:
              this.state.workoutGroupIdForExercise,
            exercise_group_id: this.state.exerciseGroupId,
          },
          true
        );
        if (res.data.code === 200) {
          await this.setState({
            exerciseGroupName: res.data.data.WorkoutExercises,
          });
          // console.log(
          //   "this is res of pre Workout Group Exercise Name",
          //   res.data.data.WorkoutExercises
          // );
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ displayExerciseLoader: false });
      }
    };

  toggleCheckBox = async () => {
    await this.setState({
      loadRequiredChecked: !this.state.loadRequiredChecked,
    });

    if (this.state.loadRequiredChecked === true) {
      await this.setState({ loadRequiredChecked: 1 });
    } else {
      await this.setState({ loadRequiredChecked: 0, loadData: "" });
    }
  };

  toggleRipsEachSide = async () => {
    await this.setState({
      repsEachside: !this.state.repsEachside,
    });
    if (this.state.repsEachside === true) {
      await this.setState({ repsEachside: 1 });
    } else {
      await this.setState({ repsEachside: 0 });
    }
  };

  annual_training_program_workout_group_exercise = async () => {
    const isValid = this.ValidationOfAddWorkoutGroupExercise();
    if (isValid) {
      this.setState({ workoutExerciseLoader: true });
      try {
        const res = await standardPostApi(
          "annual_training_program_workout_group_exercise",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            annual_training_program_id: this.state.annual_training_program_id,
            training_type: this.state.in_season,
            annual_training_program_week_id: this.state.daysWeekId,
            annual_training_program_week_day_id: this.state.daysId,
            annual_training_program_workout_id: this.state.workoutIdOnClick,
            annual_training_program_workout_group_id:
              this.state.workoutGroupIdForExercise,
            workout_exercise: this.state.exercisePickerId,
            workout_reps: this.state.repsData,
            workout_load: this.state.loadData ? this.state.loadData : 0,
            workout_load_required: this.state.loadRequiredChecked,
            workout_reps_each_side: this.state.repsEachside,
            workout_repetition_type: this.state.repetitionType,
            workout_sets: this.state.setsWorkoutExercise
              ? this.state.setsWorkoutExercise
              : 0,
            workout_rest: this.state.restWorkoutExercise
              ? this.state.restWorkoutExercise
              : 0,
            api_action: "add",
          },
          true
        );
        if (res.data.code === 200) {
          console.log("this is res of workout group exercise ", res.data.data);
          await this.annual_training_program_details();
          this.WorkoutGroups(this.state.listExercise);
          await this.setState({
            exerciseError: " ",
            repsDataError: " ",
            loadDataError: " ",
            repetitionTypeError: " ",
            setsWorkoutExerciseError: " ",
            restWorkoutExerciseError: " ",
            loadRequiredChecked: 0,
            repsEachside: 0,
            exercisePickerName: "",
            repsData: "",
            loadData: "",
            repetitionType: "",
            setsWorkoutExercise: "",
            restWorkoutExercise: "",
            workoutExerciseLoader: false,
          });
          toast.success(res.data.message);
          // console.log("this.state.listExercise", this.state.listExercise);
          // await this.exerciseCount();
        }
      } catch (error) {
        this.setState({ workoutExerciseLoader: false });
        console.log(error);
      }
    }
  };

  ValidationOfAddWorkoutGroupExercise = () => {
    let exerciseError = "";
    let repsDataError = "";
    // let loadDataError = "";
    let repetitionTypeError = "";

    if (!this.state.exercisePickerId) {
      exerciseError = "Please Select Exercise";
      toast.error("Exercise Field can not be empty", {
        autoClose: 2000,
      });
    }

    if (!this.state.repsData) {
      repsDataError = "Reps field is required";
    }

    // if (!this.state.loadData) {
    //   loadDataError = "Load field is required";
    // }

    if (!this.state.repetitionType) {
      repetitionTypeError = "Choose Repetition Type";
    }

    if (
      exerciseError ||
      repsDataError ||
      // loadDataError ||
      repetitionTypeError
    ) {
      this.setState({
        exerciseError,
        repsDataError,
        // loadDataError,
        repetitionTypeError,
      });
      return false;
    } else {
      return true;
    }
  };

  delete_annual_training_program_workout_group_exercise = async () => {
    try {
      const res = await standardPostApi(
        "annual_training_program_workout_group_exercise",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: this.state.annual_training_program_id,
          training_type: this.state.in_season,
          annual_training_program_week_id: this.state.daysWeekId,
          annual_training_program_week_day_id: this.state.daysId,
          annual_training_program_workout_id: this.state.workoutIdOnClick,
          annual_training_program_workout_group_id:
            this.state.workoutGroupIdForExercise,
          annual_training_program_workout_group_exercise_id:
            this.state.workoutGroupExerciseId,
          api_action: "delete",
        },
        true
      );
      if (res.data.code === 200) {
        // console.log(
        //   "this is res of delete workout group exercise",
        //   res.data.data
        // );
        await this.hideWorkoutExerciseModal();
        await this.annual_training_program_details();
        this.WorkoutGroups(this.state.listExercise);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  toggleUpdateLoadRequired = async (item, i) => {
    // console.log("THIS IS ITEM-->", item, "index", i);

    let temp = [...this.state.workout_group_exercise_Array];

    temp[i].workout_load_required =
      item.workout_load_required === "1" ? "0" : "1";
    console.log("temp", temp);
    this.setState({
      workout_group_exercise_Array: [...temp],
    });
  };

  toggleUpdateRepsEachSide = async (item, i) => {
    let temp1 = [...this.state.workout_group_exercise_Array];
    temp1[i].workout_reps_each_side =
      item.workout_reps_each_side === "1" ? "0" : "1";
    console.log("temp1", temp1);
    this.setState({ workout_group_exercise_Array: [...temp1] });
  };

  update_annual_training_program_workout_group_exercise = async (
    item,
    index
  ) => {
    // console.log(
    //   "update icone",
    //   // this.state.workout_group_exercise_Array[index].workout_load_required,
    //   item?.workout_load,
    //   this.state.workout_group_exercise_Array[index].workout_load_required
    // );

    // console.log(
    //   "testing",
    //   this.state.workout_group_exercise_Array[index].workout_load_required == 0
    //     ? 0
    //     : this.state.updateLoadData[index] ?? item?.workout_load
    // );workout_exercise_name

    const workout_exercise_id =
      this.state.workout_group_exercise_Array[index].workout_exercise_name ==
      this.state.updateExerciseField
        ? this.state.updateExercisePickerId
        : item.workout_exercise;

    try {
      const res = await standardPostApi(
        "annual_training_program_workout_group_exercise",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: this.state.annual_training_program_id,
          training_type: this.state.in_season,
          annual_training_program_week_id: this.state.daysWeekId,
          annual_training_program_week_day_id: this.state.daysId,
          annual_training_program_workout_id: this.state.workoutIdOnClick,
          annual_training_program_workout_group_id:
            this.state.workoutGroupIdForExercise,
          annual_training_program_workout_group_exercise_id: item.id,
          // workout_exercise: this.state.updateExercisePickerId,
          workout_exercise: workout_exercise_id,
          workout_reps: this.state.updateRepsData,
          workout_load:
            this.state.workout_group_exercise_Array[index]
              .workout_load_required == 0
              ? "0"
              : this.state.updateLoadData[index] ?? item?.workout_load,

          workout_load_required:
            this.state.workout_group_exercise_Array[index]
              .workout_load_required,
          workout_reps_each_side:
            this.state.workout_group_exercise_Array[index]
              .workout_reps_each_side,
          workout_repetition_type: this.state.updateRepetitionType,
          // workout_sets: this.state.updateSetsWorkoutExercise,
          // workout_rest: this.state.updateRestWorkoutExercise,
          api_action: "update",
        },
        true
      );
      if (res.data.code === 200) {
        console.log("Response of update workout group Exercise", res.data.data);
        await this.annual_training_program_details();
        this.WorkoutGroups(this.state.listExercise);

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // clone Week
  clone_annual_training_program_week = async (item) => {
    try {
      const res = await standardPostApi(
        "clone_annual_training_program_week",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: this.state.annual_training_program_id,
          training_type: this.state.in_season,
          annual_training_program_clone_week_id: item.id,
          annual_training_program_week_start_date:
            this.state.weekCloneData.next_start_date,
          annual_training_program_week_end_date:
            this.state.weekCloneData.next_end_date,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log(
        //   "THIS IS RESPONSE OF clone_annual_training_program_week",
        //   res.data.data
        // );
        await this.annual_training_program_details();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // clone Day
  clone_annual_training_program_day = async (item) => {
    try {
      const res = await standardPostApi(
        "clone_annual_training_program_day",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: this.state.annual_training_program_id,
          training_type: this.state.in_season,
          annual_training_program_week_id: this.state.daysWeekId,
          annual_training_program_clone_day_id: item.id,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log(
        //   "THIS IS RESPONSE OF clone_annual_training_program_day",
        //   res.data.data
        // );
        await this.annual_training_program_details();
        this.weekButton(this.state.dayUpdateState);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  showModal = async (item) => {
    await this.setState({
      show: !this.state.show,
      editWorkoutObject: item,
      descriptionEdit: item.name,
      intensityEdit: item.intensity,
    });
  };

  hideModal = async () => {
    await this.setState({ show: false });
  };

  showExerciseModal = async () => {
    await this.setState({
      selectExerciseModal: !this.state.selectExerciseModal,
    });
  };
  hideExerciseModal = async () => {
    await this.setState({ selectExerciseModal: false });
  };

  showWeekModal = async (item) => {
    // console.log("item model checck", item);
    await this.setState({
      deleteWeekModal: !this.state.deleteWeekModal,
      deleteWeekId: item.id,
      deleteWeekStartDate: item.week_start,
      deleteWeekEndDate: item.week_end,
    });
  };

  hideWeekModal = async () => {
    await this.setState({ deleteWeekModal: false });
  };

  showDeleteDaysModal = async (index) => {
    await this.setState({
      deleteDays: !this.state.deleteDays,
      indexOfDeleteIcon: index,
    });
  };

  hideDeleteDaysModal = async () => {
    await this.setState({ deleteDays: false });
  };

  showWorkoutDeleteButton = async (item) => {
    await this.setState({
      showWorkoutDeleteModal: !this.state.showWorkoutDeleteModal,
      workoutId: item.id,
    });
  };

  hideWorkoutDeleteButton = async () => {
    await this.setState({ showWorkoutDeleteModal: false });
  };

  weekButton = async (item) => {
    this.setState({ showMessage: false, dayLoader: true, workoutLoder: true });
    // console.log("week object ===>", item);
    await this.annual_training_program_details();

    let DAY = [];
    this.state.annualTrainingProgramWeek.map((data) => {
      DAY.push(data);
    });
    // console.log("DAY->", DAY);

    DAY.forEach(async (data) => {
      if (data.id == item.id) {
        await this.setState({
          dayLoader: false,
          workoutLoder: false,
          visibleDays: true,
          dayArray: data.days,
          daysWeekId: item.id,
          weekObject: item,
          weekTopName: item.week_number,
          visibleWorkout: false,
          visibleWorkoutNameTop: false,
          visibleWorkoutGroup: false,
          visibleSuperset: false,
          visibleGreenMessage: false,
          visibleRedMessage: false,
        });
      }
    });
  };

  weekDayButton = async (item, index) => {
    // console.log("After Click DAY Button", item);
    this.setState({ workoutLoder: true });
    await this.annual_training_program_details();

    let WORKOUT = [];
    this.state.annualTrainingProgramWeek.map((data) => {
      data.days.map((data) => {
        WORKOUT.push(data);
      });
    });

    WORKOUT.forEach(async (data) => {
      if (data.id == item.id) {
        await this.setState({
          visibleWorkout: true,
          workoutLoder: false,
          daysId: item.id,
          workout: data.workout,
          dayTopName: item.day_number,
          visibleWorkoutGroup: false,
          visibleSuperset: false,
          visibleWorkoutNameTop: false,
          showMessage: false,
          description: "",
          workoutLocationChange: "",
          intensity: "",
          workoutType: "",
        });
      }
      window.scrollTo({
        top: 80,
        behavior: "smooth",
      });
    });

    return this.pre_add_annual_training_program_workout();
  };

  DaysWorkoutButton = async (item) => {
    console.log("item", item);
    let WORKOUTGROUP = [];
    this.state.annualTrainingProgramWeek.map((data) => {
      data.days.map((data) => {
        data.workout.map((data) => {
          WORKOUTGROUP.push(data);
        });
      });
    });

    WORKOUTGROUP.forEach(async (data) => {
      if (data.id == item.id) {
        await this.setState({
          visibleWorkoutGroup: true,
          visibleWorkoutNameTop: true,
          // visibleSuperset: false,
          workoutIdOnClick: item.id,
          WorkoutNameTopExerciseName: data.name,
          workoutGroupData: data.workout_group,
        });
      }
    });

    // await this.setState({
    //   visibleWorkoutGroup: true,
    //   visibleWorkoutNameTop: true,
    //   workoutIdOnClick: item.id,
    //   WorkoutNameTopExerciseName: item.name,
    // });

    window.scrollTo({
      top: 80,
      behavior: "smooth",
    });
  };

  WorkoutGroups = async (item) => {
    // console.log("group id =====>", item);
    await this.annual_training_program_details();

    let WORKOUTGROUPEXERCISE = [];
    this.state.annualTrainingProgramWeek.map((data) => {
      data.days.map((data) => {
        data.workout.map((data) => {
          data.workout_group.map((data) => {
            WORKOUTGROUPEXERCISE.push(data);
          });
        });
      });
    });

    WORKOUTGROUPEXERCISE.forEach((data) => {
      if (data.id === item.id) {
        this.setState({
          visibleSuperset: true,
          workoutGroupIdForExercise: item.id,
          workoutGroupIdForExerciseObject: item,
          setsWorkoutExercise: item.group_sets ? item.group_sets : "",
          restWorkoutExercise: item.group_rest ? item.group_rest : "",
          workout_group_exercise_Array: data.workout_group_exercise,
          showMessage: true,
          workoutExerciseLoader: false,
        });
        if (
          this.state.workout_group_exercise_Array?.length === 0 &&
          item.group_set_type === "Procedural"
        ) {
          this.setState({
            visibleRedMessage: true,
            warningMessage: "Please add 1 exercise in this exercise group.",
          });
        } else if (
          this.state.workout_group_exercise_Array?.length <= 1 &&
          item.group_set_type === "Super Set"
        ) {
          this.setState({
            visibleRedMessage: true,
            warningMessage: "Please add 2 exercise in this exercise group.",
          });
        } else if (
          this.state.workout_group_exercise_Array?.length <= 2 &&
          item.group_set_type === "Triset"
        ) {
          this.setState({
            visibleRedMessage: true,
            warningMessage: "Please add 3 exercise in this exercise group.",
          });
        } else if (
          this.state.workout_group_exercise_Array?.length <= 3 &&
          item.group_set_type === "Quarter Set"
        ) {
          this.setState({
            visibleRedMessage: true,
            warningMessage: "Please add 4 exercise in this exercise group.",
          });
        } else {
          this.setState({ visibleRedMessage: false, showMessage: true });
        }
      } else {
        // this.setState({ showMessage: false });
      }
    });

    window.scrollTo({
      top: 80,
      behavior: "smooth",
    });
    // await this.exerciseCount();
    await this.pre_annual_training_program_workout_group_exercise();
  };

  setsResetsButton = async () => {
    await this.setState({
      setsResets: true,
      setsTypeError: " ",
      setsGroupError: " ",
      restGroupError: " ",
    });
  };

  hangelExerciseGroup = (e) => {
    this.setState({ setsType: e.target.value });

    if (e.target.value === "procedural") {
      this.setsResetsButtonForProcedural();
    } else if (e.target.value === undefined) {
      this.setsResetsButtonForProcedural();
    } else {
      this.setsResetsButton();
    }
    // console.log("THIS IS PROCEDURAL", e.target.value);
    // console.log("Sets Reset", this.state.setsResets);
  };

  setsResetsButtonForProcedural = async () => {
    await this.setState({
      setsResets: false,
      setsTypeError: " ",
      setsGroupError: " ",
      restGroupError: " ",
    });
  };

  //  date picker

  weekDatePicker = async (endDate) => {
    const startDate = this.props.location.state.start_date;
    const end_Date = new Date(startDate);
    // end_Date.setDate(end_Date.getDate() + 7);
    end_Date.setDate(end_Date.getDate() + 6);
    await this.setState({ endDate: end_Date });
  };

  handleDateChange = async (date, moment) => {
    await this.setState({ date: date, hasSetDate: true });
    const startDate = this.state.date;
    const end_Date = new Date(startDate);
    // end_Date.setDate(end_Date.getDate() + 7);
    end_Date.setDate(end_Date.getDate() + 6);
    await this.setState({ endDate: end_Date });
  };

  toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum / 1000;
  };
  //  end date picker

  showDeleteWorkoutGroup = async (item) => {
    await this.setState({
      deleteWorkoutGroup: !this.state.deleteWorkoutGroup,
      workoutGroupId: item.id,
      // visibleSuperset: false,
      // showMessage: false,
    });
  };

  hidedeleteWorkoutGroup = async () => {
    await this.setState({ deleteWorkoutGroup: false });
  };

  onHandelChange = async (e) => {
    // console.log("THIS IS EVENT-->", e.target.value);
    await this.setState({ exerciseGroupId: e.target.value });
    await this.pre_annual_training_program_workout_group_exercise_With_exercise_id();
  };

  SelectExercisePicker = async (item) => {
    // console.log("SelectExercisePicker =>=>", item);
    await this.setState({
      exercisePickerName: item.exercise,
      exercisePickerId: item.id,
    });
    await this.hideExerciseModal();
  };

  showDeleteWorkoutExerciseModal = async (item) => {
    // console.log("workout group exercise delete modal object", item);
    await this.setState({
      deleteWorkoutGroupExerciseModal:
        !this.state.deleteWorkoutGroupExerciseModal,
      workoutGroupExerciseId: item.id,
    });
  };

  hideWorkoutExerciseModal = async () => {
    await this.setState({ deleteWorkoutGroupExerciseModal: false });
  };

  showUpdateGroupExerciseModal = async (item, i) => {
    console.log("rajjo item", item, "index", i);
    this.setState({ updateExerciseItem: item, updateExerciseIndex: i });

    // console.log("updateExerciseField", this.state.updateExerciseField);
    // let temp = [...this.state.workout_group_exercise_Array];

    // temp[i].workout_exercise_name =
    //   this.state.updateExerciseField ?? item?.workout_exercise_name;
    // console.log("temp+++@++", temp);
    // // this.setState({
    // //   workout_group_exercise_Array: [...temp],
    // // });

    await this.setState({
      updateExerciseGroupModal: !this.state.updateExerciseGroupModal,
    });
  };

  hideUpdateGroupExerciseModal = async () => {
    await this.setState({ updateExerciseGroupModal: false });
  };

  updateSelectExercisePicker = async (item) => {
    console.log("update Green tikk ????_+=>", item);
    // console.log("updateExerciseItem", this.state.updateExerciseItem);
    // console.log("updateExerciseIndex", this.state.updateExerciseIndex);

    await this.annual_training_program_details();
    await this.setState({
      updateExercisePickerId: item.id,
      updateExerciseField: item.exercise,
    });

    let temp = [...this.state.workout_group_exercise_Array];

    temp[this.state.updateExerciseIndex].workout_exercise_name = item.exercise;

    console.log("NEW TEMP-->", temp);

    this.setState({
      workout_group_exercise_Array: [...temp],
    });

    this.showUpdateGroupExerciseModal(
      this.state.updateExerciseItem,
      this.state.updateExerciseIndex
    );
    // await this.hideUpdateGroupExerciseModal();
  };

  updateWorkoutGroupModal = async (item) => {
    console.log("THIS IS UPDATE EXERCISE GROUP ITEM---->", item);
    await this.setState({
      updateWorkoutGroupModal: !this.state.updateWorkoutGroupModal,
      updateWorkoutGroupDetails: item,
      workoutGroupId: item?.id,
      updateDescription: item?.group_name,
      updateSets: item?.group_sets,
      updateRest: item?.group_rest,
      // updateSetsType:item.,
    });

    if (item?.group_set_type === "Procedural") {
      await this.setState({
        hideSetsAndRest: false,
        updateSets: "",
        updateRest: "",
      });
    } else {
      await this.setState({ hideSetsAndRest: true });
    }
  };
  onHandelUpdateChange = async (e) => {
    await this.setState({ [e.target.name]: e.target.value });

    if (this.state.updateSetsType === "procedural") {
      await this.setState({
        hideSetsAndRest: false,
        updateSets: "",
        updateRest: "",
      });
    }
    // else if (this.state.updateSetsType.length === 0) {
    //   await this.setState({ hideSetsAndRest: false });
    // }
    else {
      await this.setState({ hideSetsAndRest: true });
    }
  };

  // onUpdateDescriptionChange = async (e) => {
  //   await this.setState({ [e.target.name]: e.target.value });
  // };

  render() {
    const atpWeeksArray = this.state.annualTrainingProgramWeek;

    const annualPLan = this.props.location.state;

    const workoutEditWindow = this.state.editWorkoutObject;

    const {
      descriptionEdit,
      workoutLocationEdit,
      intensityEdit,
      workoutTypeEdit,
      setsType,
    } = this.state;

    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid pr-0">
              <div className="inner_teamsection ">
                <div className="in_Session_ol">
                  <ol className="breadcrumb ">
                    <li className="breadcrumb-item">
                      <Link
                        to={{
                          pathname: `/annualprograminner/${"in_season"}/${"off_season"}/${"pre_season"}/${"transition"}`,
                          state: annualPLan,
                        }}
                      >
                        {this.state.annualTrainingProgramWeekName}
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {this.state.in_season === "in_season" && "In Season"}
                      {this.state.in_season === "off_season" && "Off Season"}
                      {this.state.in_season === "pre_season" && "Pre Season"}
                      {this.state.in_season === "transition" && "Transition"}
                    </li>
                    <li className="breadcrumb-item active">
                      {this.state.weekTopName}
                    </li>

                    {this.state.visibleDays ? (
                      <li className="breadcrumb-item active">
                        {this.state.dayTopName}
                      </li>
                    ) : null}

                    {this.state.visibleWorkoutNameTop ? (
                      <li className="breadcrumb-item active">
                        {this.state.WorkoutNameTopExerciseName}
                      </li>
                    ) : null}
                  </ol>
                </div>

                <div className="row">
                  {this.state.visibleWorkoutNameTop ? (
                    <WorkoutNameTop
                      WorkoutNameTopExerciseName={
                        this.state.WorkoutNameTopExerciseName
                      }
                    />
                  ) : null}
                </div>

                {this.state.showMessage && this.state.visibleRedMessage ? (
                  <div className="row">
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                      style={{
                        margin: "0 35%",
                        color: "rgb(255,0,0)",
                        fontSize: "20px",
                      }}
                    >
                      {this.state.warningMessage}
                    </i>
                  </div>
                ) : this.state.showMessage &&
                  this.state.visibleRedMessage === false ? (
                  <div className="row">
                    <i
                      className="fa fa-check-circle"
                      aria-hidden="true"
                      style={{
                        margin: "0 21%",
                        color: "green",
                        fontSize: "20px",
                      }}
                    >
                      {" "}
                      You have added the required number of exercises in this
                      group. You can not add more to it.
                    </i>
                  </div>
                ) : null}

                <div className="row">
                  {this.state.visibleWorkoutGroup ? (
                    <WorkoutGroups
                      WorkoutGroupsShow={(item) => {
                        this.setState({ listExercise: item });
                        this.WorkoutGroups(item);
                      }}
                      workoutGroupData={this.state.workoutGroupData}
                      setsResetsState={this.state.setsResets}
                      inputShow={() => this.setsResetsButton()}
                      setsResetsButtonForProcedural={() =>
                        this.setsResetsButtonForProcedural()
                      }
                      annual_training_program_workout_group={() =>
                        this.annual_training_program_workout_group()
                      }
                      onChange={(e) => this.onChange(e)}
                      value={(this.state.descriptionGroup, this.state.setsType)}
                      setsGroup={this.state.setsGroup}
                      restGroup={this.state.restGroup}
                      onKeyPress={(event) => this.isInputNumber(event)}
                      atpWeeksArray={atpWeeksArray}
                      workoutGroupArray={this.state.workoutGroupArray}
                      visiblePreWorkout_Group={
                        this.state.visiblePreWorkout_Group
                      }
                      showDeleteWorkoutGroup={(item) =>
                        this.showDeleteWorkoutGroup(item)
                      }
                      descriptionGroupError={this.state.descriptionGroupError}
                      setsTypeError={this.state.setsTypeError}
                      setsGroupError={this.state.setsGroupError}
                      restGroupError={this.state.restGroupError}
                      deleteWorkoutGroupArray={
                        this.state.deleteWorkoutGroupArray
                      }
                      visibleAddWorkout_Group={
                        this.state.visibleAddWorkout_Group
                      }
                      hangelExerciseGroup={(e) => this.hangelExerciseGroup(e)}
                      setsType={this.state.setsType}
                      descriptionGroup={this.state.descriptionGroup}
                      cleanRestGroup={this.state.restGroup}
                      resetSetsType={this.state.setsType}
                      addNewWorkoutGroup={this.state.addNewWorkoutGroup}
                      updateWorkoutGroupModal={this.updateWorkoutGroupModal}
                    />
                  ) : null}

                  {this.state.visibleSuperset ? (
                    <SuperSet
                      showExerciseModal={() => this.showExerciseModal()}
                      workoutGroupIdForExerciseObject={
                        this.state.workoutGroupIdForExerciseObject
                      }
                      annual_training_program_workout_group_exercise={() =>
                        this.annual_training_program_workout_group_exercise()
                      }
                      exercisePickerName={this.state.exercisePickerName}
                      onChange={(e) => this.onChange(e)}
                      value={
                        (this.state.repsData,
                        this.state.loadData,
                        this.state.repetitionType,
                        this.state.setsWorkoutExercise,
                        this.state.restWorkoutExercise,
                        // this.state.updateExerciseField,
                        this.state.updateRepsData,
                        // this.state.updateLoadData,
                        this.state.updateRepetitionType,
                        this.state.updateSetsWorkoutExercise,
                        this.state.updateRestWorkoutExercise)
                      }
                      updateLoadData={this.state.updateLoadData}
                      atpWeeksArray={atpWeeksArray}
                      showDeleteWorkoutExerciseModal={(item) =>
                        this.showDeleteWorkoutExerciseModal(item)
                      }
                      updateExerciseField={this.state.updateExerciseField}
                      exerciseError={this.state.exerciseError}
                      repsDataError={this.state.repsDataError}
                      loadDataError={this.state.loadDataError}
                      repetitionTypeError={this.state.repetitionTypeError}
                      setsWorkoutExerciseError={
                        this.state.setsWorkoutExerciseError
                      }
                      restWorkoutExerciseError={
                        this.state.restWorkoutExerciseError
                      }
                      onKeyPress={(event) => this.isInputNumber(event)}
                      showUpdateGroupExerciseModal={
                        this.showUpdateGroupExerciseModal
                      }
                      workout_group_exercise_Array={
                        this.state.workout_group_exercise_Array
                      }
                      update_annual_training_program_workout_group_exercise={
                        this
                          .update_annual_training_program_workout_group_exercise
                      }
                      loadRequiredChecked={this.state.loadRequiredChecked}
                      toggleCb={() => this.toggleCheckBox()}
                      repsEachside={this.state.repsEachside}
                      toggleRips={() => this.toggleRipsEachSide()}
                      toggleUpdateLoadRequired={this.toggleUpdateLoadRequired}
                      toggleUpdateRepsEachSide={this.toggleUpdateRepsEachSide}
                      resertRepsData={this.state.repsData}
                      resertLoadData={this.state.loadData}
                      resetRepetitionType={this.state.repetitionType}
                      workoutExerciseLoader={this.state.workoutExerciseLoader}
                      handleUploadLoadDataName={this.handleUploadLoadDataName}
                      handelUpdateRepsData={this.handelUpdateRepsData}
                      setsWorkoutExercise={this.state.setsWorkoutExercise}
                      restWorkoutExercise={this.state.restWorkoutExercise}
                    />
                  ) : null}
                </div>

                <div className="row">
                  {/* this is week */}
                  <div className="col-lg-4">
                    <div className="pl-3 react_right_line">
                      <div className="week_details">
                        <div className="week_heading">
                          week &nbsp;{" "}
                          <i
                            className="fa fa-arrow-circle-down"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div
                          className="form-inline row"
                          style={{ display: "flex" }}
                        >
                          <div className="form-group col-lg-6">
                            <label htmlFor="">start date</label>

                            <DatePicker
                              selected={this.state.date}
                              onChange={this.handleDateChange}
                              name="startDate"
                              className="form-control"
                              dateFormat="dd-MM-yyyy"
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                            />

                            {/* <button
                              type="button"
                              className="btn btn-default"
                              onClick={() => this.weekDatePicker()}
                            >
                              Update Period Dates
                            </button> */}
                            {/* <img
                              className="celender_img_atp"
                              src={Calander}
                              alt={Calander}
                            /> */}
                          </div>
                          <div className="form-group col-lg-6">
                            <label htmlFor="">end date</label>

                            <DatePicker
                              selected={this.state.endDate}
                              name="endDate"
                              className="form-control"
                              dateFormat="dd-MM-yyyy"
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              disabled
                            />
                            {/* <button
                              type="button"
                              className="btn btn-default"
                              onClick={() =>
                                this.annual_training_program_week()
                              }
                            >
                              Add New Week
                            </button> */}
                          </div>
                        </div>
                        <div>
                          <button
                            style={{
                              // marginBottom: "10px",
                              padding: "2%",
                              marginTop: "5%",
                              borderRadius: "6px",
                              paddingRight: "4%",
                              paddingLeft: "4%",
                            }}
                            type="button"
                            className=" btn-md  btn_react_add_new_workout"
                            onClick={() => this.annual_training_program_week()}
                          >
                            Add New Week
                          </button>
                        </div>
                        <div className="home_sc workout_data_week_day">
                          {this.state.weekLoader !== false ? (
                            <i
                              className="fa fa-spinner fa-spin fa-3x fa-fw"
                              // className="fa fa-spinner fa-pulse fa-3x fa-fw"
                              style={{
                                color: "var(--appBlue2)",
                                fontSize: "60px",
                                marginTop: "50px",
                              }}
                            />
                          ) : (
                            <div>
                              {atpWeeksArray &&
                                atpWeeksArray.map((item) => {
                                  return (
                                    <div
                                      className="home_sc_inner text-center "
                                      key={item.id}
                                    >
                                      <button
                                        className="week_button"
                                        onClick={() => {
                                          this.setState({
                                            dayUpdateState: item,
                                          });
                                          this.weekButton(item);
                                        }}
                                      >
                                        {item.week_number}
                                      </button>
                                      <div
                                        className="d-flex justify-content-between "
                                        style={{
                                          display: "flex",
                                          flexWrap: "wrap",
                                          alignItems: "center",
                                        }}
                                      >
                                        <button
                                          type="button"
                                          className="btn week_btn"
                                          onClick={() =>
                                            this.clone_annual_training_program_week(
                                              item
                                            )
                                          }
                                        >
                                          <i className="fa fa-clone"></i>
                                        </button>
                                        <button
                                          type="button"
                                          className="btn week_btn"
                                          onClick={() =>
                                            this.showWeekModal(item)
                                          }
                                        >
                                          <i className="fa fa-trash"></i>
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* this is day  */}
                  {this.state.visibleDays ? (
                    <WeekDays
                      weekDayButton={(item, index) => {
                        this.setState({ WorkoutUpdateState: item });
                        this.weekDayButton(item, index);
                      }}
                      dayArray={this.state.dayArray}
                      annual_training_program_week_days={(index) =>
                        this.annual_training_program_week_days(index)
                      }
                      deleteDaysModal={(index) =>
                        this.showDeleteDaysModal(index)
                      }
                      clone_annual_training_program_day={(item) =>
                        this.clone_annual_training_program_day(item)
                      }
                      dayLoader={this.state.dayLoader}
                    />
                  ) : null}

                  {/* this is workout */}
                  {this.state.visibleWorkout ? (
                    <DaysWorkout
                      DaysWorkoutButton={(item) => {
                        this.setState({ GroupItem: item });
                        this.DaysWorkoutButton(item);
                      }}
                      showModal={(item) => this.showModal(item)}
                      workoutLocation={this.state.workoutLocation}
                      WorkoutType={this.state.WorkoutType}
                      addWorkout={() => this.annual_training_program_workout()}
                      onChange={(e) => this.onChange(e)}
                      value={
                        (this.state.description,
                        this.state.workoutLocationChange,
                        this.state.intensity,
                        this.state.workoutType)
                      }
                      onKeyPress={(event) => this.isInputNumber(event)}
                      workout={this.state.workout}
                      descriptionError={this.state.descriptionError}
                      workoutLocationError={this.state.workoutLocationError}
                      intensityError={this.state.intensityError}
                      workoutTypeError={this.state.workoutTypeError}
                      workoutDeleteModal={(item) =>
                        this.showWorkoutDeleteButton(item)
                      }
                      annualTrainingProgramWeek={
                        this.state.annualTrainingProgramWeek
                      }
                      descriptionClean={this.state.description}
                      workoutLocationChangeClen={
                        this.state.workoutLocationChange
                      }
                      intensityClean={this.state.intensity}
                      workoutTypeClean={this.state.workoutType}
                      workoutLoder={this.state.workoutLoder}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
        {/* this is a edit Workout Window Modal */}
        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          // centered
          size="lg"
        >
          <Modal.Body>
            <div className="modal-header">
              <div className="col-xs-12" style={{ color: "#555" }}>
                <h2>Workout Edit Window</h2>
              </div>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.hideModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form action="#" method="">
                <div className="form-group workout_modal_label">
                  <label htmlFor="Description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={(descriptionEdit, workoutEditWindow.name)}
                    name="descriptionEdit"
                    onChange={(e) => this.onChange(e)}
                  ></input>
                  <p className="react_validation">
                    {this.state.descriptionEditError}
                  </p>
                </div>

                <div className="form-group workout_modal_label">
                  <label htmlFor="WorkoutLocationId">Workout Location</label>
                  <select
                    className="form-control"
                    name="workoutLocationEdit"
                    value={workoutLocationEdit}
                    onChange={(e) => this.onChange(e)}
                  >
                    <option value="">Select Workout Location</option>
                    <option value="" disabled>
                      Currently your Workout Location is{" "}
                      {workoutEditWindow.location}
                    </option>

                    {this.state.workoutLocation &&
                      this.state.workoutLocation.map((data) => {
                        return (
                          <option value={data.value} key={data.id}>
                            {data.label}
                          </option>
                        );
                      })}
                  </select>
                  <p className="react_validation">
                    {this.state.workoutLocationEditError}
                  </p>
                </div>

                <div className="form-group workout_modal_label">
                  <label htmlFor="Intensity">Intensity</label>{" "}
                  <input
                    type="text"
                    className="form-control"
                    name="intensityEdit"
                    defaultValue={(intensityEdit, workoutEditWindow.intensity)}
                    onChange={(e) => this.onChange(e)}
                    onKeyPress={this.isInputNumber}
                    maxLength={4}
                  ></input>
                  <p className="react_validation">
                    {this.state.intensityEditError}
                  </p>
                </div>

                <div className="form-group workout_modal_label">
                  <label htmlFor="WorkoutTypeId">Workout Type</label>
                  <select
                    className="form-control"
                    name="workoutTypeEdit"
                    value={workoutTypeEdit}
                    onChange={(e) => this.onChange(e)}
                  >
                    <option value="">Select Workout Type</option>
                    <option value="" disabled>
                      Currently your Workout Type is {workoutEditWindow.type}
                    </option>

                    {this.state.WorkoutType &&
                      this.state.WorkoutType.map((item) => {
                        return (
                          <option value={item.value} key={item.id}>
                            {item.label}
                          </option>
                        );
                      })}
                  </select>
                  <p className="react_validation">
                    {this.state.workoutTypeEditError}
                  </p>
                </div>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="Model_btn "
              data-dismiss="modal"
              onClick={() => this.update_annual_training_program_workout()}
            >
              Save
            </button>
          </Modal.Footer>
        </Modal>

        {/* super set exercise Modal  */}

        <SupersetExerciseModal
          show={this.state.selectExerciseModal}
          onHide={this.hideExerciseModal}
          preWorkoutGroupExercise={this.state.preWorkoutGroupExercise}
          exerciseGroupName={this.state.exerciseGroupName}
          SelectExercisePicker={(item) => this.SelectExercisePicker(item)}
          onHandelChange={(e) => this.onHandelChange(e)}
          exerciseGroupId={this.state.exerciseGroupId}
          displayExerciseLoader={this.state.displayExerciseLoader}
        />

        {/* update Workout Group Exercise */}
        <UpdateWorkoutGroupExerciseModal
          show={this.state.updateExerciseGroupModal}
          onHide={this.hideUpdateGroupExerciseModal}
          preWorkoutGroupExercise={this.state.preWorkoutGroupExercise}
          exerciseGroupName={this.state.exerciseGroupName}
          updateSelectExercisePicker={(item) =>
            this.updateSelectExercisePicker(item)
          }
          onHandelChange={(e) => this.onHandelChange(e)}
          exerciseGroupId={this.state.exerciseGroupId}
          displayExerciseLoader={this.state.displayExerciseLoader}
        />

        {/* delete Week Modal */}

        <DeleteWeekModal
          show={this.state.deleteWeekModal}
          onHide={this.hideWeekModal}
          delete_annual_training_program_week={() =>
            this.delete_annual_training_program_week()
          }
        />

        {/* delete Day modal */}

        <DeleteDayModal
          show={this.state.deleteDays}
          onHide={this.hideDeleteDaysModal}
          delete_annual_training_program_week_days={(index) =>
            this.delete_annual_training_program_week_days(index)
          }
          indexOfDeleteIcon={this.state.indexOfDeleteIcon}
        />

        {/* this is workout delete modal */}

        <DeleteWorkoutModal
          show={this.state.showWorkoutDeleteModal}
          onHide={this.hideWorkoutDeleteButton}
          delete_annual_training_program_workout={() =>
            this.delete_annual_training_program_workout()
          }
        />

        {/* this is delete workout group modal */}
        <DeleteWorkoutGroupModal
          show={this.state.deleteWorkoutGroup}
          onHide={this.hidedeleteWorkoutGroup}
          delete_annual_training_program_workout_group={() =>
            this.delete_annual_training_program_workout_group()
          }
        />

        {/* this is delete workout group exercise modal */}
        <DeleteWorkoutGroupExerciseModal
          show={this.state.deleteWorkoutGroupExerciseModal}
          onHide={() => this.hideWorkoutExerciseModal()}
          delete_annual_training_program_workout_group_exercise={() =>
            this.delete_annual_training_program_workout_group_exercise()
          }
        />

        <UpdateWorkoutGroupModal
          state={this.state}
          onHide={this.updateWorkoutGroupModal}
          onHandelChange={(e) => this.onHandelUpdateChange(e)}
          updateDescription={this.state.updateDescription}
          updateSetsType={this.state.updateSetsType}
          hideSetsAndRest={this.state.hideSetsAndRest}
          updateSets={this.state.updateSets}
          updateRest={this.state.updateRest}
          onKeyPress={(event) => this.isInputNumber(event)}
          update_annual_training_program_workout_group={() =>
            this.update_annual_training_program_workout_group()
          }
          onChange={(e) => this.onChange(e)}
        />
      </div>
    );
  }
}

export default AnnualInSession;
