import React from "react";

function ForgotPasswordWrapper() {
  return (
    <div className="loader_sec">
      <div className="login-page-wrapper">
        <section className="login_page">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <form action="" className="login_form">
                  <div className="heading text-center">Forgot Password</div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New Password"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ForgotPasswordWrapper;
