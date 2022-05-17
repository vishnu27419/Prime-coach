import { Button } from "@material-ui/core";
import React, { Component } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { standardPostApi } from "container/API/ApiWrapper";
import AthleteCoachLibraryModal from "./AthleteCoachLibraryModal";
import NoDataFound from "component/lottiLoader/LottiLoader";
import { successToast } from "utils/toastMessage";

export class AthleteCoachLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewModal: false,
      libraryList: [],
      detailObj: {},
      isLoading: false,
      selectPicker: "active",
      enableDisableBtnId: "",
      enableDiableLoader: false,
    };
  }

  componentDidMount() {
    this.fetchLibraryForPlayer();
  }

  onSelectChange = (e) => {
    this.setState({ selectPicker: e.target.value });
    this.fetchLibraryForPlayer();
  };

  fetchLibraryForPlayer = async () => {
    this.setState({ isLoading: true });
    try {
      const res = await standardPostApi(
        "get_assigned_coach_library_for_player",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true
      );

      if (res.data.code === 200) {
        // console.log("Resposnse of Library for player", res.data.data);
        const temp = res.data.data.filter(
          (x) => x?.is_enabled === this.state.selectPicker
        );

        // console.log("temp", temp);

        this.setState({ libraryList: temp });
      }
    } catch (error) {
      console.error("Error of libery", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  toggleViewModal = (item) => {
    this.setState({ viewModal: !this.state.viewModal, detailObj: item });
  };

  handelEndableDisable = async (item) => {
    this.setState({ enableDisableBtnId: item.id, enableDiableLoader: true });
    try {
      const res = await standardPostApi(
        "enable_disable_coach_library",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          coach_library_id: item.id,
        },
        true
      );
      if (res.data.code === 200) {
        console.log("Responsne of Enable disable Coach library", res.data);
        successToast(res.data.message);
        this.fetchLibraryForPlayer();
      }
    } catch (error) {
      console.error("error enable diable coach lib player", error);
    } finally {
      this.setState({ enableDiableLoader: false });
    }
  };

  render() {
    const { selectPicker } = this.state;

    return (
      <div className="dashboard-wrapper">
        <section className="report-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="week_section">
                  <div className="heading mb-4 d-lg-flex justify-content-between">
                    <h3>Coach Library</h3>

                    <div>
                      <select
                        id=""
                        className="btn protocol_btn dropdown-toggle w-100"
                        name="selectPicker"
                        value={selectPicker}
                        onChange={this.onSelectChange}
                      >
                        <option
                          className="dropdown-item dropdown-menu react_select_menu"
                          value="active"
                        >
                          Active
                        </option>
                        <option
                          className="dropdown-item dropdown-menu react_select_menu"
                          value="inactive"
                        >
                          Inactive
                        </option>
                      </select>
                    </div>
                  </div>

                  {!this.state.isLoading &&
                    this.state.libraryList.length === 0 && (
                      <NoDataFound
                        height={250}
                        width={250}
                        // text="No coach library assigned yet."
                        text={`There is no ${this.state.selectPicker} coach library.`}
                      />
                    )}

                  {this.state.isLoading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <i
                        className="fa fa-spinner fa-spin fa-3x fa-fw"
                        // className="fa fa-spinner fa-pulse fa-3x fa-fw"
                        style={{
                          color: "var(--appBlue2)",
                          fontSize: "40px",
                          // marginTop: "50px",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      // className="table-responsive coaches-scroll"
                      className="table-responsive "

                      // style={{ height: "500px", overflow: "scroll" }}
                    >
                      <table
                        className="table mb-0"
                        //   style={{ overflow: "scroll" }}
                      >
                        {this.state.libraryList.length !== 0 && (
                          <thead>
                            <tr>
                              <th>Library Name</th>
                              <th>
                                {" "}
                                <span
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  View Library
                                </span>
                              </th>
                              <th>
                                {" "}
                                <span
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  Active/Inactive
                                </span>
                              </th>
                            </tr>
                          </thead>
                        )}
                        <tbody>
                          {this.state.libraryList !== 0 &&
                            this.state.libraryList
                              .filter(
                                (x) => x.is_enabled === this.state.selectPicker
                              )
                              .map((item, index) => {
                                return (
                                  <tr key={item.id}>
                                    <td>{item?.activity_name}</td>
                                    <td>
                                      <span
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
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
                                            this.toggleViewModal(item)
                                          }
                                        >
                                          <VisibilityIcon />
                                        </Button>
                                      </span>
                                    </td>
                                    <td>
                                      <span
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        {item.is_enabled === "inactive" ? (
                                          <Button
                                            variant="contained"
                                            // color="primary"
                                            // style={{
                                            //   marginLeft: "20px",
                                            //   backgroundColor: "#f0ad4e",
                                            //   color: "#fff",
                                            // }}
                                            onClick={() =>
                                              this.handelEndableDisable(item)
                                            }
                                            style={
                                              this.state.enableDiableLoader &&
                                              this.state.enableDisableBtnId ===
                                                item.id
                                                ? {
                                                    cursor: "not-allowed",
                                                    marginLeft: "20px",
                                                    backgroundColor: "#f0ad4e",
                                                    color: "#fff",
                                                  }
                                                : {
                                                    cursor: "pointer",
                                                    marginLeft: "20px",
                                                    backgroundColor: "#f0ad4e",
                                                    color: "#fff",
                                                  }
                                            }
                                            disabled={
                                              this.state.enableDiableLoader &&
                                              this.state.enableDisableBtnId ===
                                                item.id
                                            }
                                          >
                                            Set As Active{" "}
                                            {this.state.enableDisableBtnId ===
                                              item.id &&
                                              this.state.enableDiableLoader && (
                                                <i
                                                  className="fa fa-spinner fa-spin fa-3x fa-fw"
                                                  style={{
                                                    color: "#fff",
                                                    fontSize: "15px",
                                                  }}
                                                />
                                              )}
                                          </Button>
                                        ) : item.is_enabled === "active" ? (
                                          <Button
                                            variant="contained"
                                            // color="primary"
                                            style={
                                              this.state.enableDisableBtnId ===
                                                item.id &&
                                              this.state.enableDiableLoader
                                                ? {
                                                    cursor: "not-allowed",
                                                    marginLeft: "20px",
                                                    backgroundColor: "#f0ad4e",
                                                    color: "#fff",
                                                  }
                                                : {
                                                    cursor: "pointer",
                                                    marginLeft: "20px",
                                                    backgroundColor: "#f0ad4e",
                                                    color: "#fff",
                                                  }
                                            }
                                            disabled={
                                              this.state.enableDisableBtnId ===
                                                item.id &&
                                              this.state.enableDiableLoader
                                            }
                                            onClick={() =>
                                              this.handelEndableDisable(item)
                                            }
                                          >
                                            Set As Inactive{" "}
                                            {this.state.enableDisableBtnId ===
                                              item.id &&
                                              this.state.enableDiableLoader && (
                                                <i
                                                  className="fa fa-spinner fa-spin fa-3x fa-fw"
                                                  style={{
                                                    color: "#fff",
                                                    fontSize: "15px",
                                                  }}
                                                />
                                              )}
                                          </Button>
                                        ) : null}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <AthleteCoachLibraryModal
          show={this.state.viewModal}
          onHide={this.toggleViewModal}
          detailObj={this.state.detailObj}
        />
      </div>
    );
  }
}

export default AthleteCoachLibrary;
