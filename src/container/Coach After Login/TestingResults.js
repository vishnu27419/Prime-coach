import React, { useState } from "react";
import "../Coach After Login/TestingResults.css";
import CoachHeader from "../PublicLayout/CoachHeader";
import Footer from "../PublicLayout/Footer";
import { Link } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
// import CreateExerciseModal from "../../component/TestingResults/CreateExerciseModal";
import EditExerciseModal from "../../component/TestingResults/EditExerciseModal";
import { standardPostApi } from "../API/ApiWrapper";
import { toast } from "react-toastify";
import DeleteTestingProtocolModal from "../../component/TestingResults/DeleteTestingProtocolModal";
import Checkbox from "../../component/Checkbox/Checkbox";
import Loader from "../Loader/LoaderWrapper";
import { errorToast, successToast } from "utils/toastMessage";

class TestingResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      show: false,
      editShow: false,
      ShowAllTestingProtocol: [],
      testingProtocol: "",
      testing_protocol_id: "",
      deleteTestingProtocolModal: false,
      testingProtocolName: "",
      exerciseName: "",
      units: "",
      smaller_better: 0,
      inputList: [],
      CreateTestingProtocolError: "",
      testing_protocol_exercises: [],
      testing_protocol_name: "",
      editTestingName: "",
      editTestingExercise: "",
      editTestingUnits: "",
      editNewTestingExercise: "",
      editNewTestingUnits: "",
      testingProtocolDetails: [],
      editInputList: [],
      itemForUpdateSaveButton: "",
      editTestingProtocolDeleteEvent: [],
      editTestingProtocolDeleteEventIndex: "",
      user_testing_protocol_result: [],
      teamTestingShow: false,
      exercise_id: "",
      user_id: "",
      user_exercise: [],
      athlete_exercise: [],
      exercise_object: {},
      athlete_result_for_modal: "",
      newTestingResult: "",
      resultModalError: "",
      testingProtocolExercises: [],
      testingProtocoValue: "",
      tableHead: null,
      selectedTestingProtocol: "",
      createTestingProtocolCheckbox: 0,
      exerciseNameParagraphError: "",
      UnitsParagraphError: "",
      testingProtocolPreName: "",
      editTestingProtocolCheckbox: 0,
      noProtocolAvalabe: "",
      onHandelWait: true,
      buttonPreVisible: false,
      buttonNextVisible: false,
      preEnable: false,
      nextEnable: false,
      resultCount: 0,
      currentPage: 1,
      teamId: this.props.match.params.id,
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // console.log(this.state);
  }

  onHandel = (e) => {
    // console.log("rajjo rani", e.target.value);

    this.setState({ testingProtocoValue: e.target.value, onHandelWait: false });

    this.testing_protocol_details(e.target.value);

    this.state.ShowAllTestingProtocol.map((item) => {
      if (e.target.value == item.id) {
        this.setState({ testingProtocol: item.label });
      }
    });
  };

  ShowCreateModal = async () => {
    await this.setState({ show: !this.state.show });
  };

  hideCreateModal = async () => {
    await this.setState({ show: false });
  };

  showEditModal = async () => {
    await this.setState({ editShow: !this.state.editShow });
  };

  hideEditModal = async () => {
    await this.setState({ editShow: false });
  };

  showDeleteTestingProtocolModal = async () => {
    await this.setState({
      deleteTestingProtocolModal: !this.state.deleteTestingProtocolModal,
    });
  };

  hideDeleteTestingProtocolModal = async () => {
    await this.setState({
      deleteTestingProtocolModal: false,
    });
  };

  showTeamTestingModal = async (item, data) => {
    await this.setState({
      teamTestingShow: !this.state.teamTestingShow,
      exercise_id: item.id,
      user_id: data.id,
      user_exercise: data.exercise,
      athlete_exercise: data.exercise,
      exercise_object: item,
      athlete_result_for_modal: item.result,
    });
  };

  hideTeamTestingModal = async (item) => {
    await this.setState({ teamTestingShow: false });
  };

  componentDidMount() {
    this.show_all_testing_protocol();
    // this.testing_protocol_details();
  }

  show_all_testing_protocol = async () => {
    try {
      const res = await standardPostApi(
        "show_all_testing_protocol",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team_id: this.props.match.params.id,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("RESPONSE OF show_all_testing_protocol", res.data.data);

        const SelectedPicker = res.data?.data?.pickerArray[0];

        if (res.data?.data?.pickerArray?.length === 0) {
          this.setState({
            loading: false,
            testingProtocoValue: "",
            ShowAllTestingProtocol: [],
            testingProtocolPreName: "",
            noProtocolAvalabe: "No testing protocol available",
          });
        } else {
          this.setState({
            testingProtocoValue: SelectedPicker?.id,
            ShowAllTestingProtocol: res.data?.data?.pickerArray,
            loading: false,
            testingProtocolPreName: SelectedPicker?.label,
            noProtocolAvalabe: "",
          });
        }

        res.data?.data?.pickerArray.length !== 0 &&
          this.testingProtocolResultCount(SelectedPicker?.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  testingProtocolResultCount = async (protocolId) => {
    try {
      const res = await standardPostApi(
        "testing_protocol_resultset_count",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          testing_protocol_id: protocolId,
          team_id: this.state.teamId,
        },
        true
      );

      if (res.data.code === 200) {
        // console.log("RESPONSE OF RESULT COUNT", res.data.data.resultset_count);

        if (res.data.data.resultset_count === 0) {
          this.createUpdateTestingProtocolResultset(protocolId, "callMessage");
        } else {
          this.setState({ resultCount: res.data?.data?.resultset_count });
        }
        this.disableButton();
        // this.TestingProtocolDetails(protocolId, this.state.currentPage);
        this.testing_protocol_details(protocolId, this.state.currentPage);
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  createUpdateTestingProtocolResultset = async (protocolId, message) => {
    try {
      const res = await standardPostApi(
        "create_update_testing_protocol_resultset",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          testing_protocol_id: protocolId,
          team_id: this.state.teamId,
        },
        true
      );
      if (res.data.code === 200) {
        console.log("Response Of Create Result set", res.data.data);

        this.setState({
          resultCount: res.data?.data?.resultset_count,
          currentPage: res.data?.data?.resultset_count,
          toggleCreateModal: false,
        });
        this.disableButton();
        this.TestingProtocolDetails(protocolId, this.state.currentPage);
        if (message === "callMessage") {
        } else {
          successToast(res.data.message);
        }
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  testing_protocol_details = async (id, count) => {
    // console.log("this is ", this.state.testingProtocoValue);
    // console.log("This is ID -->", id);
    try {
      const res = await standardPostApi(
        "testing_protocol_details",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          testing_protocol_id: id,
          team_id: this.props.match.params.id,
          access_user_id: this.props.match.params.playerId,
          resultset_no: count,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("RESPONSE OF testing_protocol_details-->", res.data.data);

        // const head = res.data.data.testing_protocol_exercises;

        res.data.data.testing_protocol_exercises.map((item) => {
          this.setState({ tableHead: item.exercise });
        });

        await this.setState({
          testing_protocol_id: id,
          testing_protocol_exercises: res.data.data.testing_protocol_exercises,
          testing_protocol_name: res.data.data.testing_protocol,
          testingProtocolDetails: res.data.data,
          user_testing_protocol_result:
            res.data.data.user_testing_protocol_result,
          onHandelWait: true,
        });
      }
    } catch (error) {
      this.setState({ onHandelWait: false });
      console.log(error);
    }
  };

  deleteTestingProtocol = async () => {
    try {
      const res = await standardPostApi(
        "delete_testing_protocol",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          testing_protocol_id: this.state.testing_protocol_id,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("this is res of delete protocol", res);
        await this.setState({
          testingProtocol: this.state.testingProtocolPreName,
        });
        toast.success(res.data.message);
        this.hideDeleteTestingProtocolModal();
        await this.show_all_testing_protocol();
      }
    } catch (error) {
      console.log(error);
    }
  };

  toggleCb = async () => {
    await this.setState({
      createTestingProtocolCheckbox: !this.state.createTestingProtocolCheckbox,
    });

    if (this.state.createTestingProtocolCheckbox === true) {
      this.setState({ createTestingProtocolCheckbox: 1 });
    } else if (this.state.createTestingProtocolCheckbox === false) {
      this.setState({ createTestingProtocolCheckbox: 0 });
    }
  };

  addToTestingProtocolExercises = async () => {
    const isValid = this.addToTestingProtocolExercisesValidation();
    if (isValid) {
      const {
        inputList,
        exerciseName,
        units,
        // smaller_better,
        createTestingProtocolCheckbox,
      } = this.state;

      inputList.push({
        exercise: exerciseName,
        units: units,
        smaller_better: createTestingProtocolCheckbox,
      });
      await this.setState({
        inputList,
        exerciseName: "",
        units: "",
        createTestingProtocolCheckbox: 0,
        exerciseNameParagraphError: "",
        UnitsParagraphError: "",
      });
    }
  };

  addToTestingProtocolExercisesValidation = () => {
    let exerciseNameParagraphError = "";
    let UnitsParagraphError = "";

    if (!this.state.exerciseName) {
      exerciseNameParagraphError = "Exercise field is required";
    }
    if (!this.state.units) {
      UnitsParagraphError = "Units field is required";
    }

    if (exerciseNameParagraphError || UnitsParagraphError) {
      this.setState({
        exerciseNameParagraphError,
        UnitsParagraphError,
      });
      return false;
    } else {
      return true;
    }
  };

  // addToTestingProtocolExercisesNewButton = async (item) => {
  //   const { inputList, exerciseName, units, smaller_better } = this.state;

  //   const exercise = exerciseName;
  //   const unit = units;

  //   inputList.push({
  //     exercise: exercise ? exercise : item.exercise,
  //     units: unit ? unit : item.units,
  //     smaller_better: smaller_better,
  //   });

  //   await this.setState({
  //     inputList,
  //     exerciseName: "",
  //     units: "",
  //     smaller_better: "",
  //   });
  //   console.log("This is Pre Input List", inputList);
  //   // console.log("inputList", this.state.inputList);
  // };

  deleteEvent = (index) => {
    const copyPostArray = Object.assign([], this.state.inputList);
    copyPostArray.splice(index, 1);
    this.setState({
      inputList: copyPostArray,
    });
  };

  createTestingProtocol = async () => {
    const { inputList } = this.state;

    const inputArray = inputList.map((data) => {
      return {
        exercise: data.exercise,
        units: data.units,
        smaller_better: data.smaller_better,
      };
    });
    const isValid = this.createTestingProtocolValidation();
    if (isValid) {
      try {
        const res = await standardPostApi(
          "create_testing_protocol",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            testing_protocol: this.state.testingProtocolName,
            testing_protocol_exercise: JSON.stringify(inputArray),
          },
          true
        );
        if (res.data.code === 200) {
          // console.log("Response of create_testing_protocol->", res.data.data);
          toast.success(res.data.message);
          await this.setState({
            show: false,
            testingProtocolName: "",
            inputList: [],
          });
          await this.show_all_testing_protocol();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  createTestingProtocolValidation = () => {
    let CreateTestingProtocolError = "";

    if (!this.state.testingProtocolName) {
      CreateTestingProtocolError = toast.error("Name Field is required.");
    }
    if (CreateTestingProtocolError) {
      this.setState({ CreateTestingProtocolError });
      return false;
    } else {
      return true;
    }
  };

  UpdateTestingProtocalExercise = async (item) => {
    const testingProtocolId = this.state.testing_protocol_id;

    const testing_protocol_name =
      this.state.testingProtocolDetails.testing_protocol;

    const testing_protocol_exercise =
      this.state.testingProtocolDetails.testing_protocol_exercises;

    let RESULT = [];
    testing_protocol_exercise.map((data) => {
      let EXERCISE = this.state.editTestingExercise
        ? this.state.editTestingExercise
        : item.exercise;

      let UNITS = this.state.editTestingUnits
        ? this.state.editTestingUnits
        : item.units;

      RESULT.push({
        // id: data.id,
        exercise: `${item.id === data.id ? EXERCISE : data.exercise}`,
        units: `${item.id === data.id ? UNITS : data.units}`,
        smaller_better: `${
          item.id === data.id ? data.smaller_better : data.smaller_better
        }`,
      });
    });

    let finalArray = RESULT.concat(this.state.editInputList);

    try {
      const res = await standardPostApi(
        "update_testing_protocol",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          testing_protocol_id: testingProtocolId,
          testing_protocol_name: this.state.editTestingName
            ? this.state.editTestingName
            : testing_protocol_name,
          testing_protocol_exercise: JSON.stringify(finalArray),
        },
        true
      );

      if (res.data.code === 200) {
        await this.setState({
          updateEditExerciseList: res.data.data.testing_protocol_exercises,
          // exerciseList: false,
          // newExerciseList: true,
        });
        // console.log("RESPONSE OF UPDATE TESTING PROTOCOL", res.data.data);
        toast.success(res.data.message);
        // await this.show_all_testing_protocol();
        // await this.hideEditModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  UpdateTestingProtocalExercisOnClickSaveButton = async (item) => {
    const testingProtocolId = this.state.testing_protocol_id;
    const testing_protocol_name =
      this.state.testingProtocolDetails.testing_protocol;
    const testing_protocol_exercise =
      this.state.testingProtocolDetails.testing_protocol_exercises;
    let RESULT = [];
    testing_protocol_exercise.map((data) => {
      let EXERCISE = this.state.editTestingExercise
        ? this.state.editTestingExercise
        : item.exercise;
      let UNITS = this.state.editTestingUnits
        ? this.state.editTestingUnits
        : item.units;
      RESULT.push({
        // id: data.id,
        exercise: `${item.id === data.id ? EXERCISE : data.exercise}`,
        units: `${item.id === data.id ? UNITS : data.units}`,
        smaller_better: `${
          item.id === data.id ? data.smaller_better : data.smaller_better
        }`,
      });
    });
    let finalArray = RESULT.concat(this.state.editInputList);
    try {
      const res = await standardPostApi(
        "update_testing_protocol",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          testing_protocol_id: testingProtocolId,
          testing_protocol_name: this.state.editTestingName
            ? this.state.editTestingName
            : testing_protocol_name,
          testing_protocol_exercise: JSON.stringify(finalArray),
        },
        true
      );
      if (res.data.code === 200) {
        await this.setState({
          updateEditExerciseList: res.data.data.testing_protocol_exercises,
          testingProtocol: this.state.testingProtocolPreName,
          editInputList: [],
          // exerciseList: false,
          // newExerciseList: true,
        });
        // console.log("RESPONSE OF UPDATE TESTING PROTOCOL", res.data.data);
        await this.show_all_testing_protocol();
        toast.success(res.data.message);
        await this.hideEditModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  toggleEditCb = async () => {
    await this.setState({
      editTestingProtocolCheckbox: !this.state.editTestingProtocolCheckbox,
    });

    if (this.state.editTestingProtocolCheckbox === true) {
      this.setState({ editTestingProtocolCheckbox: 1 });
    } else if (this.state.editTestingProtocolCheckbox === false) {
      this.setState({ editTestingProtocolCheckbox: 0 });
    }
    console.log(
      "THis si Check Box Respone->",
      this.state.editTestingProtocolCheckbox
    );
  };

  addToUpdateTestingProtocolExercise = async () => {
    const isValid = this.addToUpdateTestingProtocolExerciseValidation();
    if (isValid) {
      const {
        editInputList,
        editNewTestingExercise,
        editNewTestingUnits,
        smaller_better,
        editTestingProtocolCheckbox,
      } = this.state;

      editInputList.push({
        exercise: editNewTestingExercise,
        units: editNewTestingUnits,
        smaller_better: editTestingProtocolCheckbox,
      });
      await this.setState({
        editInputList,
        editNewTestingExercise: " ",
        editNewTestingUnits: " ",
        editTestingProtocolCheckbox: 0,
      });
    }
  };

  addToUpdateTestingProtocolExerciseValidation = () => {
    let editNewTestingExerciseError = "";
    let editNewTestingUnitsError = "";

    if (!this.state.editNewTestingExercise) {
      editNewTestingExerciseError = toast.error(
        "Exercise field must not be empty"
      );
    }

    if (!this.state.editNewTestingUnits) {
      editNewTestingUnitsError = toast.error("Units field must not be empty");
    }

    if (editNewTestingExerciseError || editNewTestingUnitsError) {
      this.setState({ editNewTestingExerciseError, editNewTestingUnitsError });
      return false;
    } else {
      return true;
    }
  };

  editDeleteEvent = async (item, index) => {
    const testingProtocolId = this.state.testing_protocol_id;
    const testing_protocol_name =
      this.state.testingProtocolDetails.testing_protocol;
    const testing_protocol_exercise =
      this.state.testingProtocolDetails.testing_protocol_exercises;
    let RESULT = [];
    testing_protocol_exercise.map((data) => {
      let EXERCISE = this.state.editTestingExercise
        ? this.state.editTestingExercise
        : item.exercise;
      let UNITS = this.state.editTestingUnits
        ? this.state.editTestingUnits
        : item.units;
      RESULT.push({
        exercise: `${item.id === data.id ? EXERCISE : data.exercise}`,
        units: `${item.id === data.id ? UNITS : data.units}`,
        smaller_better: `${
          item.id === data.id ? data.smaller_better : data.smaller_better
        }`,
      });
    });
    let finalArray = RESULT.concat(this.state.editInputList);

    finalArray.splice(index, 1);

    try {
      const res = await standardPostApi(
        "update_testing_protocol",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          testing_protocol_id: testingProtocolId,
          testing_protocol_name: this.state.editTestingName
            ? this.state.editTestingName
            : testing_protocol_name,
          testing_protocol_exercise: JSON.stringify(finalArray),
        },
        true
      );

      if (res.data.code === 200) {
        await this.setState({
          updateEditExerciseList: res.data.data.testing_protocol_exercises,
        });
        // console.log("RESPONSE OF UPDATE TESTING PROTOCOL", res.data.data);
        toast.success("Testing Protocol deleted successfully.");
        await this.testing_protocol_details(this.state.testingProtocoValue);
        // await this.show_all_testing_protocol();
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteEventEditNewArray = (index) => {
    const copyPostArray = Object.assign([], this.state.editInputList);
    copyPostArray.splice(index, 1);
    this.setState({
      editInputList: copyPostArray,
    });
    toast.success("Testing Protocol deleted successfully.");
  };

  save_user_testing_protocol_validation = () => {
    let resultModalError = "";

    if (!this.state.newTestingResult) {
      resultModalError = "Please Enter New Testing Result";
    }
    if (resultModalError) {
      this.setState({ resultModalError });
      return false;
    } else {
      return true;
    }
  };

  refreshPage = async () => {
    await window.location.reload(false);
  };

  save_user_testing_protocol = async () => {
    const testingProtocolId = this.state.testing_protocol_id;

    const user_id = this.state.user_id;

    const exercise_Id_result = this.state.athlete_exercise.map((data) => {
      return {
        id: data.id,
        result: data.result,
      };
    });
    const testValue = this.state.newTestingResult;
    const _exercises = exercise_Id_result;
    const _exerciseResult = this.state.exercise_object;

    let _exercisesArray = [];
    _exercises.forEach((item) => {
      _exercisesArray.push({
        testing_protocol_exercise_id: item.id.toString(),
        testing_protocol_result: item.result.toString(),
      });
    });

    _exercisesArray.forEach((i) => {
      if (i.testing_protocol_exercise_id === _exerciseResult.id.toString()) {
        i.testing_protocol_result = testValue;
      }
    });
    await this.setState({ testingProtocolExercises: [..._exercisesArray] });

    const isValid = this.save_user_testing_protocol_validation();
    if (isValid) {
      try {
        const res = await standardPostApi(
          "save_user_testing_protocol",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            testing_protocol_id: testingProtocolId,
            user_id: user_id,
            testing_protocol_exercise: JSON.stringify(
              this.state.testingProtocolExercises
            ),
            team_id: this.props.match.params.id,
          },
          true
        );
        if (res.data.code === 200) {
          // console.log("This is res of save_user_testing_protocol ->", res);
          toast.success(res.data.message);
          // return this.refreshPage();
          await this.setState({ teamTestingShow: false });
          await this.testing_protocol_details(this.state.testingProtocoValue);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  disableButton = async () => {
    this.setState({ buttonPreVisible: false, buttonNextVisible: false });

    if (this.state.resultCount > 1) {
      this.setState({ buttonPreVisible: true, buttonNextVisible: true });

      // when we are on first page of all the pages
      if (this.state.currentPage == 1) {
        this.setState({
          buttonPreVisible: false,
          preEnable: false,
          buttonNextVisible: true,
          nextEnable: true,
        });
      }

      //when we are on last page of all the pages
      if (this.state.currentPage == this.state.resultCount) {
        this.setState({
          buttonPreVisible: true,
          preEnable: true,
          buttonNextVisible: false,
          // nextEnable: true,
        });
      }

      // when current page is in between various pages
      if (
        this.state.currentPage > 1 &&
        this.state.currentPage < this.state.resultCount
      ) {
        this.setState({
          buttonPreVisible: true,
          buttonNextVisible: true,
          preEnable: true,
          nextEnable: true,
        });
      }
    }
  };

  previousButton = async () => {
    // console.log("Previous BTN", (this.state.currentPage -= 1));
    this.setState({ currentPage: (this.state.currentPage -= 1) });

    this.disableButton();
    this.testing_protocol_details(
      this.state.testingProtocoValue,
      this.state.currentPage
    );
  };

  nextButton = async () => {
    // console.log("Next BTN", (this.state.currentPage += 1));
    this.setState({ currentPage: (this.state.currentPage += 1) });
    this.disableButton();
    this.testing_protocol_details(
      this.state.testingProtocoValue,
      this.state.currentPage
    );
  };

  render() {
    const {
      testingProtocol,
      testingProtocolName,
      exerciseName,
      units,
      editTestingName,
      editTestingExercise,
      editTestingUnits,
      editNewTestingExercise,
      editNewTestingUnits,
      testingProtocolDetails,
      newTestingResult,
      noProtocolAvalabe,
      onHandelWait,
      currentPage,
    } = this.state;

    const editExercise =
      this.state.testingProtocolDetails.testing_protocol_exercises;

    const user_testing_protocol_result =
      this.state.user_testing_protocol_result;

    console.log("Loader", this.state.loading);

    return (
      <div className="loader_sec">
        <CoachHeader />
        {this.state.loading ? (
          <Loader />
        ) : (
          <div className="dashboard-wrapper">
            <section className="myteams_wrapper">
              <div className="container-fluid pr-0">
                <div className="inner_teamsection">
                  <h4>
                    Testing Results
                    <span>
                      {" "}
                      &gt;{" "}
                      {this.state.testingProtocol
                        ? this.state.testingProtocol
                        : this.state.testingProtocolPreName}
                    </span>
                  </h4>
                  <div className="pt-4 protocole d-md-flex">
                    <div className="dropdown">
                      <div>
                        {noProtocolAvalabe.length ? (
                          <select
                            className="btn protocol_btn dropdown-toggle w-100"
                            name="screeningProtocolValue"
                          >
                            <option className="dropdown-item dropdown-menu react_select_menu">
                              {noProtocolAvalabe}
                            </option>
                          </select>
                        ) : (
                          <select
                            className="btn protocol_btn dropdown-toggle w-100 "
                            name="testingProtocol"
                            value={this.state.testingProtocoValue}
                            onChange={this.onHandel}
                          >
                            {this.state.ShowAllTestingProtocol &&
                              this.state.ShowAllTestingProtocol.map((data) => {
                                return (
                                  <option
                                    className="dropdown-item dropdown-menu react_select_menu"
                                    value={data.id}
                                    key={data.id}
                                  >
                                    {data.label}
                                  </option>
                                );
                              })}
                          </select>
                        )}
                        <span className="caret">
                          {/* <i className="fa fa-sort-desc "></i> */}
                        </span>
                      </div>
                    </div>

                    {/* <ul className="list-inline ml-lg-5 mt-4 mt-lg-0">
                      <li>
                        <button
                          href="#"
                          data-toggle="modal"
                          data-target="#protocol"
                          onClick={() => this.ShowCreateModal()}
                          className="Create_btn"
                        >
                          Create
                        </button>
                      </li>
                      &nbsp;
                      <li>
                        {noProtocolAvalabe.length ? (
                          <button
                            data-toggle="modal"
                            data-target="#edit-protocol"
                            className="Edit_btn"
                            style={{ cursor: "not-allowed" }}
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            href="#"
                            data-toggle="modal"
                            data-target="#edit-protocol"
                            onClick={() => this.showEditModal()}
                            className="Edit_btn"
                          >
                            Edit
                          </button>
                        )}
                      </li>
                      &nbsp;
                      <li>
                        {noProtocolAvalabe.length ? (
                          <button
                            className="testing_protocol_delete"
                            style={{ cursor: "not-allowed" }}
                          >
                            Delete
                          </button>
                        ) : (
                          <button
                            className="testing_protocol_delete"
                            onClick={() =>
                              this.showDeleteTestingProtocolModal()
                            }
                          >
                            Delete
                          </button>
                        )}
                      </li>
                    </ul> */}
                  </div>
                </div>
                <div className="testresult_wrapper mt-4">
                  {noProtocolAvalabe.length ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h1>{noProtocolAvalabe}</h1>
                    </div>
                  ) : (
                    <div className="d-lg-flex align-items-center">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link
                            to={`/myplayers/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                          >
                            {this.props.match.params.teamname}
                          </Link>
                        </li>
                        <li className="breadcrumb-item">
                          <Link
                            to={{
                              pathname: `/coachplayerinner/${this.props.match.params.id}/${this.props.match.params.playerId}/${this.props.match.params.teamname}`,
                              state: this.props.location.state,
                            }}
                          >
                            {this.props.location.state.player.first_name}{" "}
                            {this.props.location.state.player.last_name}
                          </Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          // onClick={this.toggleSelectPicker}
                          // style={{ cursor: "pointer" }}
                        >
                          Testing Results Page {currentPage} of{" "}
                          {this.state.resultCount}
                        </li>
                        {/* <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Testing Results Page 1
                      </li> */}
                      </ol>

                      {/* <button className="testing_protocal_previous">
                      Previous
                    </button>
                    <button className="testing_protocal_previous">
                      Create
                    </button>
                    <button className="testing_protocal_previous">Next</button> */}

                      {this.state.buttonPreVisible && (
                        <button
                          // className="testing_protocal_previous"
                          className={
                            this.state.preEnable === true
                              ? "testing_protocal_previous"
                              : "disabled_btn"
                          }
                          onClick={
                            onHandelWait === false
                              ? null
                              : () => this.previousButton()
                          }
                          style={
                            onHandelWait === false
                              ? { cursor: "wait" }
                              : { cursor: "pointer" }
                          }
                        >
                          Previous
                        </button>
                      )}

                      {/* {coachRoles === "Assistant Coach" ? null : (
                        <button
                          className="testing_protocal_previous"
                          // onClick={() =>
                          //   this.createUpdateTestingProtocolResultset(
                          //     this.state.testing_protocol_id,
                          //     "message"
                          //   )
                          // }
                          onClick={
                            onHandelWait === false
                              ? null
                              : () => this.toggleCreatePageModal()
                          }
                          style={
                            onHandelWait === false
                              ? { cursor: "wait" }
                              : { cursor: "pointer" }
                          }
                        >
                          Create
                        </button>
                      )} */}
                      {this.state.buttonNextVisible && (
                        <button
                          // className="testing_protocal_previous"
                          className={
                            this.state.nextEnable === true
                              ? "testing_protocal_previous"
                              : "disabled_btn"
                          }
                          onClick={
                            onHandelWait === false
                              ? null
                              : () => this.nextButton()
                          }
                          // style={{}}
                          style={
                            onHandelWait === false
                              ? { cursor: "wait", padding: "6px 34px" }
                              : { cursor: "pointer", padding: "6px 34px" }
                          }
                        >
                          Next
                        </button>
                      )}
                    </div>
                  )}

                  <div className="table-responsive mt-5 table_react_cursor">
                    <table className="table ">
                      <thead>
                        <tr className="react_Testing_Table">
                          {this.state.tableHead && <th>Player Name</th>}
                          {editExercise &&
                            editExercise.map((data) => {
                              return (
                                <th key={data.id}>
                                  {data.exercise} ({data.units})
                                </th>
                              );
                            })}
                        </tr>
                      </thead>
                      <tbody>
                        {user_testing_protocol_result.map((data) => {
                          return (
                            <tr key={data.id}>
                              <td>{data.name}</td>
                              {data.exercise.map((item) => {
                                return (
                                  <td key={item.id}>
                                    <button
                                      className="team_testing_result_button"
                                      // onClick={(e) => {
                                      //   this.showTeamTestingModal(item, data);
                                      // }}
                                    >
                                      {item.result > 0 ? (
                                        <span
                                          className="exercise_table_btn"
                                          style={
                                            item.color === "#1e8bc3"
                                              ? {
                                                  color: "#fff",
                                                  fontWeight: "bold",
                                                  cursor: "not-allowed",
                                                }
                                              : {
                                                  color: item.color,
                                                  fontWeight: "bold",
                                                  cursor: "not-allowed",
                                                }
                                          }
                                        >
                                          {item.result}
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            color: "#fff",
                                            cursor: "not-allowed",
                                          }}
                                        >
                                          {" "}
                                          -{" "}
                                        </span>
                                      )}
                                    </button>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        <Footer />

        <div>
          <Modal
            show={this.state.show}
            onHide={this.hideCreateModal}
            centered
            size="lg"
          >
            <Modal.Body>
              <div className="modal-header">
                <h5 className="modal-title" id="protocol">
                  Create Testing Protocol
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.hideCreateModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="testingProtocolName"
                    value={testingProtocolName}
                    onChange={(e) => this.onChange(e)}
                  />
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Exercise</th>
                        <th>Units</th>
                        <th>Smaller is Better?</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            name="exerciseName"
                            value={exerciseName}
                            onChange={(e) => this.onChange(e)}
                          />
                          <p className="react_validation">
                            {this.state.exerciseNameParagraphError}
                          </p>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            name="units"
                            value={units}
                            onChange={(e) => this.onChange(e)}
                          />
                          <p className="react_validation">
                            {this.state.UnitsParagraphError}
                          </p>
                        </td>

                        <td colSpan="2">
                          <div className="form-inline">
                            <div className="custom-control custom-checkbox">
                              <Checkbox
                                style={{ marginTop: "5px" }}
                                // name="smaller_better"
                                checked={
                                  this.state.createTestingProtocolCheckbox
                                }
                                toggleCb={() => this.toggleCb()}
                              />
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="custom-control custom-checkbox">
                            <div className="delete-button">
                              <button
                                type="button"
                                className="btn btn-danger add_Check_Button"
                                onClick={() =>
                                  this.addToTestingProtocolExercises()
                                }
                              >
                                <i className="fa fa-check"></i>
                              </button>
                            </div>
                          </div>
                        </td>

                        <td></td>
                      </tr>
                      {this.state.inputList &&
                        this.state.inputList.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder=""
                                  name="exerciseName"
                                  defaultValue={(exerciseName, item.exercise)}
                                  onChange={(e) => this.onChange(e)}
                                  readOnly
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder=""
                                  name="units"
                                  defaultValue={(units, item.units)}
                                  onChange={(e) => this.onChange(e)}
                                  readOnly
                                />
                              </td>

                              <td colSpan="2">
                                <div className="form-inline">
                                  <div className="custom-control custom-checkbox">
                                    <Checkbox
                                      style={{ marginTop: "5px" }}
                                      name="smaller_better"
                                      checked={item.smaller_better}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </td>
                              {/* 
                              <td>
                                <div className="custom-control custom-checkbox">
                                  <div className="delete-button">
                                    <button
                                      type="button"
                                      className="btn btn-danger add_Check_Button"
                                      onClick={(item) =>
                                        this.addToTestingProtocolExercisesNewButton(
                                          item
                                        )
                                      }
                                    >
                                      <i className="fa fa-check"></i>
                                    </button>
                                  </div>
                                </div>
                              </td> */}
                              <td>
                                <div className="custom-control custom-checkbox">
                                  <div className="delete-button">
                                    <button
                                      type="button"
                                      className="btn btn-danger "
                                      onClick={(index) =>
                                        this.deleteEvent(index)
                                      }
                                    >
                                      <i className="fa fa-trash"></i>
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td></td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <button
                  type="button"
                  className="Model_btn"
                  data-dismiss="modal"
                  onClick={this.createTestingProtocol}
                >
                  Save
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </div>

        <div>
          <Modal
            show={this.state.editShow}
            onHide={this.hideEditModal}
            size="lg"
          >
            <Modal.Body>
              <div className="modal-header">
                <h5 className="modal-title" id="edit-protocol">
                  Edit Testing Protocol
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.hideEditModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="editTestingName"
                    defaultValue={
                      (editTestingName, testingProtocolDetails.testing_protocol)
                    }
                    onChange={(e) => this.onChange(e)}
                  />
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Exercise</th>
                        <th>Units</th>
                        <th>Smaller is Better?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* CHeck Start */}
                      <tr>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="editNewTestingExercise"
                            value={editNewTestingExercise}
                            onChange={(e) => this.onChange(e)}
                          />
                        </td>

                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="editNewTestingUnits"
                            value={editNewTestingUnits}
                            onChange={(e) => this.onChange(e)}
                          />
                        </td>

                        <td colSpan="2">
                          <div className="form-inline">
                            <div className="custom-control custom-checkbox">
                              <Checkbox
                                style={{ marginTop: "5px" }}
                                name="smaller_better"
                                checked={this.state.editTestingProtocolCheckbox}
                                toggleCb={() => this.toggleEditCb()}
                              />
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="custom-control custom-checkbox">
                            <div className="delete-button">
                              <button
                                type="button"
                                className="btn btn-danger add_Check_Button"
                                onClick={() =>
                                  this.addToUpdateTestingProtocolExercise()
                                }
                              >
                                <i className="fa fa-check"></i>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      {this.state.editInputList.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="editNewTestingExercise"
                                defaultValue={
                                  (editNewTestingExercise, item.exercise)
                                }
                                onChange={(e) => this.onChange(e)}
                              />
                            </td>

                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="editNewTestingUnits"
                                defaultValue={(editNewTestingUnits, item.units)}
                                onChange={(e) => this.onChange(e)}
                              />
                            </td>

                            <td colSpan="2">
                              <div className="form-inline">
                                <div className="custom-control custom-checkbox">
                                  <Checkbox
                                    style={{ marginTop: "5px" }}
                                    name="smaller_better"
                                    checked={item.smaller_better}
                                  />
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="custom-control custom-checkbox">
                                <div className="delete-button">
                                  <button
                                    type="button"
                                    className="btn btn-danger add_Check_Button"
                                    onClick={() =>
                                      this.UpdateTestingProtocalExercise(
                                        this.state.itemForUpdateSaveButton
                                      )
                                    }
                                  >
                                    <i className="fa fa-check"></i>
                                  </button>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="delete-button">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() =>
                                    this.deleteEventEditNewArray(index)
                                  }
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}

                      {/* check Ends */}
                      {editExercise &&
                        editExercise.map((item, index) => {
                          return (
                            <tr key={item.id}>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="editTestingExercise"
                                  defaultValue={
                                    (editTestingExercise, item.exercise)
                                  }
                                  onChange={(e) => this.onChange(e)}
                                />
                              </td>

                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="editTestingUnits"
                                  defaultValue={(editTestingUnits, item.units)}
                                  onChange={(e) => this.onChange(e)}
                                />
                              </td>

                              <td colSpan="2">
                                <div className="form-inline">
                                  <div className="custom-control custom-checkbox">
                                    <div className="testing_protocol_edit_checkbox">
                                      <Checkbox
                                        checked={
                                          item.smaller_better == 1
                                            ? true
                                            : false
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <div className="custom-control custom-checkbox">
                                  <div className="delete-button">
                                    <button
                                      type="button"
                                      className="btn btn-danger add_Check_Button"
                                      onClick={() => {
                                        this.setState({
                                          itemForUpdateSaveButton: item,
                                        });
                                        this.UpdateTestingProtocalExercise(
                                          item
                                        );
                                      }}
                                    >
                                      <i className="fa fa-check"></i>
                                    </button>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <div className="delete-button">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                      this.setState({
                                        editTestingProtocolDeleteEvent: item,
                                        editTestingProtocolDeleteEventIndex:
                                          index,
                                      });
                                      this.editDeleteEvent(item, index);
                                    }}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <button
                  type="button"
                  className="Model_btn"
                  data-dismiss="modal"
                  onClick={() =>
                    this.UpdateTestingProtocalExercisOnClickSaveButton(
                      this.state.itemForUpdateSaveButton
                    )
                  }
                >
                  Save
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </div>

        <DeleteTestingProtocolModal
          show={this.state.deleteTestingProtocolModal}
          onHide={this.hideDeleteTestingProtocolModal}
          testingProtocol={this.state.testingProtocol}
          deleteTestingProtocol={this.deleteTestingProtocol}
        />

        <div>
          {/* this is a team testing result model */}
          <Modal
            show={this.state.teamTestingShow}
            onHide={this.hideTeamTestingModal}
            centered
          >
            <Modal.Body>
              <div className="modal-header">
                <h5 className="modal-title" id="edit-protocol">
                  Add New Testing Result
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={this.hideTeamTestingModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <form action="" method="">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      // placeholder={this.state.athlete_result_for_modal}
                      name="newTestingResult"
                      // value={newTestingResult}
                      defaultValue={
                        (newTestingResult, this.state.athlete_result_for_modal)
                      }
                      onChange={(e) => this.onChange(e)}
                    />
                    <p className="react_validation">
                      {this.state.resultModalError}
                    </p>
                  </div>
                </form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="Model_btn"
                data-dismiss="modal"
                onClick={() => this.save_user_testing_protocol()}
              >
                Save
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default TestingResults;
