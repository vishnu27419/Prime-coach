import React, { Component } from "react";
import CoachHeader from "../PublicLayout/CoachHeader";
import Footer from "../PublicLayout/Footer";
import { Link } from "react-router-dom";
import { standardPostApi } from "../API/ApiWrapper";
// react toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderWrapper from "../../container/Loader/LoaderWrapper";

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Athelete: [],
      headsArray: [],
      resultsArray: [],
      loader: true,
    };
  }

  componentDidMount() {
    this.list_team_player_report();
  }

  list_team_player_report = async () => {
    try {
      const res = await standardPostApi(
        "list_team_player_report",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team: this.props.match.params.id,
        },
        true
      );
      if (res.data.code === 200) {
        console.log(
          "RESPONSE OF list_team_player_report ->",
          res.data.data.Athelete
        );
        // await this.setState({ Athelete: res.data.data.Athelete });
        let aths = res.data.data.Athelete;
        let head = aths[0].activities;
        let ath_results = [];
        let heads = [];
        aths.forEach((item) => {
          ath_results.push([
            <Link
              to={{
                pathname: `/playerreport/${this.props.match.params.id}/${item.id}/${this.props.match.params.teamname}`,
                state: { player: item },
              }}
            >
              {item.first_name + " " + item.last_name}
            </Link>,
            ...Object.values(item.activities),
          ]);
        });
        heads = ["Player Name", ...Object.keys(head)];
        await this.setState({
          headsArray: heads,
          resultsArray: ath_results,
          loader: false,
        });
        console.log(
          "heads ",
          this.state.headsArray,
          " & ath_results ",
          this.state.resultsArray
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  //

  render() {
    const { headsArray } = this.state;
    // console.log("this is Athlete", this.state.Athelete);
    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid pr-0">
              <div className=" testing_protocol_react">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link
                      to={`/myplayers/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                    >
                      {this.props.match.params.teamname}
                    </Link>
                  </li>
                  <li className="breadcrumb-item">Reports</li>
                </ol>
                {this.state.loader ? (
                  <LoaderWrapper />
                ) : (
                  <div className="table-responsive mt-5">
                    <table className="table">
                      <thead>
                        <tr className="react_Testing_Table">
                          {headsArray.map((item, index) => {
                            return <th key={index}>{item}</th>;
                          })}
                        </tr>
                      </thead>

                      <tbody>
                        {this.state.resultsArray.map((item, index) => {
                          return (
                            <tr className="react_Testing_Table" key={index}>
                              {item.map((i, index) => {
                                return <td key={index}>{i}</td>;
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
      </div>
    );
  }
}

export default Reports;
