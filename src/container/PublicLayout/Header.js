import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../Custom/images/logo.png";
// for jquery in reactJs
import $ from "jquery";
import { findDOMNode } from "react-dom";

class Header extends Component {
  state = {};

  handleToggle = () => {
    const el = findDOMNode(this.refs.toggle);
    $(el).slideToggle();
  };

  render() {
    return (
      <div>
        <header id="header">
          <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container">
              <div className="web-logo">
                {/* <a className="navbar-brand logo" href="javaScript;"> */}
                <Link to="/" className="navbar-brand logo">
                  <img src={logo} className="img-fluid" alt={logo} />
                  <div>
                    <span>Prime</span>
                    <br />
                    Coach
                  </div>
                  {/* </a> */}
                </Link>
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={this.handleToggle}
              >
                {/* <span className="navbar-toggler-icon"></span>  */}
                <span>
                  <i className="fa fa-bars" aria-hidden="true"></i>
                </span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
                ref="toggle"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    {/* <a className="nav-link home" href="home.php"> */}
                    <Link to="/" className="nav-link home">
                      Home <span className="sr-only">(current)</span>
                      {/* </a> */}
                    </Link>
                  </li>
                  <li className="nav-item">
                    {/* <a className="nav-link athlete" href="forathlete.php"> */}
                    <Link to="/forathletes" className="nav-link athlete">
                      For Athletes
                      {/* </a> */}
                    </Link>
                  </li>
                  <li className="nav-item">
                    {/* <a className="nav-link" href="forcoaches.php"> */}
                    <Link to="/forcoach" className="nav-link">
                      For Coaches
                    </Link>
                    {/* </a> */}
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link" href="#">
                      Pricing
                    </a>
                  </li> */}
                  <li className="nav-item">
                    {/* <a className="nav-link" href="loginselection.php"> */}
                    <Link
                      to={`/loginsection/${"athlete"}/${"coach"}`}
                      className="nav-link"
                    >
                      Login
                      {/* </a> */}
                    </Link>
                  </li>
                  <li className="nav-item">
                    {/* <a className="nav-link" href="javaScript;"> */}
                    <Link to="/sportsection" className="nav-link">
                      Free Trial
                    </Link>
                    {/* </a> */}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;

// function Header() {
//   <div>
//     <div>header</div>
//   </div>;
//   return (
// <div>
//   <header id="header">
//     <nav className="navbar navbar-expand-lg navbar-light ">
//       <div className="container">
//         <div className="web-logo">
//           {/* <a className="navbar-brand logo" href="javaScript;"> */}
//           <Link to="/" className="navbar-brand logo">
//             <img src={logo} className="img-fluid" alt={logo} />
//             <div>
//               <span>Prime</span>
//               <br />
//               Coach
//             </div>
//             {/* </a> */}
//           </Link>
//         </div>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//           onClick={this.handleToggle}
//         >
//           {/* <span className="navbar-toggler-icon"></span>  */}
//           <span>
//             <i className="fa fa-bars" aria-hidden="true"></i>
//           </span>
//         </button>

//         <div
//           className="collapse navbar-collapse"
//           id="navbarSupportedContent"
//         >
//           <ul className="navbar-nav ml-auto">
//             <li className="nav-item active">
//               {/* <a className="nav-link home" href="home.php"> */}
//               <Link to="/" className="nav-link home">
//                 Home <span className="sr-only">(current)</span>
//                 {/* </a> */}
//               </Link>
//             </li>
//             <li className="nav-item">
//               {/* <a className="nav-link athlete" href="forathlete.php"> */}
//               <Link to="/forathletes" className="nav-link athlete">
//                 For Athletes
//                 {/* </a> */}
//               </Link>
//             </li>
//             <li className="nav-item">
//               {/* <a className="nav-link" href="forcoaches.php"> */}
//               <Link to="/forcoach" className="nav-link">
//                 For Coaches
//               </Link>
//               {/* </a> */}
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="javaScript;">
//                 Pricing
//               </a>
//             </li>
//             <li className="nav-item">
//               {/* <a className="nav-link" href="loginselection.php"> */}
//               <Link to="/loginsection" className="nav-link">
//                 Login
//                 {/* </a> */}
//               </Link>
//             </li>
//             <li className="nav-item">
//               {/* <a className="nav-link" href="javaScript;"> */}
//               <Link to="/sportsection" className="nav-link">
//                 Free Trial
//               </Link>
//               {/* </a> */}
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   </header>
// </div>
//   );
// }

// export default Header;
