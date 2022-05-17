import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class TranningPlanGraph extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <Line
          data={{
            labels: this.props.graphLabels,
            datasets: [
              {
                label: "My First dataset",
                backgroundColor: ["rgb(255, 0, 0)"],
                borderColor: "rgb(255, 0, 0)",
                data: this.props.graphData,
                fill: false,
              },
            ],
          }}
          options={{
            title: {
              display: true,
              text: `Weekly Assigned Average Intensity - Period - ${this.props.workoutLocation}`,
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "top",
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
    );
  }
}

export default TranningPlanGraph;
