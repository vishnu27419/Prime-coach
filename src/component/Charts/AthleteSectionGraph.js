import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { toast } from "react-toastify";

class AthleteSectionGraph extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  TryOnClickOfGraph = async () => {
    toast.success("this is a toast ");
  };
  render() {
    return (
      <div
        style={{
          position: "relative",
          // width: 1050,
          width: "100%",
        }}
      >
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
            onClick: (e, element) => this.props.onPointClick(e, element),

            title: {
              display: true,
              text: "Weekly Assigned Average Intensity - Period - Home",
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

export default AthleteSectionGraph;
