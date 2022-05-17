import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newsletterIcon from "../../Custom/images/newsletter_icon.png";
import fbIcon from "../../Custom/images/fb_icon.png";
import twitterIcon from "../../Custom/images/twitter_icon.png";
import instaIcon from "../../Custom/images/insta_icon.png";

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      <Fragment>
        <footer className="footer">
          <div className="container text-center">
            <div className="row">
              <div className="col-lg-3">
                <div className="footer_menu">
                  <h5>Information</h5>
                  <ul>
                    <li>
                      {/* <a href="javaScript;">Privacy Policy</a> */}
                      <Link to="/privacypolicy">Privacy Policy</Link>
                    </li>
                    <li>
                      {/* <a href="javaScript;">Cookie Policy</a> */}
                      <Link to="/cookiepolicy">Cookie Policy</Link>
                    </li>
                    <li>
                      {/* <a href="javaScript;">Terms &amp; Conditions</a> */}
                      <Link to="/termsandconditions">
                        Terms &amp; Conditions
                      </Link>
                    </li>
                    <li>
                      {/* <a href="javaScript;">FAQs</a> */}
                      <Link to="/faqs">FAQs</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="footer_menu">
                  <h5>Follow us</h5>
                  <ul className="social_links">
                    <li>
                      <a href="#">
                        <img
                          src={newsletterIcon}
                          className="img-fluid"
                          alt={newsletterIcon}
                        />{" "}
                        <span>Newsletter</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src={fbIcon} className="img-fluid" alt={fbIcon} />{" "}
                        <span>Facebook</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src={twitterIcon}
                          className="img-fluid"
                          alt={twitterIcon}
                        />{" "}
                        <span>Twitter</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img
                          src={instaIcon}
                          className="img-fluid"
                          alt={instaIcon}
                        />{" "}
                        <span>Instagram</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="footer_menu">
                  <h5>Get in Touch</h5>
                  <button type="button" className="btn btn-default contact_btn">
                    contact us{" "}
                    <i className="fa fa-envelope-o" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </Fragment>
      {isVisible && (
        <span
          onClick={ScrollToTop}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#2F84CA",
            width: "50px",
            height: "50px",
            textDecoration: "none",
            borderRadius: "35px",
            transition: "all 0.3s ease",
            color: "#fff",
            zIndex: "999",
            cursor: "pointer",
          }}
        >
          <i
            className="fa fa-arrow-up "
            onClick={ScrollToTop}
            aria-hidden="true"
          ></i>
        </span>
      )}
    </div>
  );
}

export default Footer;
