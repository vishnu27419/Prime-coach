import Footer from "container/PublicLayout/Footer";
import Header from "container/PublicLayout/Header";
import React, { Component } from "react";
import ThankyouResponseLotti from "component/lottiLoader/ThankyouResponseLotti";

export class ThankyouResponse extends Component {
  render() {
    return (
      <div className="loader_sec">
        <Header />
        <section className="login_page_react">
          <div className="body-content">
            <div
              className="container"
              style={{ marginBottom: "67px", marginTop: "5%" }}
            >
              <div className="row">
                <div className="col-md-12">
                  {/* <h2 style={{ color: "#fff", textAlign: "center" }}>
                    Thank you for your Response !
                  </h2> */}
                  {/* <h4
                    style={{
                      color: "#ffffff",
                      fontSize: "17px",
                      fontWeight: "100",
                      lineHeight: "50px",
                      marginTop: "5px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Please login again to see Changes.
                  </h4>
                  <div style={{ background: "#fff" }}>
                    <hr />
                  </div> */}
                </div>
              </div>
              <h2
                style={{
                  color: "#555",
                  fontSize: "38px",
                  fontWeight: "500",
                  lineHeight: "50px",
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
              >
                Thank you for your Response !
              </h2>

              <div className="col-md-5 form-align-centre">
                <ThankyouResponseLotti />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default ThankyouResponse;
