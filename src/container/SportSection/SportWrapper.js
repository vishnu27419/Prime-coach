import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../PublicLayout/Header";
import Footer from "../PublicLayout/Footer";
import LoaderWrapper from "../Loader/LoaderWrapper";
import { standardPostApi } from "../API/ApiWrapper";
import Image from "component/ImageComponent/Image";
import { ContactsOutlined } from "@material-ui/icons";
export default class SportWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sportsWrapperData: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.fetchPlanData();
  }

  fetchPlanData = async () => {
    try {
      const res = await standardPostApi("list_all_sports", undefined, {}, true);
      if (res.data.code === 200) {
        this.setState({
          sportsWrapperData: res.data.data.AllSports,
          loading: false,
        });
        // console.log("The sports are -> ", this.state.sportsWrapperData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { sportsWrapperData } = this.state;

    // console.log("this is connn***", this.state.loading);
    return (
      <div className="loader_sec">
        <Header />
        {this.state.loading ? (
          <LoaderWrapper />
        ) : (
          <section className="sport-wrapper">
            <div className="container">
              <div className="heading text-white text-center">
                <h2>Select Sport</h2>
              </div>
              <div className="inner_allsport">
                <div className="row text-center">
                  {sportsWrapperData &&
                    sportsWrapperData.length &&
                    sportsWrapperData.map((data) => (
                      <div key={data.sport_name} className="col-lg-4 col-md-4">
                        {/* <a href="athelet_signup.php"> */}
                        <Link to={`/membership/${data.id}`}>
                          <div className="game_play">
                            {/* <div className="sports_title">Athletics</div> */}
                            <div className="sports_title">
                              {data.sport_name}
                            </div>
                            <figure>
                              {/* <img
                                src={data.sport_image}
                                className="img-fluid"
                                alt="No_Image_Avalable"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    // "https://www.rfppl.co.in/subscription/upload_journal_img/1548238937davao-properties-for-sale-18042018040100no-photo.png";
                                    "https://image.makewebeasy.net/makeweb/0/8gPLercsu/Document/EKD_007A_EN.pdf";
                                }}
                              /> */}
                              {console.log(
                                "data.sport_image",
                                data.sport_image
                              )}
                              <Image
                                image={data.sport_image}
                                className="img-fluid"
                              />
                            </figure>
                          </div>
                        </Link>
                        {/* </a> */}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        )}
        <Footer />
      </div>
    );
  }
}
