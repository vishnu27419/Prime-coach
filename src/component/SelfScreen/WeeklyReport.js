import React from "react";
import ManageRecipientsModal from "../SelfScreen/ManageRecipientsModal";
import { standardPostApi } from "../../container/API/ApiWrapper";
class WeeklyReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = { manageRecipientsModal: false, listUserActivity: [] };
  }

  componentDidMount() {
    this.list_user_activity();
  }

  showManageRecipientsModal = async () => {
    await this.setState({
      manageRecipientsModal: !this.state.manageRecipientsModal,
    });
  };

  hideManageRecipientsModal = async () => {
    await this.setState({ manageRecipientsModal: false });
  };

  list_user_activity = async () => {
    const weekId = this.props.startWorkoutArray.weeks.find((data) => data);
    try {
      const res = await standardPostApi(
        "list_user_activity",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: this.props.startWorkoutArray.id,
          annual_training_program_week_id: weekId.id,
        },
        true
      );
      if (res.data.code === 200) {
        await this.setState({ listUserActivity: res.data.data.activities });
        // console.log("RESPONSE OF LIST USER ACTIVITY", res.data.data.activities);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // console.log("WeeekReport", this.props.startWorkoutArray);
    return (
      <div className="dashboard-wrapper">
        <section className="report-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="week_section">
                  <div className="heading mb-4 d-lg-flex justify-content-between">
                    <h3>Weekly Report</h3>
                    {/* <div className="">
                      <button
                        className="manage_btn_react"
                        // onClick={(e) => {
                        //   this.showManageRecipientsModal();
                        // }}
                        onClick={() => alert("Coming soon!")}
                      >
                        Manage Recipients
                      </button>

                      <button
                        className="manage_btn_react"
                        // onClick={(e) => {
                        //   this.showManageRecipientsModal();
                        // }}
                        onClick={() => alert("Coming soon!")}
                      >
                        Send Report
                      </button>
                    </div> */}
                  </div>
                  <div className="table-responsive">
                    <table className="table mb-0">
                      <thead>
                        <tr>
                          {this.state.listUserActivity.map((data, index) => {
                            return <th key={index}>{data.key}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {this.state.listUserActivity.map((item, index) => {
                            return <td key={index}>{item.value}</td>;
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ManageRecipientsModal
          show={this.state.manageRecipientsModal}
          onHide={this.hideManageRecipientsModal}
        />
      </div>
    );
  }
}

export default WeeklyReport;
