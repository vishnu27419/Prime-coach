import { Button, Tooltip } from "@material-ui/core";
import CoachHeader from "container/PublicLayout/CoachHeader";
import Footer from "container/PublicLayout/Footer";
import React, { Component } from "react";
import CreateStatisticModal from "./CreateStatisticModal";
import ResultTable from "./ResultTable";
import { Link } from "react-router-dom";
import {
  standardPostApi,
  standardPostApiJsonBased,
} from "container/API/ApiWrapper";
import { errorToast, successToast } from "utils/toastMessage";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteStatisticModal from "./DeleteStatisticModal";
import NoDataFound from "component/lottiLoader/LottiLoader";
import player from "Custom/images/player.png";
export class CoachStatistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createModal: false,
      statisticName: "",
      awayTeam: "",
      criteria: "",
      inputList: [],
      criteriaError: "",
      showStatistics: [],
      statisticsId: "",
      // statisticsName: "",
      selectPickerObject: {},
      isLoading: false,
      createLoader: false,
      awayTeamAddModal: false,
      awayTeamList: [],
      awayTeamName: "",
      awayTeamError: "",
      addAwayTeamLoader: false,
      resultSetModal: false,
      homeTeamValue: "",
      awayTeamValue: "",
      crateStatisticResultLoader: false,
      homeTeamPlayerValueError: "",
      playerPickerError: "",
      deleteModal: false,
      statisticCriteriaId: "",
      statisticResultArray: [],
      resultsetLoader: false,
      disableCloaseButton: false,
      playerList: [],
      playerPicker: "",
      playerResultValue: "",
      playerListObj: {},
      viewPlayerModal: false,
      playerResultList: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log("this.satte", this.state);
  };

  onSelectChange = (e) => {
    let selectPickerObject = {};

    this.state.playerList.map((item) => {
      if (e.target.value == item.user_id) {
        selectPickerObject = item;
      }
    });
    console.log("event", selectPickerObject?.player_result?.player_value);
    if (selectPickerObject?.player_result?.player_value === undefined) {
      this.setState({
        playerPicker: e.target.value,
        playerListObj: selectPickerObject,
        playerResultValue: 0,
      });
    } else {
      this.setState({
        playerPicker: e.target.value,
        playerListObj: selectPickerObject,
        playerResultValue: selectPickerObject?.player_result?.player_value,
      });
    }

    this.setState({ playerPicker: e.target.value });
    console.log("this.satte", this.state.playerPicker);
  };

  toggleCrateModal = () => {
    this.setState({
      createModal: !this.state.createModal,
      awayTeam: "",
      inputList: [],
      statisticName: "",
      criteria: "",
    });
  };

  addNewStatistic = async () => {
    const { inputList, criteria } = this.state;
    const isValid = this.addNewStatisticValidation();

    if (isValid) {
      inputList.push({
        name: criteria,
        id: Math.random(),
      });

      await this.setState({
        inputList,
        criteria: "",
      });
    }
  };

  deleteEvent = (index) => {
    console.log("index", index);
    const copyPostArray = Object.assign([], this.state.inputList);
    copyPostArray.splice(index, 1);
    this.setState({
      inputList: copyPostArray,
    });
  };

  addNewStatisticValidation = () => {
    if (!this.state.criteria) {
      this.setState({
        criteriaError: "Criteria field is required.",
      });
      return false;
    } else {
      return true;
    }
  };

  handelCreateStatistics = async () => {
    console.log("inpuut list", this.state.inputList);

    let criteriaList = [];

    this.state.inputList.map((item) => {
      criteriaList.push({ name: item.name });
    });

    console.log("criteriaLIST", criteriaList);

    let data = {
      access_token: await localStorage.getItem("access_token"),
      name: this.state.statisticName,
      home_team_id: this.props.match.params.id,
      away_team_id: this.state.awayTeam,
      criterias: criteriaList,
    };

    const isValid = this.createStatisticsValidation();

    if (isValid) {
      this.setState({ createLoader: true, disableCloaseButton: true });
      try {
        const res = await standardPostApiJsonBased(
          "create_statistics",
          undefined,
          data,
          true
        );

        if (res.data.code === 200) {
          console.log("response of create statiscics", res.data);
          successToast(res.data.message);
          this.setState({ createModal: false });
          this.fetchStatisticsWithCreteria();
        }
      } catch (error) {
        console.error("create_statistics error", error);
      } finally {
        this.setState({ createLoader: false, disableCloaseButton: false });
      }
    }
  };

  createStatisticsValidation = () => {
    if (!this.state.statisticName) {
      errorToast("Name field is required.");
      return false;
    } else if (!this.state.awayTeam) {
      errorToast("Away team field is required.");
      return false;
    } else if (this.state.inputList.length === 0) {
      errorToast("Plaese add atleast one criterias");
    } else {
      return true;
    }
  };

  componentDidMount() {
    this.fetchStatisticsWithCreteria();
    this.fetchAwayTeam();
  }

  fetchStatisticsWithCreteria = async () => {
    this.setState({ isLoading: true });
    try {
      const res = await standardPostApi(
        "get_statistics_with_criteria",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team_id: this.props.match.params.id,
        },
        true
      );

      if (res.data.code === 200) {
        console.log("Response of Statistics", res.data.data.statistics);

        console.log("length", res.data.data.statistics.length);

        if (res.data.data.statistics.length === 0) {
          this.setState({
            showStatistics: [],
            statisticsId: "",
            selectPickerObject: {},
            statisticResultArray: [],
          });
        } else {
          this.setState({
            showStatistics: res.data?.data?.statistics,
            statisticsId: res.data?.data?.statistics[0].id,
            // statisticsName: res.data?.data?.statistics[0].name,
            selectPickerObject: res.data?.data?.statistics[0],
          });
        }
        res.data.data.statistics.length !== 0 &&
          this.fetchStatisticResult(this.state.statisticsId);
        res.data.data.statistics.length !== 0 &&
          this.fetchAllStatisticCriteriaResultForPlayer(
            this.state.statisticsId
          );
      }
    } catch (error) {
      console.error("error of fetchStatisticsWithCreteria", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onHandel = (e) => {
    let selectPickerObject = {};
    this.state.showStatistics.map((item) => {
      if (e.target.value == item.id) {
        selectPickerObject = item;
      }

      this.setState({
        statisticsId: e.target.value,
        // statisticsName: selectPickerObject.name,
        selectPickerObject: selectPickerObject,
      });
    });
    this.fetchStatisticResult(e.target.value);
    this.fetchAllStatisticCriteriaResultForPlayer(e.target.value);

    // this.fetchStatisticResultForPlayer(e.target.value);
  };

  toggleAwayTeamAddModal = () => {
    this.setState({
      awayTeamAddModal: !this.state.awayTeamAddModal,
      awayTeamName: "",
    });
  };

  fetchAwayTeam = async () => {
    try {
      const res = await standardPostApi(
        "get_away_teams",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team_id: this.props.match.params.id,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("Response of fetch away team", res.data.data);
        this.setState({ awayTeamList: res.data?.data?.away_teams });
      }
    } catch (error) {
      console.error("fetch away team", error);
    }
  };

  handelAddAwayTeam = async () => {
    const isValid = this.validationAddAwayTeam();
    if (isValid) {
      this.setState({ addAwayTeamLoader: true });
      try {
        const res = await standardPostApi(
          "create_away_team",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            name: this.state.awayTeamName,
            team_id: this.props.match.params.id,
          },
          true
        );
        if (res.data.code === 200) {
          console.log("response of handel add away team ", res.data.data);
          successToast(res.data.message);
          this.fetchAwayTeam();
          this.setState({ awayTeamAddModal: false, awayTeamName: "" });
        }
      } catch (error) {
        console.error("handel add away team error", error);
      } finally {
        this.setState({ addAwayTeamLoader: false });
      }
    }
  };

  validationAddAwayTeam = () => {
    if (!this.state.awayTeamName) {
      this.setState({
        awayTeamError: "Away team name field is required.",
      });
      return false;
    } else {
      return true;
    }
  };

  fetchStatisticResult = async (staId) => {
    this.setState({ resultsetLoader: true });
    try {
      const res = await standardPostApi(
        "get_statistic_results",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          statistic_id: staId,
          team_id: this.props.match.params.id,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log(
        //   "Response of Statistic  Result-->",
        //   res.data.data.statistic_result
        // );
        this.setState({
          statisticResultArray: res.data?.data?.statistic_result,
        });
      }
    } catch (error) {
      console.log("fetch Statistic Result", error);
    } finally {
      this.setState({ resultsetLoader: false });
    }
  };

  handelCrateStatisticResult = async () => {
    const { selectPickerObject } = this.state;
    console.log("this.state.playerResultValue", this.state.playerResultValue);

    this.setState({ crateStatisticResultLoader: true });
    try {
      const res = await standardPostApiJsonBased(
        "create_statistic_result_for_players",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          statistic_criteria_id: this.state.statisticCriteriaId,
          home_team_id: selectPickerObject?.home_team?.id,
          away_team_id: selectPickerObject?.away_team?.id,
          away_team_value: this.state.awayTeamValue,
          player_id: this.state.playerPicker,
          player_value:
            this.state.playerResultValue === undefined
              ? 0
              : this.state.playerResultValue,
        },
        true
      );
      if (res.data.code === 200) {
        console.log("Response of Create Statistic Result", res.data);
        this.setState({
          playerPickerError: "",
          homeTeamPlayerValueError: "",
          playerResultValue: "",
          awayTeamValue: "",
        });
        this.fetchStatisticResult(this.state.statisticsId);
        this.closeReseltSetModal();
        this.fetchAllStatisticCriteriaResultForPlayer(this.state.statisticsId);
      }
    } catch (error) {
      console.error("create statistic result", error);
    } finally {
      this.setState({ crateStatisticResultLoader: false });
    }
    // }
  };

  fetchStatisticResultForPlayer = async (statisticId) => {
    try {
      const res = await standardPostApi(
        "get_statistic_result_for_players",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          statistic_criteria_id: statisticId,
          team_id: this.props.match.params.id,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("Response of Statistics For Player", res.data.data);
        this.setState({
          playerList: res?.data?.data?.players,
          playerPicker: res?.data?.data?.players[0]?.user_id,
          playerListObj: res?.data?.data?.players[0],
          playerResultValue:
            res?.data?.data?.players[0]?.player_result?.player_value,
        });
      }
    } catch (error) {
      console.error("error of statistic Result for Player", error);
    }
  };

  togglerResultSetModal = (item) => {
    this.setState({
      resultSetModal: !this.state.resultSetModal,
      statisticCriteriaId: item?.criteria?.id,
      homeTeamValue: item?.criteria?.home_team?.result,
      awayTeamValue: item?.criteria?.away_team?.result,
    });

    this.fetchStatisticResultForPlayer(item?.id);
  };

  closeReseltSetModal = () => {
    this.setState({ resultSetModal: false });
  };

  toggleDeleteStatisticModal = () => {
    this.setState({ deleteModal: !this.state.deleteModal });
  };

  handelDeleteStatistic = async () => {
    try {
      const res = await standardPostApi(
        "delete_statistics",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          id: this.state.statisticsId,
        },
        true
      );
      if (res.data.code === 200) {
        console.log("response", res.data.data);
        successToast(res.data.message);
        this.toggleDeleteStatisticModal();
        this.fetchStatisticsWithCreteria();
      }
    } catch (error) {
      console.error("error of delete Statistic", error);
    }
  };

  toggleViewPlayerModal = async () => {
    this.setState({ viewPlayerModal: !this.state.viewPlayerModal });
  };

  get_all_statistic_criteria_result_for_players;

  fetchAllStatisticCriteriaResultForPlayer = async (starId) => {
    try {
      const res = await standardPostApi(
        "get_all_statistic_criteria_result_for_players",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          statistic_id: starId,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("Response of Player Result set", res.data.data);
        this.setState({ playerResultList: res.data?.data });
      }
    } catch (error) {
      console.error("error of all statistic criteria Result for player", error);
    }
  };

  render() {
    const { showStatistics, selectPickerObject } = this.state;

    const homeTeamObj = selectPickerObject?.home_team;
    const awayTeamObj = selectPickerObject.away_team;

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

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h4>
                    Statistic {">"}
                    <span style={{ marginLeft: "5px" }}>
                      {selectPickerObject.name}
                    </span>
                  </h4>
                </div>

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
                          value={this.state.statisticsId}
                          onChange={this.onHandel}
                        >
                          {!this.state.isLoading &&
                            showStatistics.length === 0 && (
                              <option>No Statistic avalable yet</option>
                            )}

                          {showStatistics.map((item) => {
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
                        {this.state.isLoading && (
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
                          onClick={() => this.toggleCrateModal()}
                          style={{ cursor: "pointer" }}
                        >
                          Create
                        </button>
                      </li>
                      &nbsp; &nbsp; &nbsp;
                      <li>
                        <button
                          className="testing_protocol_delete"
                          onClick={() => this.toggleDeleteStatisticModal()}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    {this.state.statisticResultArray?.length !== 0 && (
                      <div className="dropdown">
                        <div className="form-group">
                          <Button
                            variant="contained"
                            color="primary"
                            style={{
                              marginRight: "3%",
                              color: "#fff",
                              backgroundColor: "#338AB7",
                            }}
                            onClick={() => this.toggleViewPlayerModal()}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={player}
                                alt="No_Image_Available"
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  marginTop: "7px",
                                }}
                              />{" "}
                              <span style={{ fontWeight: "bold" }}>
                                View Player Result
                              </span>
                            </div>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {!this.state.isLoading &&
                  !this.state.resultsetLoader &&
                  this.state.statisticResultArray?.length === 0 && (
                    <NoDataFound
                      height={250}
                      width={250}
                      text="No Statistic criteria  avalable yet"
                    />
                  )}

                <div className="table-responsive mt-5 table_react_cursor row">
                  {/* {this.state.statisticResultArray.length===0} */}
                  {this.state.resultsetLoader ? (
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
                    <>
                      {this.state.statisticResultArray?.length !== 0 && (
                        <div className="col-md-12">
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              fontSize: "22px",
                            }}
                          >
                            Criteria Board
                          </p>

                          <ResultTable
                            selectPickerObject={selectPickerObject}
                            togglerResultSetModal={this.togglerResultSetModal}
                            parentState={this.state}
                            homeTeamObj={homeTeamObj}
                            awayTeamObj={awayTeamObj}
                            onChange={this.onChange}
                            handelCrateStatisticResult={
                              this.handelCrateStatisticResult
                            }
                            statisticResultArray={
                              this.state.statisticResultArray
                            }
                            onSelectChange={this.onSelectChange}
                            playerListObj={this.state.playerListObj}
                            closeReseltSetModal={this.closeReseltSetModal}
                            toggleViewPlayerModal={this.toggleViewPlayerModal}
                            playerResultList={this.state.playerResultList}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />

        <CreateStatisticModal
          show={this.state.createModal}
          onHide={this.toggleCrateModal}
          onChange={this.onChange}
          parentState={this.state}
          homeTeamName={this.props.match.params.teamname}
          addNewStatistic={this.addNewStatistic}
          deleteEvent={this.deleteEvent}
          handelCreateStatistics={this.handelCreateStatistics}
          toggleAwayTeamAddModal={this.toggleAwayTeamAddModal}
          handelAddAwayTeam={this.handelAddAwayTeam}
        />

        <DeleteStatisticModal
          onHide={this.toggleDeleteStatisticModal}
          show={this.state.deleteModal}
          selectPickerObject={selectPickerObject}
          handelDeleteStatistic={this.handelDeleteStatistic}
        />
      </div>
    );
  }
}

export default CoachStatistic;
