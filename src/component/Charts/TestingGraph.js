import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class AthleteSectionSecondGraph extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    // console.log("....graph_Result...graph..", this.props.graph_Result);

    return (
      <div style={{ width: "100%", cursor: "pointer" }}>
        <Bar
          data={{
            labels: this.props.graphLabels,

            datasets: [
              {
                // label: "",
                label: "",
                // backgroundColor: "rgba(30, 139, 195, 0.5)",
                backgroundColor: this.props.graph_colorbg,
                borderColor: this.props.graph_color,
                borderWidth: 2,
                data: this.props.graph_Result,
              },
            ],
          }}
          options={{
            // onClick: (e, element) => alert("hi"),
            title: {
              display: true,
              text: `Team Testing Results for ${"\u0022"}${
                this.props.exercise
              } ${"\u0022"}exercise`,
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
                    min: 0.0,
                    // max: 1000,
                    // stepSize: 5,
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
