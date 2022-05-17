import React from "react";

export default class AssignTeams extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggle: false };
  }

  render() {
    console.log("child", this.props.selectedTeam);
    return (
      <div>
        <div className="asign_title">Assign Teams / Users</div>
        <div>
          <h6 style={{ marginBottom: "20px" }}>Select Team</h6>
          <select
            className="form-control"
            value={this.props.selectedTeam}
            onChange={this.props.onHandel}
          >
            <option value="">Select Team</option>

            {this.props.assignTeam &&
              this.props.assignTeam.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="table-responsive mt-4">
          <table className="table table-bordered">
            <thead>
              {this.props.assignTeamUser.length !== 0 && (
                <tr>
                  <th>User</th>
                  <th></th>
                </tr>
              )}
            </thead>
            <tbody>
              {this.props.visiblePreAssignTeamUser && (
                <>
                  {this.props.assignTeamUser &&
                    this.props.assignTeamUser.map((data, index) => {
                      return (
                        <tr key={data.id}>
                          <td>{data.email}</td>
                          <td className="text-center">
                            <button
                              type="button"
                              className={
                                data.already_assigned === 1
                                  ? "assign_Team_remove_React_button"
                                  : "assign_Team_Assign_React_button"
                              }
                              onClick={() =>
                                this.props.user_assign_annual_training_program(
                                  data.id
                                )
                              }
                            >
                              {data.already_assigned === 1
                                ? "Remove"
                                : "Assign"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </>
              )}

              {this.props.visibleUpdateAssignTeamUser && (
                <>
                  {this.props.assignTeamUser &&
                    this.props.assignTeamUser.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.email}</td>
                          <td className="text-center">
                            <button
                              type="button"
                              className={
                                item.already_assigned === 1
                                  ? "assign_Team_remove_React_button"
                                  : "assign_Team_Assign_React_button"
                              }
                              onClick={() =>
                                this.props.user_assign_annual_training_program(
                                  item.id
                                )
                              }
                            >
                              {item.already_assigned === 1
                                ? "Remove"
                                : "Assign"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </>
              )}

              {/* <tr>
                <td>
                  <button className="assign_btn_react_main ">
                    Assign Teams
                  </button>
                </td>
                <td></td>
              </tr> */}
            </tbody>
          </table>

          {this.props.teamPlayerLoader && (
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
          )}
        </div>
      </div>
    );
  }
}
