// import React from "react";
// import Checkbox from "../component/Checkbox/Checkbox";

// class TryCheckBox extends React.Component {
//   constructor(props) {
//     super();
//     this.state = {
//       arrayIs: [
//         { id: "1", first_name: "vishnu", status: "0", checked: false },
//         { id: "2", first_name: "Ram ", status: "0", checked: true },
//         { id: "3", first_name: "Sham", status: "0", checked: false },
//       ],
//       newArray: [],
//     };
//   }

//   toggleCheckBox = async () => {
//     const { arrayIs } = this.state;
//   };

//   render() {
//     return (
//       <div>
//         <h1>Check Box issue Check </h1>
//         <table className="table table-condensed react_workout_table">
//           <thead>
//             <tr>
//               <th>First Name</th>
//               <th>Check Box</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.arrayIs &&
//               this.state.arrayIs.map((item, index) => {
//                 return (
//                   <tr key={item.id}>
//                     <td>{item.first_name}</td>
//                     <td>
//                       <Checkbox
//                         checked={item.checked}
//                         toggleCb={() => this.toggleCb(item.id, index)}
//                       />
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

// export default TryCheckBox;
