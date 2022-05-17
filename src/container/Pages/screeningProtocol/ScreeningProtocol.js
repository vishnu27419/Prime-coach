import React, { Component } from "react";
import CoachHeader from "container/PublicLayout/CoachHeader";
import Footer from "container/PublicLayout/Footer";
import { Link } from "react-router-dom";
import CreateScreeningProtocol from "./modals/CreateScreeningProtocol";
import AddResultModal from "./modals/AddResultModal";
import ViewResultModal from "./modals/ViewResultModal";
import {
  standardPostApi,
  standardPostApiJsonBased,
} from "container/API/ApiWrapper";
import { errorToast, successToast } from "utils/toastMessage";
import CreateScreeningResestSetModal from "./modals/createScreeningResestSetModal";
import DeleteScreeningPtotocol from "./modals/DeleteScreeningPtotocol";
import EditScreeningProtocol from "./modals/EditScreeningProtocol";
import EditModalDelete from "./modals/EditModalDelete";
export class ScreeningProtocol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createModal: false,
      teamId: this.props.match.params.id,
      addResultModal: false,
      viewResultModal: false,
      protocolName: "",
      nameOfTest: "",
      descriptionOfTest: "",
      comments: false,
      selectedVideo: "",
      inputList: [],
      protocolNameError: "",
      nameOfTestError: "",
      descriptionOfTestError: "",
      selectedVideoError: "",
      fileSize: "",
      noProtocolAvalabe: "",
      screeningProtocolValue: "",
      screenHeadName: "",
      screenHeadPreName: "",
      screenTest: [],
      screeningProtocolTests: [],
      playerName: [],
      userId: "",
      exerciseDetail: {},
      addComment: "",
      resultLoader: true,
      pickerLoader: true,
      uploadAddVideo: null,
      screeningProtocolTestId: "",
      addModalLoader: false,
      protocolUploadLoader: false,
      showCreateProtocolViedio: false,
      videoLink: "",
      videoFullPath: "",
      inputDisplay: [],
      fileSizeAddModal: "",
      viewModalDetails: {},
      viewModalExerciseName: "",
      // disableCreateButton: false,
      resultCount: 0,
      currentPage: 1,
      buttonPreVisible: false,
      buttonNextVisible: false,
      preEnable: false,
      nextEnable: false,
      toggleCreateModal: false,
      deleteScreeningProtocol: false,
      editProtocolModal: false,
      editScreeningProtocolDetail: {},
      updateNameField: "",
      editDetails: [],
      updateTest: "",
      updateDescription: "",
      updateComment: false,
      selectedVideoUpdate: "",
      fileSizeUpdate: "",
      selectedVideoUpdateError: "",
      protocolUploadUpdateLoader: false,
      showCreateProtocolViedioUpdate: false,
      // inputListUpdate: [],
      updateTestError: "",
      updateDescriptionError: "",
      videoFullPathUpdate: "",
      videoLinkUpdate: "",
      protocolUploadUpdatePreLoader: false,
      updateIndex: undefined,
      videoUploadProgress: [],
      editNewVideoUploadProgress: [],
      createVideoUploadProgress: [],
      videoFileSizeOnEditArray: "",
      editDeleteModal: false,
      deleteEditIndex: "",
      onHandelWait: true,
      selectedVideoType: "",
      videoFileSizeOnEditType: "",
    };
  }

  toggleCreateModal = async () => {
    await this.setState({
      createModal: !this.state.createModal,
      inputList: [],
      inputDisplay: [],
      protocolName: "",
      nameOfTest: "",
      descriptionOfTest: "",
      comments: false,
      selectedVideo: "",
      protocolNameError: "",
      nameOfTestError: "",
      descriptionOfTestError: "",
      selectedVideoError: "",
    });
    // this.displayScreeningProtocols();
  };

  componentDidMount() {
    this.displayScreeningProtocols();
  }

  toggleAddResultModal = async (item, data) => {
    // console.log("item", item);
    // console.log("data", data);
    await this.setState({
      addResultModal: !this.state.addResultModal,
      userId: item?.user_id,
      addComment: "",
      uploadAddVideo: "",
      exerciseDetail: data,
      screeningProtocolTestId: data?.id,
      addModalLoader: false,
    });
  };

  toggleViewResultModal = async (data) => {
    // console.log("View Data", data);

    await this.setState({
      viewResultModal: !this.state.viewResultModal,
      viewModalExerciseName: data?.name,
    });

    const result = data?.screening_protocol_test_result?.map((item) => {
      this.setState({ viewModalDetails: item });
    });
  };

  onChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });
    // console.log("This state", this.state.updateNameField);
  };

  toggleCb = async () => {
    await this.setState({
      comments: !this.state.comments,
    });

    // if (this.state.comments === true) {
    //   this.setState({ comments: 1 });
    // } else if (this.state.comments === false) {
    //   this.setState({ comments: 0 });
    // }
  };

  onFileChange = (event) => {
    if (event.target.files[0]) {
      this.setState({
        selectedVideo: event.target.files[0],
        fileSize: event?.target?.files[0]?.size,
        selectedVideoType: event.target.files[0].type,
      });

      console.log("event Occure", event.target.files[0]);

      this.addVideoApi(event.target.files[0]);
    }
    // console.log("evenet-----event", event.target.files[0]);
  };

  onAddFileChange = (event) => {
    // console.log("event.target.files[0]", event.target.files[0]);
    this.setState({
      uploadAddVideo: event.target.files[0],
      // uploadAddVideo: URL.createObjectURL(event.target.files[0]),
      fileSizeAddModal: event?.target?.files[0]?.size,
      uploadAddVideoType: event?.target?.files[0]?.type,
    });
    // console.log("132456798", event?.target?.files);
  };

  addVideoApi = async (videoData) => {
    const config = {
      onUploadProgress: (progressEvent) => {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        // let tempUpload = [...this.state.editNewVideoUploadProgress];
        let tempUpload = this.state.createVideoUploadProgress;
        tempUpload = percentCompleted;
        this.setState({
          createVideoUploadProgress: tempUpload,
        });
      },
    };

    this.setState({ protocolUploadLoader: true });
    const data = new FormData();
    data.append("access_token", await localStorage.getItem("access_token"));
    data.append("video", videoData);

    const isValid = this.validationViedioUpload();

    if (isValid) {
      this.setState({ selectedVideoError: false });
      try {
        const res = await standardPostApiJsonBased(
          "upload_screening_protocol_test_video",
          undefined,
          data,
          true,
          true,
          config
        );

        if (res.data.code === 200) {
          console.log(
            "This is response Add Video--->",
            res.data.data.file_name
          );
          this.setState({
            videoLink: res.data.data.path,
            protocolUploadLoader: false,
            showCreateProtocolViedio: true,
            videoFullPath: res.data.data.full_path,
            disableCreateButton: true,
            selectedVideoError: "",
          });
        }
      } catch (error) {
        console.error(error);
        this.setState({ protocolUploadLoader: false });
      } finally {
        let tempUpload = this.state.createVideoUploadProgress;
        tempUpload = null;
        this.setState({
          createVideoUploadProgress: tempUpload,
        });
      }
    }
  };

  validationViedioUpload() {
    console.log("selectedVideoType ------", this.state.selectedVideoType);
    if (this.state?.fileSize > 5000000) {
      this.setState({
        selectedVideoError: "Please Upload upto 5MB ",
        protocolUploadLoader: false,
      });
      return false;
    } else if (this.state.selectedVideoType !== "video/mp4") {
      this.setState({
        selectedVideoError: "Please Upload mp4 video",
        protocolUploadLoader: false,
      });
    } else {
      return true;
    }
  }

  addNewScreeningProtocol = async () => {
    const {
      inputList,
      protocolName,
      nameOfTest,
      descriptionOfTest,
      comments,
      selectedVideo,
      videoFullPath,
      inputDisplay,
      videoLink,
    } = this.state;
    const isValid = this.createScreeningProtocolValidation();

    if (isValid) {
      inputList.push({
        name: nameOfTest,
        description: descriptionOfTest,
        comment_allowed: comments,
        video_ref: videoLink,
      });

      inputDisplay.push({
        name: nameOfTest,
        description: descriptionOfTest,
        comment_allowed: comments,
        video: videoFullPath,
      });

      await this.setState({
        inputList,
        inputDisplay,
        nameOfTest: "",
        descriptionOfTest: "",
        comments: false,
        selectedVideo: "",
        protocolNameError: "",
        nameOfTestError: "",
        descriptionOfTestError: "",
        selectedVideoError: "",
        showCreateProtocolViedio: false,
        screeningProtocolName: "",
        videoFullPath: "",
        // disableCreateButton: false,
      });
      // this.displayScreeningProtocols();
    }
  };

  deleteEvent = (index) => {
    const copyPostArray = Object.assign([], this.state.inputList);
    copyPostArray.splice(index, 1);
    this.setState({
      inputList: copyPostArray,
    });
  };

  createScreeningProtocolValidation = () => {
    let protocolNameError = "";
    let nameOfTestError = "";
    let descriptionOfTestError = "";
    let selectedVideoError = "";

    if (!this.state.protocolName) {
      protocolNameError = "Name field is required.";
    }

    if (!this.state.nameOfTest) {
      nameOfTestError = "Name of test field is required.";
    }

    if (!this.state.descriptionOfTest) {
      descriptionOfTestError = "Description field is required.";
    }

    if (!this.state.selectedVideo) {
      selectedVideoError = "Please upload video.";
    } else if (!this.state.videoFullPath) {
      selectedVideoError = "Wait while video uploading ...";
    }
    // else if (this.state?.fileSize > 5000000) {
    //   selectedVideoError = "Uploaded file is not a mp4 video file.";
    // }

    // else if (this.state?.fileType != "video/mp4") {
    //   selectedVideoError = "Uploaded file is not a mp4 video file.";
    // }

    if (
      protocolNameError ||
      nameOfTestError ||
      selectedVideoError ||
      descriptionOfTestError
    ) {
      this.setState({
        protocolNameError,
        nameOfTestError,
        descriptionOfTestError,
        selectedVideoError,
      });
      return false;
    } else {
      return true;
    }
  };

  displayScreeningProtocols = async (
    onHandelDetail,
    message,
    updateData,
    updateonDelete
  ) => {
    try {
      const res = await standardPostApi(
        "screening_protocols_with_tests",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team_id: this.props.match.params.id,
        },
        true,
        false
      );

      if (res.data.code === 404) {
        this.setState({
          noProtocolAvalabe: "No screening protocol avalable",
          pickerLoader: false,
          resultLoader: false,
          screeningProtocolTests: [],
          playerName: [],
          screeningProtocolName: undefined,
          screenHeadPreName: "",
        });
      }

      if (res.data.code === 200) {
        console.log(
          "THIS IS RESPONSE OF SCREENING PROTOCOL=----->",
          res.data.data.screening_protocols
        );

        const selectedProtocol = res.data.data.screening_protocols[0];

        const totalIndex = res.data.data.screening_protocols.length - 1;

        updateData && console.log("updateData id", updateData);
        // console.log("message", message);
        // console.log("onHandelDetail", onHandelDetail);

        // console.log("totalIndex", totalIndex, "message", message);

        this.setState(
          message == "eventMessage"
            ? {
                screeningProtocolName: res?.data?.data?.screening_protocols,
                pickerLoader: false,
                screeningProtocolValue: updateData
                  ? updateData.id
                  : res.data.data.screening_protocols[totalIndex].id,
                screenHeadPreName: updateData
                  ? updateData.name
                  : res?.data?.data?.screening_protocols[totalIndex]?.name,
                noProtocolAvalabe: "",
                editScreeningProtocolDetail: updateData
                  ? updateData
                  : res?.data?.data?.screening_protocols[totalIndex],
                onHandelWait: true,
              }
            : this.setState({
                screeningProtocolName: res?.data?.data?.screening_protocols,
                pickerLoader: false,
                screeningProtocolValue: onHandelDetail
                  ? onHandelDetail?.id
                  : selectedProtocol?.id,
                screenHeadPreName: onHandelDetail
                  ? onHandelDetail?.name
                  : selectedProtocol?.name,
                noProtocolAvalabe: "",
                editScreeningProtocolDetail: onHandelDetail
                  ? onHandelDetail
                  : selectedProtocol,
                onHandelWait: true,
              })
        );

        !onHandelDetail &&
          this.screeningProtocolResultCount(this.state.screeningProtocolValue);
      }
    } catch (error) {
      console.error(error);
      this.setState({ pickerLoader: false });
    }
  };

  screeningProtocolResultCount = async (protocolId) => {
    try {
      const res = await standardPostApi(
        "screening_protocol_resultset_count",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          screening_protocol_id: protocolId,
          team_id: this.state.teamId,
        },
        true
      );

      if (res.data.code === 200) {
        // console.log("THIS IS RESPONSE ", res.data.data);
        if (res.data.data.resultset_count === 0) {
          this.createUpdateScreeningProtocolResultset(
            protocolId,
            "callMessage"
          );
        } else {
          this.setState({ resultCount: res.data?.data?.resultset_count });
        }
        this.disableButton();
        this.displayProtocolResult(protocolId, this.state.currentPage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  createUpdateScreeningProtocolResultset = async (protocolId, message) => {
    try {
      const res = await standardPostApi(
        "create_update_screening_protocol_resultset",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          screening_protocol_id: protocolId,
          team_id: this.state.teamId,
        },
        true
      );

      if (res.data.code === 200) {
        console.log("Response of Create result set ", res.data.data);
        this.setState({
          resultCount: res.data?.data?.resultset_count,
          currentPage: res.data?.data?.resultset_count,
          toggleCreateModal: false,
        });

        this.displayProtocolResult(protocolId, this.state.currentPage);
        if (message === "callMessage") {
        } else {
          successToast(res.data.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  onHandel = (e) => {
    this.setState({
      screeningProtocolValue: e.target.value,
      currentPage: 1,
      onHandelWait: false,
    });

    let onHandelDetail = {};
    this.state.screeningProtocolName.map((item) => {
      if (e.target.value == item.id) {
        onHandelDetail = item;
      }
    });
    this.setState({ onHandelWait: false });
    this.displayScreeningProtocols(onHandelDetail, null);

    this.screeningProtocolResultCount(e.target.value);
    this.displayProtocolResult(e.target.value, this.state.currentPage);
  };

  createScreeningProtocolApi = async () => {
    const data = {
      access_token: localStorage.getItem("access_token"),
      protocol_name: this.state.protocolName,
      protocol_tests: this.state.inputList,
      team_id: this.props.match.params.id,
    };

    // console.log("data", data);

    const isValid = this.validationCreateProtocol();
    if (isValid) {
      try {
        const res = await standardPostApiJsonBased(
          "create_screening_protocol",
          undefined,
          data,
          true
        );
        if (res.data.code === 200) {
          console.log("response of Create Protocol", res.data);
          successToast(res.data.message);
          this.displayScreeningProtocols(null, "eventMessage");
          this.toggleCreateModal();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  validationCreateProtocol() {
    if (!this.state.protocolName) {
      errorToast("Name field is required.");
      return false;
    } else if (this.state.inputList.length === 0) {
      errorToast("Plaese add atleast one Test and Description");
      return false;
    } else {
      return true;
    }
  }

  displayProtocolResult = async (protocolId, count) => {
    try {
      const res = await standardPostApi(
        "user_based_screening_protocol_test_result_data",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team_id: this.state.teamId,
          protocol_id: protocolId,
          resultset_no: count,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("This is response of result", res.data.data);
        this.setState({
          screeningProtocolTests: res.data?.data?.screening_protocol_tests,
          playerName: res.data?.data?.players,
          resultLoader: false,
        });
        this.disableButton();
      }
    } catch (error) {
      console.error(error);
      this.setState({ resultLoader: false });
    }
  };

  addTestResultTest = async () => {
    const { userId, screeningProtocolTestId, addComment, uploadAddVideo } =
      this.state;
    console.log("user Id", userId);
    console.log("screeningProtocolTestId", screeningProtocolTestId);

    this.setState({ addModalLoader: true });

    const data = new FormData();

    data.append("access_token", await localStorage.getItem("access_token"));
    data.append("user_id", userId);
    data.append("screening_protocol_test_id", screeningProtocolTestId);
    if (uploadAddVideo) {
      data.append("video", uploadAddVideo);
    }
    if (addComment) {
      data.append("user_comment", addComment);
    }
    data.append("team_id", this.state.teamId);
    data.append("resultset_no", this.state.currentPage);

    const isValid = this.validationAddResultTest();

    if (isValid) {
      try {
        const res = await standardPostApiJsonBased(
          "add_user_screening_protocol_test_result",
          undefined,
          data,
          true
        );
        if (res.data.code === 200) {
          console.log("This is response of Add Result", res.data);
          this.setState({ addModalLoader: false, addResultModal: false });
          this.displayProtocolResult(
            this.state.screeningProtocolValue,
            this.state.currentPage
          );
          successToast(res.data.message);
        }
      } catch (error) {
        console.error(error);
        this.setState({ addModalLoader: false });
      }
    }
  };

  validationAddResultTest() {
    const { exerciseDetail, uploadAddVideo, addComment } = this.state;

    if (exerciseDetail?.comment_allowed == "0") {
      if (!uploadAddVideo) {
        errorToast("Please upload viedio.");
        this.setState({ addModalLoader: false });
        return false;
      } else if (this.state.uploadAddVideoType !== "video/mp4") {
        errorToast("Please upload mp4 viedio.");
        this.setState({ addModalLoader: false });
        return false;
      } else {
        return true;
      }
    } else {
      if (!addComment) {
        errorToast("Comment Field is required.");
        this.setState({ addModalLoader: false });
        return false;
      } else if (this.state.uploadAddVideoType !== "video/mp4") {
        errorToast("Please upload mp4 viedio.");
        this.setState({ addModalLoader: false });
        return false;
      } else {
        return true;
      }
    }
  }

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

    this.displayProtocolResult(
      this.state.screeningProtocolValue,
      this.state.currentPage
    );
  };

  nextButton = async () => {
    // console.log("Next BTN", (this.state.currentPage += 1));
    this.setState({ currentPage: (this.state.currentPage += 1) });
    this.disableButton();

    this.displayProtocolResult(
      this.state.screeningProtocolValue,
      this.state.currentPage
    );
  };

  toggleCreatePageModal = async () => {
    this.setState({
      toggleCreateModal: !this.state.toggleCreateModal,
    });
  };

  toggleDeleteScreeningProtocol = async () => {
    await this.setState({
      deleteScreeningProtocol: !this.state.deleteScreeningProtocol,
    });
  };

  deleteScreeningProtocolApi = async () => {
    try {
      const res = await standardPostApi(
        "delete_screening_protocol",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          protocol_id: this.state.screeningProtocolValue,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("Response of delete", res);
        this.setState({
          deleteScreeningProtocol: false,
          currentPage: this.state.currentPage,
        });
        successToast(res.data.message);
        this.displayScreeningProtocols();
      }
    } catch (error) {
      console.error(error);
    }
  };

  toggleEditProtocolModal = async () => {
    const { editScreeningProtocolDetail } = this.state;

    console.log("IN EDIT MODAL TOGGLE", editScreeningProtocolDetail);

    await this.setState({
      editProtocolModal: !this.state.editProtocolModal,
      updateNameField: editScreeningProtocolDetail?.name,
      editDetails: editScreeningProtocolDetail?.screening_protocol_tests,
    });
  };

  updateToggleCb = async () => {
    await this.setState({ updateComment: !this.state.updateComment });
  };

  onFileUpdateChange = async (event) => {
    if (event.target.files[0]) {
      this.setState({
        selectedVideoUpdate: event.target.files[0],
        fileSizeUpdate: event?.target?.files[0]?.size,
        selectedVideoUpdateError: "",
        selectedVideoUpdateType: event?.target?.files[0]?.type,
      });

      // console.log("FileSize", event.target.files[0].size);
      this.addVideoUpdateApi(event.target.files[0]);
    }
  };

  addVideoUpdateApi = async (videoData) => {
    const config = {
      onUploadProgress: (progressEvent) => {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        // let tempUpload = [...this.state.editNewVideoUploadProgress];
        let tempUpload = this.state.editNewVideoUploadProgress;
        tempUpload = percentCompleted;
        this.setState({
          editNewVideoUploadProgress: tempUpload,
        });
      },
    };

    this.setState({ protocolUploadUpdateLoader: true });
    const data = new FormData();
    data.append("access_token", await localStorage.getItem("access_token"));
    data.append("video", videoData);

    const isValid = this.validationViedioUploadUpdate();

    if (isValid) {
      this.setState({
        selectedVideoError: false,
      });
      try {
        const res = await standardPostApiJsonBased(
          "upload_screening_protocol_test_video",
          undefined,
          data,
          true,
          true,
          config
        );

        if (res.data.code === 200) {
          console.log("This is response Add Video--->", res.data.data);
          this.setState({
            videoLinkUpdate: res.data.data.path,
            videoFullPathUpdate: res.data.data.full_path,
            protocolUploadUpdateLoader: false,
            showCreateProtocolViedioUpdate: true,
            // disableCreateButton: true,
            selectedVideoUpdateError: "",
          });
        }
      } catch (error) {
        console.error(error);
        this.setState({ protocolUploadUpdateLoader: false });
      } finally {
        let tempUpload = this.state.editNewVideoUploadProgress;
        tempUpload = null;
        this.setState({
          editNewVideoUploadProgress: tempUpload,
        });
      }
    }
  };

  validationViedioUploadUpdate() {
    // console.log("fileSizeUpdate vali", this.state.fileSizeUpdate);

    if (this.state?.fileSizeUpdate > 5000000) {
      this.setState({
        selectedVideoUpdateError: "Please Upload upto 5MB ",
        protocolUploadUpdateLoader: false,
      });
      return false;
    } else if (this.state.selectedVideoUpdateType !== "video/mp4") {
      this.setState({
        selectedVideoUpdateError: "Please Upload mp4 video. ",
        protocolUploadUpdateLoader: false,
      });
      return false;
    } else {
      return true;
    }
  }

  addNewScreeningProtocolOnUpdate = async () => {
    const {
      updateTest,
      updateDescription,
      updateComment,
      videoLinkUpdate,
      editDetails,
      videoFullPathUpdate,
    } = this.state;
    const isValid = this.addNewScreeningProtocolOnUpdateValidation();

    if (isValid) {
      editDetails.push({
        name: updateTest,
        description: updateDescription,
        comment_allowed: updateComment,
        video_ref: videoLinkUpdate,
        full_path: videoFullPathUpdate,
      });

      await this.setState({
        editDetails,
        updateTest: "",
        updateDescription: "",
        updateComment: false,
        videoLinkUpdate: "",
        showCreateProtocolViedioUpdate: false,
        selectedVideoUpdateError: "",
        updateTestError: "",
        updateDescriptionError: "",
        // updateVideoFieldError: "",
      });

      // console.log("inputListUpdate", inputListUpdate);
      // console.log("editDetails", editDetails);
    }
  };

  addNewScreeningProtocolOnUpdateValidation() {
    let updateTestError = "";
    let updateDescriptionError = "";
    let selectedVideoUpdateError = "";

    if (!this.state.updateTest) {
      updateTestError = "Name of the test field is required.";
    }

    if (!this.state.updateDescription) {
      updateDescriptionError = "Description of test field is required.";
    }

    if (!this.state.selectedVideoUpdate) {
      selectedVideoUpdateError = "Please upload video.";
    } else if (!this.state.videoFullPathUpdate) {
      selectedVideoUpdateError = "Wait while video uploading ...";
    }

    if (updateTestError || updateDescriptionError || selectedVideoUpdateError) {
      this.setState({
        updateTestError,
        updateDescriptionError,
        selectedVideoUpdateError,
      });
      return false;
    } else {
      return true;
    }
  }

  handelUpdateScreeningProtocol = async (index, field, event) => {
    const { editDetails } = this.state;
    let temp1 = [...editDetails];
    temp1[index][field] = event.target.value;
    console.log("editDetails", temp1);
    this.setState({ editDetails: temp1 });
  };

  updateToggleInUpdateCb = async (item, index) => {
    const { editDetails } = this.state;
    let temp1 = [...editDetails];
    temp1[index].comment_allowed = item.comment_allowed === "1" ? "0" : "1";

    this.setState({ editDetails: temp1 });
  };

  onFileUpdatePreArrayChange = async (event, index) => {
    const config = {
      onUploadProgress: (progressEvent) => {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        let tempUpload = [...this.state.videoUploadProgress];
        tempUpload[index] = percentCompleted;
        this.setState({
          videoUploadProgress: tempUpload,
        });
      },
    };
    // console.log("index", index);
    const { editDetails } = this.state;
    // console.log("editDetials", editDetails);
    this.setState({ updateIndex: index });

    const video = event.target.files[0];
    // const videoSize = event.target.files[0].size;

    if (event.target.files[0]) {
      this.setState({
        videoFileSizeOnEditArray: event?.target?.files[0]?.size,
        videoFileSizeOnEditType: event?.target?.files[0]?.type,
      });

      console.log(
        "videoFileSizeOnEditType---",
        this.state.videoFileSizeOnEditType
      );

      const data = new FormData();
      data.append("access_token", await localStorage.getItem("access_token"));
      data.append("video", video);
      this.setState({ protocolUploadUpdatePreLoader: true });

      const isValid = this.validationEdittArray();
      if (isValid) {
        try {
          const res = await standardPostApiJsonBased(
            "upload_screening_protocol_test_video",
            undefined,
            data,
            true,
            true,
            config
          );

          if (res.data.code === 200) {
            console.log("This is response Add Video--->", res.data.data);
            let temp1 = [...editDetails];
            temp1[index].video_ref = res.data.data.path;
            temp1[index].full_path = res.data.data.full_path;

            console.log("Temp 11111", [...temp1]);

            this.setState({
              editDetails: [...temp1],
              protocolUploadUpdatePreLoader: false,
            });
          }
        } catch (error) {
          console.error(error);
          this.setState({ protocolUploadUpdatePreLoader: false });
        } finally {
          let tempUpload = [...this.state.videoUploadProgress];
          tempUpload[index] = null;
          this.setState({
            videoUploadProgress: tempUpload,
          });
        }
      }
    }
  };

  validationEdittArray() {
    if (this.state.videoFileSizeOnEditArray > 5000000) {
      errorToast("Please Upload upto 5MB");
      return false;
    } else if (this.state.videoFileSizeOnEditType !== "video/mp4") {
      errorToast("Please upload mp4 video");
      return false;
    } else {
      return true;
    }
  }

  updateScreeningProtocolApi = async () => {
    const { editDetails, editScreeningProtocolDetail, updateNameField } =
      this.state;
    console.log("editScreeningProtocolDetail", editScreeningProtocolDetail);

    console.log("editDetail", this.state.editDetails);

    const protocolId = editScreeningProtocolDetail?.id;
    const updateData = editScreeningProtocolDetail;

    const isValid = this.validationUpdate();
    let Temp = [];

    Temp = editDetails?.map((item) => {
      if (item?.id !== undefined)
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          comment_allowed: item.comment_allowed,
          video_ref: item.video_ref,
        };
      else
        return {
          name: item.name,
          description: item.description,
          comment_allowed: item.comment_allowed,
          video_ref: item.video_ref,
        };
    });

    const data = {
      access_token: localStorage.getItem("access_token"),
      protocol_id: protocolId,
      protocol_name: updateNameField,
      protocol_tests: Temp,
    };

    console.log("Final Data", data);

    if (isValid) {
      try {
        const res = await standardPostApiJsonBased(
          "update_screening_protocol",
          undefined,
          data,
          true
        );
        if (res.data.code === 200) {
          console.log("response update", res.data);
          successToast(res.data.message);
          this.displayScreeningProtocols(null, "eventMessage", updateData);
          this.setState({ editProtocolModal: false });
          // this.toggleEditProtocolModal();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  validationUpdate() {
    if (!this.state.updateNameField) {
      errorToast("Name field is required.");
      return false;
    } else if (this.state.editDetails.length === 0) {
      errorToast("Plaese add atleast one Test and Description");
    } else {
      return true;
    }
  }

  editModalDeleteEvent = (index) => {
    const { editScreeningProtocolDetail } = this.state;
    // if (
    //   window.confirm("Are you sure you want to delete , this cannot be undone?")
    // ) {
    const copyPostArray = Object.assign([], this.state.editDetails);
    copyPostArray.splice(index, 1);

    const editScreeningProtocolDetailNew = {
      coach_id: editScreeningProtocolDetail?.coach_id,
      created_at: editScreeningProtocolDetail?.created_at,
      id: editScreeningProtocolDetail?.id,
      name: editScreeningProtocolDetail?.name,
      screening_protocol_tests: copyPostArray,
      updated_at: editScreeningProtocolDetail?.updated_at,
    };

    this.setState({
      editDetails: copyPostArray,
      editScreeningProtocolDetail: editScreeningProtocolDetailNew,
      editDeleteModal: false,
    });

    // }
  };

  toggleEditDelete = async (ind) => {
    console.log(ind);
    await this.setState({
      editDeleteModal: !this.state.editDeleteModal,
      deleteEditIndex: ind,
    });
  };

  render() {
    const {
      createModal,
      addResultModal,
      viewResultModal,
      noProtocolAvalabe,
      screeningProtocolName,
      // screenHeadName,
      screenHeadPreName,
      screeningProtocolTests,
      playerName,
      resultLoader,
      currentPage,
      onHandelWait,
    } = this.state;
    const coachRoles = localStorage.getItem("access_role");

    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid pr-0">
              <div className=" testing_protocol_react">
                <h4>
                  Screening Protocols
                  {/* <span> &gt; {this.state.testingProtocol}</span> */}
                  <span>
                    {/* &gt; {screenHeadName ? screenHeadName : screenHeadPreName} */}
                    &gt; {screenHeadPreName}
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
                            {/* {noProtocolAvalabe
                                  ? noProtocolAvalabe
                                  : item.name} */}
                            {noProtocolAvalabe}
                          </option>
                        </select>
                      ) : (
                        <select
                          className="btn protocol_btn dropdown-toggle w-100"
                          name="screeningProtocolValue"
                          value={this.state.screeningProtocolValue}
                          onChange={this.onHandel}
                        >
                          {screeningProtocolName &&
                            screeningProtocolName.length !== 0 &&
                            screeningProtocolName.map((item) => {
                              return (
                                <option
                                  className="dropdown-item dropdown-menu react_select_menu"
                                  key={item.id}
                                  value={item.id}
                                >
                                  {/* {noProtocolAvalabe
                                  ? noProtocolAvalabe
                                  : item.name} */}
                                  {item.name}
                                </option>
                              );
                            })}
                        </select>
                      )}
                      {this.state.pickerLoader === true && (
                        <span style={{ position: "relative" }}>
                          {/* <i className="fa fa-sort-desc "></i> */}
                          <i
                            className="fa fa-spinner fa-spin fa-3x fa-fw"
                            // className="fa fa-spinner fa-pulse fa-3x fa-fw"
                            style={{
                              color: "var(--appBlue2)",
                              fontSize: "29px",
                              marginTop: "20px",
                              position: "absolute",
                              right: "37px",
                              top: "-22px",
                            }}
                          />
                        </span>
                      )}
                    </div>
                  </div>
                  {coachRoles === "Assistant Coach" ? null : coachRoles ===
                    "S&C Coach" ? null : (
                    <ul className="list-inline ml-md-5 mt-4 mt-md-0">
                      <li>
                        <button
                          className="Create_btn"
                          onClick={
                            resultLoader !== false || onHandelWait === false
                              ? null
                              : () => this.toggleCreateModal()
                          }
                          style={
                            resultLoader !== false || onHandelWait === false
                              ? { cursor: "wait" }
                              : { cursor: "pointer" }
                          }
                        >
                          Create
                        </button>
                      </li>
                      &nbsp;
                      <li>
                        {screeningProtocolName === undefined ? (
                          <button
                            className="Edit_btn"
                            style={{ cursor: "not-allowed" }}
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            className="Edit_btn"
                            // onClick={
                            //   resultLoader !== false && onHandelWait == true
                            //     ? null
                            //     : () => this.toggleEditProtocolModal()
                            // }

                            onClick={
                              resultLoader !== false || onHandelWait === false
                                ? null
                                : () => this.toggleEditProtocolModal()
                            }
                            style={
                              resultLoader !== false || onHandelWait === false
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
                        {screeningProtocolName === undefined ? (
                          <button
                            className="testing_protocol_delete"
                            style={{ cursor: "not-allowed" }}
                          >
                            Delete
                          </button>
                        ) : (
                          <button
                            className="testing_protocol_delete"
                            // onClick={() => alert("Coming Soon!!")}
                            onClick={
                              resultLoader !== false || onHandelWait === false
                                ? null
                                : () => this.toggleDeleteScreeningProtocol()
                            }
                            style={
                              resultLoader !== false || onHandelWait === false
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
                        </Link>
                      </li>

                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Screening Results {currentPage} of{" "}
                        {this.state.resultCount}
                      </li>
                    </ol>

                    {/* <button className="testing_protocal_previous">
                    Previous
                  </button>
                  <button className="testing_protocal_previous">Create</button>
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
                          resultLoader !== false
                            ? null
                            : () => this.previousButton()
                        }
                        style={
                          resultLoader !== false
                            ? { cursor: "wait" }
                            : { cursor: "pointer" }
                        }
                      >
                        Previous
                      </button>
                    )}

                    <span></span>
                    {coachRoles === "Assistant Coach" ? null : (
                      <button
                        className="testing_protocal_previous"
                        onClick={
                          resultLoader !== false
                            ? null
                            : () => this.toggleCreatePageModal()
                        }
                        style={
                          resultLoader !== false
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
                          resultLoader !== false
                            ? null
                            : () => this.nextButton()
                        }
                        // style={{}}
                        style={
                          resultLoader !== false
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
                  {resultLoader !== false && (
                    <div className="text-center">
                      <i
                        className="fa fa-spinner fa-spin fa-3x fa-fw"
                        // className="fa fa-spinner fa-pulse fa-3x fa-fw"
                        style={{
                          color: "var(--appBlue2)",
                          fontSize: "60px",
                          marginTop: "50px",
                        }}
                      />
                    </div>
                  )}

                  <table className="table ">
                    <thead>
                      <tr className="react_Testing_Table">
                        {screeningProtocolTests.length !== 0 && (
                          <th>Player Name</th>
                        )}

                        {screeningProtocolTests &&
                          screeningProtocolTests.length !== 0 &&
                          screeningProtocolTests.map((item) => {
                            return (
                              <th key={item.id}>
                                <span
                                  style={{ marginLeft: "24px" }}
                                  title={item.name}
                                >
                                  {item?.name}
                                </span>
                              </th>
                            );
                          })}
                      </tr>
                    </thead>

                    <tbody>
                      {playerName &&
                        playerName.length !== 0 &&
                        playerName.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td>
                                {item.user_first_name}
                                {item.user_last_name}
                              </td>
                              {item.screening_protocol_test.map((data) => {
                                return (
                                  <td>
                                    {data.screening_protocol_test_result
                                      .length === 0 ? (
                                      <span
                                        style={{
                                          marginLeft: "39px",
                                          color: "#2f84ca",
                                          fontSize: "20px",
                                        }}
                                        // onClick={() =>
                                        //   this.toggleAddResultModal(item, data)
                                        // }
                                        onClick={() => {
                                          coachRoles === "Assistant Coach"
                                            ? errorToast(
                                                "You are not authorized to perform this operation."
                                              )
                                            : this.toggleAddResultModal(
                                                item,
                                                data
                                              );
                                        }}
                                      >
                                        +
                                      </span>
                                    ) : (
                                      <button
                                        className="screening_protocol_view_button"
                                        onClick={() =>
                                          this.toggleViewResultModal(data)
                                        }
                                      >
                                        View
                                      </button>
                                    )}
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
        <Footer />

        <CreateScreeningProtocol
          show={createModal}
          onHide={this.toggleCreateModal}
          state={this.state}
          onChange={this.onChange}
          toggleCb={this.toggleCb}
          onFileChange={this.onFileChange}
          addNewScreeningProtocol={this.addNewScreeningProtocol}
          deleteEvent={this.deleteEvent}
          createScreeningProtocolApi={this.createScreeningProtocolApi}
        />

        <AddResultModal
          show={addResultModal}
          onHide={this.toggleAddResultModal}
          state={this.state}
          onChange={this.onChange}
          onAddFileChange={this.onAddFileChange}
          addTestResultTest={this.addTestResultTest}
        />

        <ViewResultModal
          show={viewResultModal}
          onHide={this.toggleViewResultModal}
          state={this.state}
        />

        <CreateScreeningResestSetModal
          show={this.state.toggleCreateModal}
          onHide={this.toggleCreatePageModal}
          screeningProtocolValue={this.state.screeningProtocolValue}
          createUpdateScreeningProtocolResultset={
            this.createUpdateScreeningProtocolResultset
          }
        />

        <DeleteScreeningPtotocol
          show={this.state.deleteScreeningProtocol}
          onHide={this.toggleDeleteScreeningProtocol}
          state={this.state}
          deleteScreeningProtocolApi={this.deleteScreeningProtocolApi}
        />

        <EditScreeningProtocol
          show={this.state.editProtocolModal}
          onHide={this.toggleEditProtocolModal}
          state={this.state}
          onChange={this.onChange}
          updateNameField={this.state.updateNameField}
          updateToggleCb={this.updateToggleCb}
          handelUpdateScreeningProtocol={this.handelUpdateScreeningProtocol}
          onFileUpdateChange={this.onFileUpdateChange}
          addNewScreeningProtocolOnUpdate={this.addNewScreeningProtocolOnUpdate}
          updateTest={this.state.updateTest}
          updateDescription={this.state.updateDescription}
          updateToggleInUpdateCb={this.updateToggleInUpdateCb}
          onFileUpdatePreArrayChange={this.onFileUpdatePreArrayChange}
          updateScreeningProtocolApi={this.updateScreeningProtocolApi}
          editModalDeleteEvent={this.editModalDeleteEvent}
          toggleEditDelete={this.toggleEditDelete}
        />

        <EditModalDelete
          show={this.state.editDeleteModal}
          onHide={this.toggleEditDelete}
          editModalDeleteEvent={this.editModalDeleteEvent}
          deleteEditIndex={this.state.deleteEditIndex}
        />
      </div>
    );
  }
}

export default ScreeningProtocol;
