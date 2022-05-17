import React, { Component, useState } from "react";
import CoachHeader from "../PublicLayout/CoachHeader";
import Footer from "../PublicLayout/Footer";
import TestingGraph from "../../component/Charts/TestingGraph";
import {
  DropdownButton,
  InputGroup,
  Modal,
  Dropdown,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { standardPostApi } from "../API/ApiWrapper";
import Checkbox from "../../component/Checkbox/Checkbox";
import { toast } from "react-toastify";
import Loader from "../../container/Loader/LoaderWrapper";
import DeleteTestingProtocolModal from "./DeleteTestingProtocolModal";
import { errorToast, successToast } from "utils/toastMessage";
import CreatePageSetModal from "./CreatePageSetModal";
import EditTestingProtocolModal from "./modal/EditTestingProtocolModal";
import ConfirmDeleteModal from "./modal/ConfirmDeleteModal";

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
      graph_color: [],
      graph_colorbg: [],
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
      selectPik: false,
      editNewModal: false,
      editNewDetailsName: "",
      editNewDetailsObj: [],
      editExerciseNew: "",
      editUnitNew: "",
      confirmModal: false,
      deleteExeIndex: "",
      deleteExerciseLoader: false,
      onHandelWait: true,
      editLoader: false,
      noProtocolAvalabe: "",
    };
    this.onChange = this.onChange.bind(this);
    // this.onChangeCreate = this.onChangeCreate.bind(this);
  }

  componentDidMount() {
    this.fetchShowAllTestingProtocol();
  }

  fetchShowAllTestingProtocol = async (message, updateProtocolId, proName) => {
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
        console.log(
          "This is Res of Show All Testing Protocol-> ",
          res.data.data.pickerArray.length
        );

        const SelectedPicker = res.data.data.pickerArray[0];

        const totalIndex = res.data.data.pickerArray.length - 1;

        if (res.data.data.pickerArray.length === 0) {
          this.setState({
            testingProtocoValue: "",
            ShowAllTestingProtocol: [],
            loding: false,
            testingProtocolPreName: "",
            noProtocolAvalabe: "No testing protocol available",
          });
        } else {
          this.setState(
            message == "eventMessage"
              ? {
                  testingProtocoValue: updateProtocolId
                    ? updateProtocolId
                    : res.data.data.pickerArray[totalIndex].id,
                  ShowAllTestingProtocol: res.data.data.pickerArray,
                  loding: false,
                  testingProtocolPreName: proName
                    ? proName
                    : res.data.data.pickerArray[totalIndex].label,
                  noProtocolAvalabe: "",
                }
              : this.setState({
                  testingProtocoValue: SelectedPicker.id,
                  ShowAllTestingProtocol: res.data.data.pickerArray,
                  loding: false,
                  testingProtocolPreName: SelectedPicker.label,
                  noProtocolAvalabe: "",
                })
          );
        }

        res.data.data.pickerArray.length !== 0 &&
          this.testingProtocolResultCount(this.state.testingProtocoValue);
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
          onHandelWait: true,
        });

        GraphSelectPicker.id &&
          (await this.list_user_testing_protocol_result(count));
      }
    } catch (error) {
      this.setState({ onHandelWait: false });
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
          // currentPage: 1,
          currentPage: this.state.currentPage,
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
    // console.log("onChange", this.state);
  }

  onHandel = (e) => {
    // console.log("target", e.target.value);

    this.setState({
      testingProtocoValue: e.target.value,
      currentPage: 1,
      onHandelWait: false,
    });

    this.state.ShowAllTestingProtocol.map((item) => {
      if (e.target.value == item.id) {
        this.setState({
          testingProtocolPreName: item.label,
        });
      }
    });
    // this.setState({
    //   onHandelWait: false,
    // });

    this.testingProtocolResultCount(e.target.value);
    this.TestingProtocolDetails(e.target.value, this.state.currentPage);

    // console.log(
    //   "Current Page--",
    //   this.state.currentPage,
    //   "/Result Count",
    //   this.state.resultCount,
    //   "Protocol id",
    //   e.target.value
    // );
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
            team_id: this.props.match.params.id,
            testing_protocol_exercise: JSON.stringify(inputArray),
          },
          true
        );
        if (res.data.code === 200) {
          console.log(
            "This is res og Create Testing Protocol ->",
            res.data.data
          );
          toast.success(res.data.message);
          await this.setState({
            show: false,
            name: "",
            inputList: [],
            currentPage: 1,
            // currentPage: this.state.resultCount,
          });
          await this.fetchShowAllTestingProtocol("eventMessage");
          // this.disableButton();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  createTestingProtocolValidation = () => {
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
        let ArrColour = [];
        let ArrBgColor = [];

        this.state.list_user_testing_protocol_result.forEach((item) => {
          ARR.push(item.name);
        });

        this.state.list_user_testing_protocol_result.forEach((item) => {
          ArrResult.push(item.result);
        });

        this.state.list_user_testing_protocol_result.forEach((item) => {
          ArrColour.push(item.color);
        });

        this.state.list_user_testing_protocol_result.forEach((item) => {
          ArrBgColor.push(item.color_bg);
        });
        // console.log("The array is ", ARR);
        // console.log("The array is ", ArrResult);
        this.setState({
          graphLabel: ARR,
          graph_Result: ArrResult,
          graph_color: ArrColour,
          graph_colorbg: ArrBgColor,
        });
        // this.setState({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  save_user_testing_protocol_validation = () => {
    let resultModalError = "";

    if (!this.state.newTestingResult) {
      resultModalError = "Please Enter New Testing Result";
    } else if (this.state.newTestingResult == 0) {
      resultModalError = "This value can not be empty or negative.";
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
      // athlete_result_for_modal: item.result,
      newTestingResult: item.result,
      resultModalError: "",
    });
  };

  hideTeamTestingModal = async (item) => {
    await this.setState({ teamTestingShow: false, resultModalError: "" });
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

  toggleSelectPicker = async () => {
    await this.setState({ selectPik: !this.state.selectPik });
  };

  isInputNumber = (event) => {
    var char = String.fromCharCode(event.which);

    // if (!/[0-9]/.test(char)) {
    //   event.preventDefault();
    // }
    if (!/^\d*(\.\d{0,2})?$/.test(char)) {
      event.preventDefault();
    }
  };

  toggleNewEditModal = () => {
    let temp = this.state.testingProtocolDetails;

    this.setState({
      editNewModal: !this.state.editNewModal,
      editNewDetailsName: temp?.testing_protocol,
      editNewDetailsObj: temp?.testing_protocol_exercises,
    });
  };

  handelUpdateTestingProtocol = async (index, field, event) => {
    const { editNewDetailsObj } = this.state;
    let temp1 = [...editNewDetailsObj];
    temp1[index][field] = event.target.value;
    console.log("TEMP INP", temp1);
    this.setState({ editNewDetailsObj: temp1 });
  };

  handelUpdateTestingProtocolCheckbox = async (item, index) => {
    const { editNewDetailsObj } = this.state;
    let temp1 = [...editNewDetailsObj];
    temp1[index].smaller_better = item.smaller_better === "1" ? "0" : "1";
    console.log("TEMP CHECK", temp1);
    this.setState({ editNewDetailsObj: temp1 });
  };

  addToUpdateTestingProtocolExerciseNew = async () => {
    const isValid = this.addToUpdateTestingProtocolExerciseValidationNew();
    if (isValid) {
      const {
        editNewDetailsObj,
        editExerciseNew,
        editUnitNew,
        editTestingProtocolCheckbox,
      } = this.state;

      editNewDetailsObj.push({
        exercise: editExerciseNew,
        units: editUnitNew,
        smaller_better: JSON.stringify(editTestingProtocolCheckbox),
      });
      await this.setState({
        editNewDetailsObj,
        editExerciseNew: "",
        editUnitNew: "",
        editTestingProtocolCheckbox: 0,
        editNewTestingExerciseError: "",
        editNewTestingUnitsError: "",
      });
    }
  };

  addToUpdateTestingProtocolExerciseValidationNew = () => {
    let editNewTestingExerciseError = "";
    let editNewTestingUnitsError = "";

    if (!this.state.editExerciseNew) {
      // errorToast("Exercise field must not be empty");
      editNewTestingExerciseError = "Exercise field must not be empty";
    }

    if (!this.state.editUnitNew) {
      // editNewTestingUnitsError = toast.error("Units field must not be empty");
      editNewTestingUnitsError = "Units field must not be empty";
      // errorToast("Units field must not be empty");
    }

    if (editNewTestingExerciseError || editNewTestingUnitsError) {
      this.setState({ editNewTestingExerciseError, editNewTestingUnitsError });
      return false;
    } else {
      return true;
    }
  };

  updateTestingProtocolApi = async () => {
    const { editNewdefName, editNewDetailsName, editNewDetailsObj } =
      this.state;
    const testingProtocolId = this.state.testing_protocol_id;
    this.setState({ editLoader: true });
    let finalArray = [];

    editNewDetailsObj.map((item) => {
      const arr = {
        exercise: item.exercise,
        units: item.units,
        smaller_better: item.smaller_better,
      };
      finalArray.push(arr);
    });

    let proName = "";

    this.state.ShowAllTestingProtocol.map((item) => {
      if (item.id == testingProtocolId) {
        proName = item.label;
      }
    });

    try {
      const res = await standardPostApi(
        "update_testing_protocol",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          testing_protocol_id: testingProtocolId,
          testing_protocol_name: editNewdefName
            ? editNewdefName
            : editNewDetailsName,
          testing_protocol_exercise: JSON.stringify(finalArray),
        },
        true
      );
      if (res.data.code === 200) {
        console.log("Response of Update ", res.data.data);
        this.setState({
          currentPage: this.state.currentPage,
          editNewDetailsObj: res.data.data.testing_protocol_exercises,
          testingProtocolName: this.state.testingProtocolPreName,
          editLoader: false,
        });
        await this.fetchShowAllTestingProtocol(
          "eventMessage",
          testingProtocolId,
          proName
        );
        successToast(res.data.message);
        this.toggleNewEditModal();
      }
    } catch (error) {
      console.error(error);
      this.setState({ editLoader: false });
    }
  };

  toggleConfirmModal = async (index) => {
    await this.setState({
      confirmModal: !this.state.confirmModal,
      deleteExeIndex: index,
    });
  };

  deleteExerciseEvent = async (index) => {
    const { editNewdefName, editNewDetailsName, editNewDetailsObj } =
      this.state;

    const testingProtocolId = this.state.testing_protocol_id;

    let temp = [...editNewDetailsObj];

    temp.splice(index, 1);

    let finalArray = [];

    temp.map((item) => {
      const arr = {
        exercise: item.exercise,
        units: item.units,
        smaller_better: item.smaller_better,
      };
      finalArray.push(arr);
    });

    console.log("Final Array", finalArray);

    this.setState({ confirmModal: false, deleteExerciseLoader: true });

    try {
      const res = await standardPostApi(
        "update_testing_protocol",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          testing_protocol_id: testingProtocolId,
          testing_protocol_name: editNewdefName
            ? editNewdefName
            : editNewDetailsName,
          testing_protocol_exercise: JSON.stringify(finalArray),
        },
        true
      );
      if (res.data.code === 200) {
        this.setState({
          currentPage: this.state.currentPage,
          editNewDetailsObj: res.data.data.testing_protocol_exercises,
          testingProtocolName: this.state.testingProtocolPreName,
          deleteExerciseLoader: false,
        });
        successToast("Testing Protocol deleted successfully.");
        this.TestingProtocolDetails(
          this.state.testingProtocoValue,
          this.state.currentPage
        );
      }
    } catch (error) {
      console.error(error);
      this.setState({ deleteExerciseLoader: false });
    } finally {
      this.setState({ deleteExerciseLoader: false });
    }
  };

  render() {
    const {
      ShowAllTestingProtocol,
      name,
      exerciseName,
      units,
      // smaller_better,
      // testingProtocol,
      // testingProtocolDetails,
      newTestingResult,
      // editTestingName,
      // editTestingExercise,
      // editTestingUnits,
      // editNewTestingExercise,
      // editNewTestingUnits,
      currentPage,
      graph_color,
      graph_colorbg,
      onHandelWait,
      noProtocolAvalabe,
    } = this.state;

    const editExercise =
      this.state.testingProtocolDetails.testing_protocol_exercises;

    const user_testing_protocol_result =
      this.state.user_testing_protocol_result;

    const coachRoles = localStorage.getItem("access_role");

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
                      {/* {this.state.testingProtocolName
                        ? this.state.testingProtocolName
                        : this.state.testingProtocolPreName} */}
                      {this.state.testingProtocolPreName}
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
                        )}
                        <span className="caret">
                          {/* <i className="fa fa-sort-desc "></i> */}
                        </span>
                      </div>
                    </div>

                    {coachRoles === "Assistant Coach" ? null : coachRoles ===
                      "S&C Coach" ? null : (
                      <ul className="list-inline ml-md-5 mt-4 mt-md-0">
                        <li>
                          <button
                            data-toggle="modal"
                            data-target="#protocol"
                            className="Create_btn"
                            onClick={
                              onHandelWait === false
                                ? null
                                : (e) => {
                                    this.showModal();
                                  }
                            }
                            style={
                              onHandelWait === false
                                ? { cursor: "wait" }
                                : { cursor: "pointer" }
                            }
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
                              data-toggle="modal"
                              data-target="#edit-protocol"
                              className="Edit_btn"
                              // onClick={(e) => {
                              //   this.showEditModal();
                              // }}
                              onClick={
                                onHandelWait === false
                                  ? null
                                  : () => this.toggleNewEditModal()
                              }
                              style={
                                onHandelWait === false
                                  ? { cursor: "wait" }
                                  : { cursor: "pointer" }
                              }
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
                              onClick={
                                onHandelWait === false
                                  ? null
                                  : () => this.showDeleteTestingProtocolModal()
                              }
                              style={
                                onHandelWait === false
                                  ? { cursor: "wait" }
                                  : { cursor: "pointer" }
                              }
                            >
                              Delete
                            </button>
                          )}
                        </li>
                      </ul>
                    )}
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
                    <div className="d-md-flex align-items-center ">
                      <ol className="breadcrumb mb-4 mb-lg-0">
                        <li className="breadcrumb-item">
                          <Link
                            to={`/myplayers/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                          >
                            {this.props.match.params.teamname}
                            {this.state.selectPik && (
                              <span style={{ color: "#fff" }}> / </span>
                            )}
                          </Link>
                        </li>
                        {this.state.selectPik === false ? (
                          <li
                            className="breadcrumb-item active"
                            // onClick={this.toggleSelectPicker}
                            // style={{ cursor: "pointer" }}
                          >
                            Testing Results Page {currentPage} of{" "}
                            {this.state.resultCount}
                          </li>
                        ) : (
                          <li style={{ marginLeft: "5px" }}>
                            <select
                              className="btn protocol_btn dropdown-toggle "
                              style={{ padding: "2px" }}
                            >
                              <option className="dropdown-item dropdown-menu react_select_menu">
                                Testing Results Page 2 of 8
                              </option>
                              <option className="dropdown-item dropdown-menu react_select_menu">
                                Testing Results Page 2 of 8
                              </option>
                              <option className="dropdown-item dropdown-menu react_select_menu">
                                Testing Results Page 2 of 8
                              </option>
                            </select>
                          </li>
                        )}
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

                      {coachRoles === "Assistant Coach" ? null : (
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
                      )}
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

                  <div className="pt-4 protocole d-md-flex">
                    <div className="dropdown">
                      {noProtocolAvalabe.length ? null : (
                        <div>
                          <select
                            id=""
                            className="btn protocol_btn dropdown-toggle w-100"
                            value={this.state.testing_protocol_exercise_id}
                            onChange={this.graphData}
                          >
                            {this.state.testingProtocolSelectPicker.length ===
                              0 && (
                              <option value=""> Select an item....</option>
                            )}

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
                      )}
                    </div>
                  </div>
                  {this.state.testingProtocolSelectPicker.length !== 0 && (
                    <TestingGraph
                      graphLabels={this.state.graphLabel}
                      graph_Result={this.state.graph_Result}
                      graph_color={graph_color}
                      graph_colorbg={graph_colorbg}
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
                                        coachRoles === "Assistant Coach"
                                          ? errorToast(
                                              "You are not authorized to perform this operation."
                                            )
                                          : this.showTeamTestingModal(
                                              item,
                                              data
                                            );
                                      }}
                                    >
                                      {item.result > 0 ? (
                                        <span
                                          className="exercise_table_btn"
                                          style={
                                            item.color === "#1e8bc3"
                                              ? {
                                                  color: "#fff",
                                                  fontWeight: "bold",
                                                }
                                              : {
                                                  color: item.color,
                                                  fontWeight: "bold",
                                                }
                                          }
                                        >
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
                  type="number"
                  className="form-control"
                  placeholder="0"
                  name="newTestingResult"
                  step="0.01"
                  min="0"
                  max="1000000000"
                  maxLength="10"
                  defaultValue={newTestingResult == 0 ? "" : newTestingResult}
                  onChange={(e) => this.onChange(e)}
                  onKeyPress={(event) => {
                    // console.log("event.key", event.key);
                    if (event.key === "Enter") {
                      this.save_user_testing_protocol();
                    } else {
                      this.isInputNumber(event);
                    }
                  }}
                  autoComplete="off"
                  // maxLength="10"
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
        <EditTestingProtocolModal
          show={this.state.editNewModal}
          onHide={this.toggleNewEditModal}
          editExercise={editExercise}
          state={this.state}
          onChange={this.onChange}
          handelUpdateTestingProtocol={this.handelUpdateTestingProtocol}
          handelUpdateTestingProtocolCheckbox={
            this.handelUpdateTestingProtocolCheckbox
          }
          toggleEditCb={this.toggleEditCb}
          addToUpdateTestingProtocolExerciseNew={
            this.addToUpdateTestingProtocolExerciseNew
          }
          updateTestingProtocolApi={this.updateTestingProtocolApi}
          toggleConfirmModal={this.toggleConfirmModal}
          editNewDetailsObj={this.state.editNewDetailsObj}
        />

        <ConfirmDeleteModal
          onHide={this.toggleConfirmModal}
          show={this.state.confirmModal}
          deleteExerciseEvent={this.deleteExerciseEvent}
          deleteExeIndex={this.state.deleteExeIndex}
        />
      </div>
    );
  }
}

export default PlayerTesting;
