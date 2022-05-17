import React from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";

// import { ComponentToPrint } from "./ComponentToPrint";

export class ComponentToPrint extends React.PureComponent {
  render() {
    const { trainingSessionReport } = this.props;
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: trainingSessionReport,
        }}
      ></div>
    );
  }
}

class Example extends React.PureComponent {
  render() {
    const { trainingSessionReport } = this.props;
    return (
      <div>
        <ReactToPrint content={() => this.componentRef}>
          <PrintContextConsumer>
            {({ handlePrint }) => (
              <button onClick={handlePrint}>Print this out!</button>
            )}
          </PrintContextConsumer>
        </ReactToPrint>
        <ComponentToPrint
          ref={(el) => (this.componentRef = el)}
          trainingSessionReport={trainingSessionReport}
        />
      </div>
    );
  }
}
export default Example;
