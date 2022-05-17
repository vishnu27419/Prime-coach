import React, { Component } from "react";
import CoachHeader from "container/PublicLayout/CoachHeader";
import Footer from "container/PublicLayout/Footer";
import { Link } from "react-router-dom";
import MadicalCriteriaModal from "./MadicalCriteriaModal";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import { ContactsOutlined } from "@material-ui/icons";
import {
  standardPostApi,
  standardPostApiJsonBased,
} from "container/API/ApiWrapper";
import { errorToast, successToast } from "utils/toastMessage";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calander from "../../Custom/images/celender.jpg";
import moment from "moment";
import AddCriteriaResutModal from "./AddCriteriaResutModal";
import ViewMedicalCriteriaModal from "./ViewMedicalCriteriaModal";
import NoDataFound from "component/lottiLoader/LottiLoader";
import DeleteMedicalCriteriaModal from "./DeleteMedicalCriteriaModal";
import EditIcon from "@material-ui/icons/Edit";

export class MadicalRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criteriaModal: false,
      criteriaName: "",
      // comments: false,
      inputList: [],
      criteriaHeadName: "",
      visibleTypeBtn: false,
      presentStatus: "in",
      criteriaNameError: "",
      medicalStatusList: [],
      crateCriteriaLoader: false,
      madicalPicker: "",
      selectPickerName: "",
      selectPickerObject: {},
      date: new Date(),
      madicalStatus: [],
      playerResultSet: [],
      addResultModal: false,
      pickerLoader: false,
      playerObj: {},
      criteriaObj: {},
      comment: "",
      dateAdd: new Date(),
      addLodaer: false,
      viewModal: false,
      userStatusObj: {},
      resultSetLoader: false,
      commentError: "",
      deleteCriteriaModal: false,
      deleteLoader: false,
      inOutSwitchBtn: false,
    };
  }

  componentDidMount() {
    this.fetchMedicalStatusWithCriterias();
  }

  toggleCriteriaModal = () => {
    this.setState({
      criteriaModal: !this.state.criteriaModal,
      inputList: [],
      criteriaName: "",
      // comments: false,
      criteriaHeadName: "",
      presentStatus: "out",
      visibleTypeBtn: false,
      criteriaNameError: "",
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("event", this.state);
  };

  // toggleCb = async () => {
  //   await this.setState({
  //     comments: !this.state.comments,
  //   });
  // };

  addNewCriteria = async () => {
    const { inputList, criteriaName, comments, presentStatus } = this.state;
    const isValid = this.addNewCriteriaValidation();

    if (isValid) {
      inputList.push({
        name: criteriaName,
        // type: presentStatus,
        // type: "in",
        // comment_allowed: comments,
      });

      await this.setState({
        inputList,
        criteriaName: "",
        // comments: false,
        presentStatus: "out",
        visibleTypeBtn: false,
        criteriaNameError: "",
      });
    }
  };

  deleteEvent = (index) => {
    const copyPostArray = Object.assign([], this.state.inputList);
    copyPostArray.splice(index, 1);
    this.setState({
      inputList: copyPostArray,
    });
  };

  addNewCriteriaValidation = () => {
    if (!this.state.criteriaName) {
      this.setState({
        criteriaNameError: "Name of the criteria field is required.",
      });
      return false;
    } else {
      return true;
    }
  };

  toggleTypeOutButton = (type) => {
    console.log("Type", type);
    this.setState({
      presentStatus: type,
      inOutSwitchBtn: "in",
    });
  };

  toggleTypeButton = (type) => {
    console.log("Type", type);
    this.setState({
      presentStatus: type,
      inOutSwitchBtn: "out",
    });
  };

  handelCreateMadicalStatus = async () => {
    const data = {
      access_token: localStorage.getItem("access_token"),
      medical_status_name: this.state.criteriaHeadName,
      team_id: parseInt(this.props.match.params.id),
      criterias: this.state.inputList,
    };

    const isValid = this.validationCreateMadicalStatus();

    if (isValid) {
      this.setState({ crateCriteriaLoader: true });
      try {
        const res = await standardPostApiJsonBased(
          "create_medical_status",
          undefined,
          data,
          true
        );
        if (res.data.code === 200) {
          console.log("criteriaHeadName", res.data);
          this.fetchMedicalStatusWithCriterias();
          this.toggleCriteriaModal();
          successToast(res.data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.setState({ crateCriteriaLoader: false });
      }
    }
  };

  validationCreateMadicalStatus = () => {
    if (!this.state.criteriaHeadName) {
      errorToast("Name field is required.");
      return false;
    } else if (this.state.inputList.length === 0) {
      errorToast("Plaese add atleast one criterias");
    } else {
      return true;
    }
  };

  fetchMedicalStatusWithCriterias = async () => {
    this.setState({ pickerLoader: true });
    try {
      const res = await standardPostApi(
        "get_all_medical_status_with_criterias",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team_id: this.props.match.params.id,
        },
        true
      );
      if (res.data.code === 200) {
        console.log("reponse criteria", res.data?.data?.medical_status);
        this.setState({
          medicalStatusList: res.data?.data?.medical_status,
          madicalPicker: res.data?.data?.medical_status[0].id,
          selectPickerName: res.data.data.medical_status[0].name,
          selectPickerObject: res.data.data.medical_status[0],
        });

        this.state.madicalPicker &&
          this.fetchUserBaseMadicalStatus(res.data?.data?.medical_status[0].id);
      }
    } catch (error) {
      console.log("fetchMedial status", error);
    } finally {
      this.setState({ pickerLoader: false });
    }
  };

  onHandel = (e) => {
    let selectPickerObject = {};

    this.state.medicalStatusList.map((item) => {
      if (e.target.value == item.id) {
        selectPickerObject = item;
      }
    });
    // console.log("selectPickerObject", selectPickerObject);
    this.setState({
      madicalPicker: e.target.value,
      selectPickerObject: selectPickerObject,
      selectPickerName: selectPickerObject?.name,
    });
    this.fetchUserBaseMadicalStatus(e.target.value);
  };

  handleDateChange = async (date) => {
    await this.setState({ date: date });
    this.fetchUserBaseMadicalStatus(this.state.madicalPicker);
  };

  fetchUserBaseMadicalStatus = async (medical_status_id) => {
    const date = moment(this.state.date).format("YYYY-MM-DD");
    this.setState({ resultSetLoader: true });
    try {
      const res = await standardPostApi(
        "user_based_medical_status_data",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team_id: this.props.match.params.id,
          date_val: date,
          medical_status_id: medical_status_id,
        },
        true
      );
      if (res.data.code === 200) {
        console.log("This is response of Result set", res.data.data);
        this.setState({
          madicalStatus: res?.data?.data?.medcial_status,
          playerResultSet: res?.data?.data?.players,
        });
      }
    } catch (error) {
      console.error("medical Result Set", error);
    } finally {
      this.setState({ resultSetLoader: false });
    }
  };

  toggleAddResultModal = (item, data) => {
    console.log("item", item);
    console.log("data", data);
    this.setState({
      addResultModal: true,
      playerObj: item,
      criteriaObj: data,
      comment: data?.user_medical_status?.comment,
      inOutSwitchBtn: data?.user_medical_status?.type,
    });
  };

  closeAddResultModal = () => {
    this.setState({ addResultModal: false });
  };

  handelAddUserMadicalStatus = async () => {
    const { playerObj, criteriaObj } = this.state;

    const entryDate = moment(this.state.date).format("YYYY-MM-DD");
    const isValid = this.addUserMadicalStatusValidation();

    if (isValid) {
      this.setState({ addLodaer: true });
      try {
        const res = await standardPostApi(
          "add_user_medical_status",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            team_id: this.props.match.params.id,
            player_id: playerObj.user_id,
            criteria_id: criteriaObj.id,
            comment: this.state.comment,
            entry_date: entryDate,
            type: this.state.presentStatus,
          },
          true
        );
        if (res.data.code === 200) {
          console.log("Response of add user Madical status", res.data);
          successToast(res.data.message);
          this.setState({ addResultModal: false, comment: "" });
          this.fetchUserBaseMadicalStatus(this.state.madicalPicker);
        }
      } catch (error) {
        ContactsOutlined.error("add user madical status", error);
      } finally {
        this.setState({ addLodaer: false });
      }
    }
  };

  addUserMadicalStatusValidation = () => {
    if (!this.state.comment) {
      this.setState({
        commentError: "Comment field is required.",
      });
      return false;
    } else {
      return true;
    }
  };

  handleAddDateChange = (date) => {
    this.setState({ dateAdd: date });
  };

  toggleViewModal = (item, data) => {
    this.setState({
      viewModal: !this.state.viewModal,
      playerObj: item,
      criteriaObj: data,
      userStatusObj: data.user_medical_status[0],
    });
  };

  closeViewModal = () => {
    this.setState({
      viewModal: false,
    });
  };

  toggleDeleteMedicalCriteriaModal = () => {
    this.setState({ deleteCriteriaModal: !this.state.deleteCriteriaModal });
  };

  handelDeleteMadicalStatus = async () => {
    this.setState({ deleteLoader: true });
    try {
      const res = await standardPostApi(
        "delete_medical_status",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          id: this.state.madicalPicker,
        },
        true
      );
      if (res.data.code === 200) {
        console.log("response of delete status", res.data);
        successToast(res.data.message);
        this.setState({ deleteCriteriaModal: false });
        this.fetchMedicalStatusWithCriterias();
      }
    } catch (error) {
      console.error("delete status error", error);
    } finally {
      this.setState({ deleteLoader: false });
    }
  };

  render() {
    console.log("this.state.playerResultSet", this.state.playerResultSet);

    // const isAvalable = [];
    // const result = this.state.playerResultSet.map((item) => {
    //   item.medical_status.map((data) => {
    //     isAvalable.push(data);
    //   });
    // });

    // console.log("isAvalable", isAvalable);
    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid pr-0">
              <div className=" testing_protocol_react">
                <div className="d-md-flex align-items-center ">
                  <ol className="breadcrumb mb-4 mb-lg-0">
                    <li className="breadcrumb-item">
                      <Link
                        to={`/myplayers/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                      >
                        <Tooltip arrow title={`Back to  my players page`}>
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <i
                              className="fa fa-chevron-circle-left"
                              aria-hidden="true"
                              style={{
                                color: "#2F84CA",
                                fontSize: "30px",

                                marginRight: "10px",
                              }}
                            ></i>
                            <span style={{ fontSize: "20px" }}>
                              {this.props.match.params.teamname}
                            </span>
                          </span>
                        </Tooltip>
                      </Link>
                    </li>
                  </ol>
                </div>
                <h4>
                  Medical Criteria {">"}
                  <span style={{ marginLeft: "5px" }}>
                    {this.state.selectPickerName}
                  </span>
                </h4>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className="pt-4 protocole d-md-flex">
                    <div className="dropdown">
                      <div>
                        <select
                          className="btn protocol_btn dropdown-toggle w-100"
                          name="madicalPicker"
                          value={this.state.madicalPicker}
                          onChange={this.onHandel}
                        >
                          {!this.state.pickerLoader &&
                            this.state.medicalStatusList.length === 0 && (
                              <option value="">
                                Sorry! no medical status available
                              </option>
                            )}
                          {this.state.medicalStatusList.length !== 0 &&
                            this.state.medicalStatusList.map((item) => {
                              return (
                                <option
                                  className="dropdown-item dropdown-menu react_select_menu"
                                  key={item.id}
                                  value={item.id}
                                >
                                  {item.name}
                                </option>
                              );
                            })}
                        </select>

                        {this.state.pickerLoader && (
                          <span style={{ position: "relative" }}>
                            <i
                              className="fa fa-spinner fa-spin fa-3x fa-fw"
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

                    <ul className="list-inline ml-md-5 mt-4 mt-md-0">
                      <li>
                        <button
                          className="Create_btn"
                          onClick={() => this.toggleCriteriaModal()}
                          style={{ cursor: "pointer" }}
                        >
                          Create
                        </button>
                      </li>
                      &nbsp;
                      <li>
                        <button
                          className="testing_protocol_delete"
                          onClick={() =>
                            this.toggleDeleteMedicalCriteriaModal()
                          }
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                  {this.state.madicalStatus.length !== 0 && (
                    <div style={{ width: "15%" }}>
                      <div className="dropdown">
                        <div className="form-group">
                          <DatePicker
                            selected={this.state.date}
                            onChange={this.handleDateChange}
                            name="DateOfBirth"
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                            maxDate={new Date()}
                            showMonthDropdown
                            showYearDropdown
                            placeholderText="dd/MM/yyyy"
                            dropdownMode="select"
                            ref={(ref) => (this.accordionContent = ref)}
                          />
                          <img
                            className="celender_img "
                            src={Calander}
                            alt={Calander}
                            onClick={() => this.accordionContent.onInputClick()}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {!this.state.pickerLoader &&
                  !this.state.resultSetLoader &&
                  this.state.madicalPicker &&
                  this.state.madicalStatus.length === 0 && (
                    <NoDataFound
                      height={250}
                      width={250}
                      text="No medical criteria  avalable yet"
                    />
                  )}

                {this.state.resultSetLoader ? (
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
                      // className="fa fa-spinner fa-pulse fa-3x fa-fw"
                      style={{
                        color: "var(--appBlue2)",
                        fontSize: "50px",

                        // marginTop: "50px",
                      }}
                    />
                  </div>
                ) : (
                  <div className="table-responsive mt-5 table_react_cursor">
                    <table className="table ">
                      <thead>
                        <tr className="react_Testing_Table">
                          {this.state.madicalStatus.length !== 0 && (
                            <>
                              <th>Player Name</th>
                              <th>
                                {" "}
                                <span
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  Status
                                </span>
                              </th>
                            </>
                          )}
                          {this.state.madicalStatus.length !== 0 &&
                            this.state.madicalStatus.map((item) => {
                              return (
                                <th key={item.id}>
                                  <span
                                    style={{
                                      marginLeft: "24px",
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {item?.name}
                                  </span>
                                </th>
                              );
                            })}
                        </tr>
                      </thead>

                      <tbody>
                        {this.state.playerResultSet.length !== 0 &&
                          this.state.playerResultSet.map((item) => {
                            return (
                              <tr>
                                <td>
                                  {item?.user_first_name} {item?.user_last_name}
                                </td>
                                {item?.is_available == null ? (
                                  <td>
                                    <span
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      -
                                    </span>
                                  </td>
                                ) : (
                                  <td>
                                    {" "}
                                    <span
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >{`${
                                      item.is_available === false
                                        ? "Not Available"
                                        : "Available"
                                    }`}</span>
                                  </td>
                                )}

                                {item.medical_status.map((data) => {
                                  return (
                                    <td key={data.id}>
                                      {/* {data.user_medical_status.length !== 0 ? (
                                        <span
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <Tooltip
                                            arrow
                                            title={`View ${item?.user_first_name} ${item?.user_last_name} ${data?.name}`}
                                          >
                                            <Button
                                              variant="contained"
                                              // color="primary"
                                              style={{
                                                marginLeft: "20px",
                                                backgroundColor: "#2F84CA",
                                                color: "#fff",
                                              }}
                                              onClick={() =>
                                                this.toggleViewModal(item, data)
                                              }
                                            >
                                              <RemoveRedEyeIcon />
                                            </Button>
                                          </Tooltip>
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <Tooltip
                                            arrow
                                            title={`Add  ${item?.user_first_name} ${item?.user_last_name} ${data?.name}`}
                                          >
                                            <Button
                                              variant="contained"
                                              // color="primary"
                                              style={{
                                                marginLeft: "20px",
                                                backgroundColor: "#2F84CA",
                                                color: "#fff",
                                              }}
                                              onClick={() =>
                                                this.toggleAddResultModal(
                                                  item,
                                                  data
                                                )
                                              }
                                            >
                                              Add
                                            </Button>
                                          </Tooltip>
                                        </span>
                                      )} */}

                                      <span
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <Tooltip
                                          arrow
                                          title={`Edit  ${item?.user_first_name} ${item?.user_last_name} ${data?.name}`}
                                        >
                                          <Button
                                            variant="contained"
                                            // color="primary"
                                            style={{
                                              marginLeft: "20px",
                                              backgroundColor: "#2F84CA",
                                              color: "#fff",
                                            }}
                                            onClick={() =>
                                              this.toggleAddResultModal(
                                                item,
                                                data
                                              )
                                            }
                                          >
                                            <EditIcon />
                                          </Button>
                                        </Tooltip>
                                      </span>
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
        <Footer />

        <MadicalCriteriaModal
          show={this.state.criteriaModal}
          onHide={this.toggleCriteriaModal}
          parentState={this.state}
          onChange={(e) => this.onChange(e)}
          // toggleCb={this.toggleCb}
          toggleTypeButton={this.toggleTypeButton}
          addNewCriteria={this.addNewCriteria}
          handelCreateMadicalStatus={this.handelCreateMadicalStatus}
          deleteEvent={this.deleteEvent}
        />

        <AddCriteriaResutModal
          show={this.state.addResultModal}
          onHide={this.closeAddResultModal}
          parentState={this.state}
          onChange={this.onChange}
          handleAddDateChange={this.handleAddDateChange}
          handelAddUserMadicalStatus={this.handelAddUserMadicalStatus}
          selectPickerName={this.state.selectPickerName}
          toggleTypeButton={this.toggleTypeButton}
          toggleTypeOutButton={this.toggleTypeOutButton}
        />

        {/* <ViewMedicalCriteriaModal
          onHide={this.closeViewModal}
          show={this.state.viewModal}
          parentState={this.state}
          selectPickerName={this.state.selectPickerName}
        /> */}

        <DeleteMedicalCriteriaModal
          onHide={this.toggleDeleteMedicalCriteriaModal}
          show={this.state.deleteCriteriaModal}
          selectPickerName={this.state.selectPickerName}
          handelDeleteMadicalStatus={this.handelDeleteMadicalStatus}
          deleteLoader={this.state.deleteLoader}
        />
      </div>
    );
  }
}

export default MadicalRoom;
