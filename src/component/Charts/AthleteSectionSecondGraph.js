import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class AthleteSectionSecondGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div style={{ width: "100%" }}>
        <Line
          data={{
            labels: this.props.graphLabels,
            datasets: [
              {
                label: "",
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
              text: `Weekly Average Intensities - ${this.props.workoutLocation}`,
              fontSize: 20,
            },
            legend: {
              display: false,
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

export default AthleteSectionSecondGraph;
