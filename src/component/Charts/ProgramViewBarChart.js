import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class ProgramViewBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isLoading } = this.props;
    return (
      <div>
        {isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // marginBottom: "20px",
            }}
          >
            <i
              className="fa fa-spinner fa-spin fa-3x fa-fw"
              // className="fa fa-spinner fa-pulse fa-3x fa-fw"
              style={{
                color: "var(--appBlue2)",
                fontSize: "20px",

                // marginTop: "50px",
              }}
            />
          </div>
        )}
        <div
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <Bar
            data={{
              labels: this.props.graphLabels,
              datasets: [
                {
                  label: "Weekley Volume",
                  backgroundColor: "rgba(30, 139, 195, 0.5)",
                  borderColor: "rgba(30, 139, 195, 1)",
                  borderWidth: 2,
                  data: this.props.graphData,
                },
              ],
            }}
            options={{
              onClick: (e, element) => this.props.onBarClick(e, element),

              title: {
                display: true,
                text: "Average Program View",
                fontSize: 20,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      min: 0,
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default ProgramViewBarChart;
