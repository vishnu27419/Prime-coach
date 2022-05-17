import React, { Component, useState } from "react";
import CoachHeader from "../PublicLayout/CoachHeader";
import Footer from "../PublicLayout/Footer";
import TestingGraph from "../../component/Charts/TestingGraph";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { standardPostApi } from "../API/ApiWrapper";
import Checkbox from "../../component/Checkbox/Checkbox";
import { toast } from "react-toastify";
import Loader from "../../container/Loader/LoaderWrapper";
import DeleteTestingProtocolModal from "./DeleteTestingProtocolModal";
import { errorToast, successToast } from "utils/toastMessage";
import CreatePageSetModal from "./CreatePageSetModal";

class PlayerTesting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loding: true,
      show: false,
      showEdit: false,
      teamId: this.props.match.params.id,
      ShowAllTestingProtocol: [],
      name: "",
      testingProtocol: "",
      testingProtocolDetails: [],
      testing_protocol_id: "",
      resultCount: 0,
      currentPage: 1,
      teamTestingShow: false,
      inputList: [],
      exerciseName: "",
      smaller_better: "0",
      isChecked: false,
      units: "",
      nameError: "",
      // isChecked: false,
      graphData: "",
      editName: "",
      testingProtocolSelectPicker: [],
      testing_protocol_exercise_id: "",
      list_user_testing_protocol_result: [],
      user_testing_protocol_result: [],
      newTestingResult: "",
      exercise_id: "",
      user_id: "",
      user_exercise: [],
      testing_protocol_exercise_selectpicker_exercise_id: "",
      athlete_exercise: [],
      exercise_object: {},
      testingProtocolExercises: [],
      graphLabel: [],
      graph_Result: [],
      list_user_testing_Exercise: "",
      athlete_result_for_modal: "",
      resultModalError: "",
      editTestingName: "",
      editTestingExercise: "",
      editTestingUnits: "",
      updateInputList: [],
      updateEditExerciseList: [],
      exerciseList: true,
      newExerciseList: false,
      itemForUpdateSaveButton: "",
      editNewTestingExercise: "",
      editNewTestingUnits: "",
      editInputList: [],
      editNewTestingExerciseError: "",
      editNewTestingUnitsError: "",
      finalArray: [],
      // testingProtocolDetailsForDeleteEdit: {},
      editTestingProtocolDeleteEvent: [],
      editTestingProtocolDeleteEventIndex: "",
      testingProtocoValue: "",
      testingProtocolName: "",
      tableHead: null,
      createTestingProtocolCheckbox: 0,
      deleteTestingProtocolModal: false,
      testingProtocolPreName: "",
      exerciseNameParagraphError: "",
      UnitsParagraphError: "",
      editTestingProtocolCheckbox: 0,
      buttonPreVisible: false,
      buttonNextVisible: false,
      toggleCreateModal: false,
      preEnable: false,
      nextEnable: false,
    };
    this.onChange = this.onChange.bind(this);
    // this.onChangeCreate = this.onChangeCreate.bind(this);
  }

  componentDidMount() {
    this.fetchShowAllTestingProtocol();
  }

  fetchShowAllTestingProtocol = async () => {
    try {
      const res = await standardPostApi(
        "show_all_testing_protocol",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team_id: this.state.teamId,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log(
        //   "This is Res of Show All Testing Protocol-> ",
        //   res.data.data.pickerArray
        // );
        const SelectedPicker = res.data.data.pickerArray[0];

        this.setState({
          testingProtocoValue: SelectedPicker.id,
          ShowAllTestingProtocol: res.data.data.pickerArray,
          loding: false,
          testingProtocolPreName: SelectedPicker.label,
        });
        this.testingProtocolResultCount(SelectedPicker.id);
        // this.TestingProtocolDetails(SelectedPicker.id);
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
        this.TestingProtocolDetails(protocolId, this.state.currentPage);
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

  TestingProtocolDetails = async (id, count) => {
    try {
      const res = await standardPostApi(
        "testing_protocol_details",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          testing_protocol_id: id,
          team_id: this.state.teamId,
          resultset_no: count,
        },
        true
      );

      if (res.data.code === 200) {
        // console.log(
        //   "This is res of Testing Protocol Details *>",
        //   res.data.data
        // );
        res.data.data.testing_protocol_exercises.map((item) => {
          this.setState({ tableHead: item.exercise });
        });

        // console.log(
        //   " res.data.data.testing_protocol_exercise_selectpicker.pickerArray",
        //   res.data.data.testing_protocol_exercise_selectpicker.pickerArray
        // );

        const GraphSelectPicker = res.data.data
          .testing_protocol_exercise_selectpicker.pickerArray[0]
          ? res.data.data.testing_protocol_exercise_selectpicker.pickerArray[0]
          : [];

        // console.log("This is graphSelectPicker-->", GraphSelectPicker.id);
        // console.log(
        //   "Previous--->",
        //   res.data.data.testing_protocol_exercise_selectpicker
        // );

        this.setState({
          testingProtocolDetails: res.data.data,
          testing_protocol_id: id,
          testingProtocolSelectPicker:
            res.data.data.testing_protocol_exercise_selectpicker.pickerArray,
          user_testing_protocol_result:
            res.data.data.user_testing_protocol_result,
          testing_protocol_exercise_selectpicker_exercise_id:
            res.data.data.testing_protocol_exercise_selectpicker.pickerObject,
          testing_protocol_exercise_id: GraphSelectPicker.id,
        });

        GraphSelectPicker.id &&
          (await this.list_user_testing_protocol_result(count));
      }
    } catch (error) {
      console.error(error);
    }
  };

  deleteTestingProtocol = async () => {
    const testingProtocolId = this.state.testing_protocol_id;
    console.log("testing_protocol_id", testingProtocolId);
    try {
      const res = await standardPostApi(
        "delete_testing_protocol",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          testing_protocol_id: testingProtocolId,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("this is res of delete protocol", res);
        await this.setState({
          deleteTestingProtocolModal: false,
          testingProtocolName: this.state.testingProtocolPreName,
          currentPage: 1,
        });
        toast.success(res.data.message);
        await this.fetchShowAllTestingProtocol();
      }
    } catch (error) {
      console.log(error);
    }
    // }
  };

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // console.log("this is update state", this.state);
  }

  onHandel = (e) => {
    console.log("target", e.target.value);
    this.setState({ testingProtocoValue: e.target.value });

    this.TestingProtocolDetails(e.target.value, this.state.currentPage);

    this.state.ShowAllTestingProtocol.map((item) => {
      if (e.target.value == item.id) {
        this.setState({
          testingProtocolName: item.label,
        });
      }
    });
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

    // if(this)

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

  deleteEvent = (index) => {
    const copyPostArray = Object.assign([], this.state.inputList);
    copyPostArray.splice(index, 1);
    this.setState({
      inputList: copyPostArray,
    });
  };

  createTestingProtocol = async () => {
    // console.log("check state of exercise", this.state.name);

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
            testing_protocol: this.state.name,
            testing_protocol_exercise: JSON.stringify(inputArray),
          },
          true
        );
        if (res.data.code === 200) {
          console.log("This is res og Create Testing Protocol ->", res);
          toast.success(res.data.message);
          await this.setState({
            show: false,
            name: "",
            inputList: [],
            currentPage: 1,
          });
          await this.fetchShowAllTestingProtocol();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  createTestingProtocolValidation = () => {
    // let CreateTestingProtocolError = "";

    // if (!this.state.name) {
    //   CreateTestingProtocolError = toast.error("Name field is required.");
    // }
    // if (this.state.inputList.length === 0) {
    //   CreateTestingProtocolError = errorToast(
    //     "Add atleast one exercise and Unit to create testing protocol."
    //   );
    // }

    // if (CreateTestingProtocolError) {
    //   this.setState({
    //     CreateTestingProtocolError,
    //   });
    //   return false;
    // } else {
    //   return true;
    // }

    if (!this.state.name) {
      errorToast("Name field is required.");
      return false;
    } else if (this.state.inputList.length === 0) {
      errorToast(
        "Please add atleast one exercise and Unit to create testing protocol."
      );
      return false;
    } else {
      return true;
    }
  };

  UpdateTestingProtocalExercise = async (item) => {
    const testingProtocolId = this.state.testing_protocol_id;

    const testing_protocol_name = this.state.testingProtocolDetails
      .testing_protocol;

    const testing_protocol_exercise = this.state.testingProtocolDetails
      .testing_protocol_exercises;

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
        console.log("RESPONSE OF UPDATE TESTING PROTOCOL", res.data.data);
        toast.success(res.data.message);
        // await this.fetchShowAllTestingProtocol();
        // await this.hideEditModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  UpdateTestingProtocalExercisOnClickSaveButton = async (item) => {
    const testingProtocolId = this.state.testing_protocol_id;

    const testing_protocol_name = this.state.testingProtocolDetails
      .testing_protocol;

    const testing_protocol_exercise = this.state.testingProtocolDetails
      .testing_protocol_exercises;

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
          testingProtocolName: this.state.testingProtocolPreName,
          editInputList: [],
          currentPage: 1,
        });
        console.log("RESPONSE OF UPDATE TESTING PROTOCOL", res.data.data);
        await this.fetchShowAllTestingProtocol();
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

  editDeleteEvent = async (item, index) => {
    const testingProtocolId = this.state.testing_protocol_id;
    const testing_protocol_name = this.state.testingProtocolDetails
      .testing_protocol;
    const testing_protocol_exercise = this.state.testingProtocolDetails
      .testing_protocol_exercises;
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
          // exerciseList: false,
          // newExerciseList: true,
        });
        console.log("RESPONSE OF UPDATE TESTING PROTOCOL", res.data.data);
        toast.success("Testing Protocol deleted successfully.");
        await this.TestingProtocolDetails(
          // this.state.testingProtocolDetailsForDeleteEdit
          this.state.testingProtocoValue,
          this.state.currentPage
        );
        // await this.fetchShowAllTestingProtocol();
        // await this.hideEditModal();
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

  list_user_testing_protocol_result = async (count) => {
    try {
      const res = await standardPostApi(
        "list_user_testing_protocol_result",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          testing_protocol_exercise_id: this.state.testing_protocol_exercise_id,
          team_id: this.state.teamId,
          resultset_no: count,
        },
        true
      );
      if (res.data.code === 200) {
        this.setState({
          list_user_testing_protocol_result: res.data.data.UserResult.user_data,
          list_user_testing_Exercise: res.data.data.UserResult.exercise,
        });
        // console.log("===> ", this.state.list_user_testing_protocol_result);
        let ARR = [];
        let ArrResult = [];

        this.state.list_user_testing_protocol_result.forEach((item) => {
          ARR.push(item.name);
        });

        this.state.list_user_testing_protocol_result.forEach((item) => {
          ArrResult.push(item.result);
        });
        // console.log("The array is ", ARR);
        // console.log("The array is ", ArrResult);
        this.setState({ graphLabel: ARR });
        this.setState({ graph_Result: ArrResult });
      }
    } catch (error) {
      console.log(error);
    }
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

  save_user_testing_protocol = async () => {
    const { currentPage } = this.state;
    const testingProtocolId = this.state.testing_protocol_id;

    const user_id = this.state.user_id;

    // console.log("user_id", user_id);
    // console.log("testingProtocolId", testingProtocolId);

    const exercise_Id_result = this.state.athlete_exercise.map((data) => {
      return {
        id: data.id,
        result: data.result,
      };
    });
    // console.log("exercise....id...result", exercise_Id_result);
    const testValue = this.state.newTestingResult;
    const _exercises = exercise_Id_result;
    const _exerciseResult = this.state.exercise_object;
    // console.log("check rajat sir", _exercisesArray);

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
            team_id: this.state.teamId,
            resultset_no: currentPage,
          },
          true
        );
        console.log("This is res of save_user_testing_protocol ->", res);
        successToast(res.data.message);
        if (res.data.code === 200) {
          await this.setState({ teamTestingShow: false });
          await this.TestingProtocolDetails(
            this.state.testingProtocoValue,
            currentPage
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  showModal = async (e) => {
    await this.setState({
      show: !this.state.show,
    });
  };

  hideModal = async (item) => {
    await this.setState({ show: false });
  };

  showEditModal = async (e) => {
    await this.setState({
      showEdit: !this.state.showEdit,
    });
  };

  hideEditModal = async (item) => {
    await this.setState({ showEdit: false });
  };

  showTeamTestingModal = async (item, data) => {
    console.log("data", data);
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

  graphData = async (e) => {
    await this.setState({ testing_protocol_exercise_id: e.target.value });

    await this.list_user_testing_protocol_result(this.state.currentPage);
  };

  showDeleteTestingProtocolModal = async () => {
    await this.setState({
      deleteTestingProtocolModal: !this.state.deleteTestingProtocolModal,
    });
  };

  hideDeleteTestingProtocolModal = async () => {
    await this.setState({ deleteTestingProtocolModal: false });
  };

  // previousDetails = async () => {
  //   const {
  //     testing_protocol_exercise_id,
  //     testingProtocolSelectPicker,
  //   } = this.state;
  //   let id = testingProtocolSelectPicker[0]?.id;
  //   if (testing_protocol_exercise_id !== id) {
  //     let temp = testingProtocolSelectPicker.find(
  //       (x) => x.id === testing_protocol_exercise_id - 1
  //     );
  //     this.setState({ testing_protocol_exercise_id: temp?.id });
  //     this.list_user_testing_protocol_result();
  //   }
  // };

  // nextDetails = async () => {
  //   const {
  //     testing_protocol_exercise_id,
  //     testingProtocolSelectPicker,
  //   } = this.state;
  //   let id =
  //     testingProtocolSelectPicker[testingProtocolSelectPicker.length - 1]?.id;
  //   if (testing_protocol_exercise_id !== id) {
  //     let temp = testingProtocolSelectPicker.find(
  //       (x) => x.id === testing_protocol_exercise_id + 1
  //     );
  //     this.setState({ testing_protocol_exercise_id: temp?.id });
  //     this.list_user_testing_protocol_result();
  //   }
  // };

  disableButton = async () => {
    console.log(
      "Current Page ",
      this.state.currentPage,
      "RESULT",
      this.state.resultCount
    );

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
    this.TestingProtocolDetails(
      this.state.testingProtocoValue,
      this.state.currentPage
    );
  };

  nextButton = async () => {
    // console.log("Next BTN", (this.state.currentPage += 1));
    this.setState({ currentPage: (this.state.currentPage += 1) });
    this.disableButton();
    this.TestingProtocolDetails(
      this.state.testingProtocoValue,
      this.state.currentPage
    );
  };

  toggleCreatePageModal = async () => {
    this.setState({
      toggleCreateModal: !this.state.toggleCreateModal,
    });
  };

  render() {
    const {
      ShowAllTestingProtocol,
      name,
      exerciseName,
      units,
      smaller_better,
      testingProtocol,
      testingProtocolDetails,
      newTestingResult,
      editTestingName,
      editTestingExercise,
      editTestingUnits,
      editNewTestingExercise,
      editNewTestingUnits,
      currentPage,
    } = this.state;

    const editExercise = this.state.testingProtocolDetails
      .testing_protocol_exercises;

    const user_testing_protocol_result = this.state
      .user_testing_protocol_result;

    return (
      <div className="loader_sec">
        <CoachHeader />
        {this.state.loding ? (
          <Loader />
        ) : (
          <div className="dashboard-wrapper">
            <section className="myteams_wrapper">
              <div className="container-fluid pr-0">
                <div className=" testing_protocol_react">
                  <h4>
                    Testing Protocols
                    {/* <span> &gt; {this.state.testingProtocol}</span> */}
                    <span>
                      {" "}
                      &gt;{" "}
                      {this.state.testingProtocolName
                        ? this.state.testingProtocolName
                        : this.state.testingProtocolPreName}
                    </span>
                  </h4>

                  <div className="pt-4 protocole d-md-flex">
                    <div className="dropdown">
                      <div>
                        <select
                          className="btn protocol_btn dropdown-toggle w-100"
                          name="testingProtocol"
                          value={this.state.testingProtocoValue}
                          onChange={this.onHandel}
                        >
                          {/* <option value={1}>Testing Protocol Select</option> */}
                          {ShowAllTestingProtocol &&
                            ShowAllTestingProtocol.map((data) => {
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
                        <span className="caret">
                          {/* <i className="fa fa-sort-desc "></i> */}
                        </span>
                      </div>
                    </div>

                    <ul className="list-inline ml-md-5 mt-4 mt-md-0">
                      <li>
                        <button
                          data-toggle="modal"
                          data-target="#protocol"
                          className="Create_btn"
                          onClick={(e) => {
                            this.showModal();
                          }}
                        >
                          Create
                        </button>
                      </li>
                      &nbsp;
                      <li>
                        <button
                          data-toggle="modal"
                          data-target="#edit-protocol"
                          className="Edit_btn"
                          onClick={(e) => {
                            this.showEditModal();
                          }}
                        >
                          Edit
                        </button>
                      </li>
                      &nbsp;
                      <li>
                        <button
                          className="testing_protocol_delete"
                          onClick={() => this.showDeleteTestingProtocolModal()}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="testresult_wrapper mt-4">
                  <div className="d-md-flex align-items-center ">
                    <ol className="breadcrumb mb-4 mb-lg-0">
                      <li className="breadcrumb-item">
                        <Link
                          to={`/myplayers/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                        >
                          {this.props.match.params.teamname}
                        </Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Testing Results Page {currentPage}
                      </li>
                    </ol>
                    {/* <button
                      className="testing_protocal_previous"
                      onClick={() => this.previousDetails()}
                      disabled={
                        this.state.testing_protocol_exercise_id ===
                        this.state.testingProtocolSelectPicker[0]?.id
                      }
                      style={
                        this.state.testing_protocol_exercise_id ===
                        this.state.testingProtocolSelectPicker[0]?.id
                          ? {
                              cursor: "not-allowed",
                              backgroundColor: "#2e6da4",
                            }
                          : null
                      }
                      title={
                        this.state.testing_protocol_exercise_id ===
                        this.state.testingProtocolSelectPicker[0]?.id
                          ? "No previous exercise avalable"
                          : null
                      }
                    >
                      Previous
                    </button>
                    <button
                      className="testing_protocal_previous"
                      onClick={(e) => {
                        this.showEditModal();
                      }}
                    >
                      Create
                    </button>
                    <button
                      className="testing_protocal_previous"
                      onClick={() => this.nextDetails()}
                      disabled={
                        this.state.testing_protocol_exercise_id ===
                        this.state.testingProtocolSelectPicker[
                          this.state.testingProtocolSelectPicker.length - 1
                        ]?.id
                      }
                      style={
                        this.state.testing_protocol_exercise_id ===
                        this.state.testingProtocolSelectPicker[
                          this.state.testingProtocolSelectPicker.length - 1
                        ]?.id
                          ? {
                              cursor: "not-allowed",
                              backgroundColor: "#2e6da4",
                            }
                          : null
                      }
                      title={
                        this.state.testing_protocol_exercise_id ===
                        this.state.testingProtocolSelectPicker[
                          this.state.testingProtocolSelectPicker.length - 1
                        ]?.id
                          ? "No next exercise avalable"
                          : null
                      }
                    >
                      Next
                    </button> */}

                    {this.state.buttonPreVisible && (
                      <button
                        // className="testing_protocal_previous"
                        className={
                          this.state.preEnable === true
                            ? "testing_protocal_previous"
                            : "disabled_btn"
                        }
                        onClick={this.previousButton}
                      >
                        Previous
                      </button>
                    )}

                    <button
                      className="testing_protocal_previous"
                      // onClick={() =>
                      //   this.createUpdateTestingProtocolResultset(
                      //     this.state.testing_protocol_id,
                      //     "message"
                      //   )
                      // }
                      onClick={this.toggleCreatePageModal}
                    >
                      Create
                    </button>
                    {this.state.buttonNextVisible && (
                      <button
                        // className="testing_protocal_previous"
                        className={
                          this.state.nextEnable === true
                            ? "testing_protocal_previous"
                            : "disabled_btn"
                        }
                        onClick={this.nextButton}
                        style={{ padding: "6px 34px" }}
                      >
                        Next
                      </button>
                    )}
                  </div>

                  <div className="pt-4 protocole d-md-flex">
                    <div className="dropdown">
                      <div>
                        <select
                          id=""
                          className="btn protocol_btn dropdown-toggle w-100"
                          value={this.state.testing_protocol_exercise_id}
                          onChange={this.graphData}
                        >
                          {this.state.testingProtocolSelectPicker.length ===
                            0 && <option value=""> Select an item....</option>}

                          {this.state.testingProtocolSelectPicker &&
                            this.state.testingProtocolSelectPicker.map(
                              (item) => {
                                return (
                                  <option
                                    className="dropdown-item dropdown-menu react_select_menu"
                                    value={item.id}
                                    key={item.id}
                                    // onClick={() => this.graphData(item)}
                                  >
                                    {item.label}
                                  </option>
                                );
                              }
                            )}
                        </select>
                        <span className="caret_Select_exercise">
                          {/* <i className="fa fa-sort-desc "></i> */}
                        </span>
                      </div>
                    </div>
                  </div>
                  {this.state.testingProtocolSelectPicker.length !== 0 && (
                    <TestingGraph
                      graphLabels={this.state.graphLabel}
                      graph_Result={this.state.graph_Result}
                      exercise={this.state.list_user_testing_Exercise}
                    />
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
                                  {data.exercise}{" "}
                                  {`${data.units ? `( ${data.units} )` : ""}`}
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
                                      onClick={(e) => {
                                        this.showTeamTestingModal(item, data);
                                      }}
                                    >
                                      {item.result > 0 ? (
                                        <span className="exercise_table_btn">
                                          {item.result}
                                        </span>
                                      ) : (
                                        <span> + </span>
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
        {/* Adding Create  button model */}

        <Modal
          show={this.state.show}
          onHide={this.hideModal}
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
                onClick={this.hideModal}
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
                  name="name"
                  value={name}
                  onChange={(e) => this.onChange(e)}
                />
                <p className="react_validation">{this.state.nameError}</p>
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
                            {/* <Checkbox
                              style={{ marginTop: "5px" }}
                              name="smaller_better"
                            /> */}
                            <Checkbox
                              style={{ marginTop: "5px" }}
                              checked={this.state.createTestingProtocolCheckbox}
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
                    </tr>
                    {/* this is for input list start */}
                    {this.state.inputList.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={data.exercise}
                              readOnly
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={data.units}
                              readOnly
                            />
                          </td>

                          <td colSpan="2">
                            <div className="form-inline">
                              <div className="custom-control custom-checkbox">
                                <Checkbox
                                  style={{ marginTop: "5px" }}
                                  name="smaller_better"
                                  checked={data.smaller_better}
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
                                  onClick={() =>
                                    this.addToTestingProtocolExercises()
                                  }
                                >
                                  <i className="fa fa-check"></i>
                                </button>
                              </div>
                            </div>
                          </td> */}

                          {/* <td>
                            <div className="custom-control custom-checkbox">
                              <div className="delete-button">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={(index) => this.deleteEvent(index)}
                                >
                                  <i className="fa fa-trash"></i>
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
                                  onClick={() => this.deleteEvent(index)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {/* this is input list ends */}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                className="Model_btn"
                data-dismiss="modal"
                onClick={() => {
                  this.createTestingProtocol();
                }}
              >
                Save
              </button>
            </div>
          </Modal.Body>
        </Modal>
        {/* Adding edit  button model */}

        <Modal show={this.state.showEdit} onHide={this.hideEditModal} size="lg">
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
                                        item.smaller_better == 1 ? true : false
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
                                      this.UpdateTestingProtocalExercise(item);
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
                                      editTestingProtocolDeleteEventIndex: index,
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
              {/* <form action="" method=""> */}
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
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      this.save_user_testing_protocol();
                    }
                  }}
                />
                <p className="react_validation">
                  {this.state.resultModalError}
                </p>
              </div>
              {/* </form> */}
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

        <DeleteTestingProtocolModal
          show={this.state.deleteTestingProtocolModal}
          onHide={this.hideDeleteTestingProtocolModal}
          testingProtocolName={this.state.testingProtocolName}
          deleteTestingProtocol={() => this.deleteTestingProtocol()}
        />

        <CreatePageSetModal
          show={this.state.toggleCreateModal}
          onHide={this.toggleCreatePageModal}
          testing_protocol_id={this.state.testing_protocol_id}
          createUpdateTestingProtocolResultset={
            this.createUpdateTestingProtocolResultset
          }
        />
      </div>
    );
  }
}

export default PlayerTesting;
