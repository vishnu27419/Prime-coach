import React, { Component } from "react";
import athleticsImg from "../../Custom/images/athletics-img.png";
import badmintonImg from "../../Custom/images/badminton-img.png";
import basketballImg from "../../Custom/images/basketball-img.png";
import bodyTransformationImg from "../../Custom/images/body-transformation-img.png";
import cricketImg from "../../Custom/images/cricket-img.png";
import fencingImg from "../../Custom/images/fencing-img.png";
import footballImg from "../../Custom/images/football-img.png";
import golfImg from "../../Custom/images/golf-img.png";
import handballImg from "../../Custom/images/handball-img.png";
import hockeyImg from "../../Custom/images/hockey-img.png";
import iceHockeyImg from "../../Custom/images/ice-hockey-img.png";
import lacrosseImg from "../../Custom/images/lacrosse-img.png";
import mmaImg from "../../Custom/images/mma-img.png";
import netballImg from "../../Custom/images/netball-img.png";
import rowingImg from "../../Custom/images/rowing-img.png";
import rugbyImg from "../../Custom/images/rugby-img.png";
import skiingImg from "../../Custom/images/skiing-img.png";
import squashImg from "../../Custom/images/squash-img.png";
import tennisImg from "../../Custom/images/tennis-img.png";
import volleyballImg from "../../Custom/images/volleyball-img.png";

class GamingWrapper extends Component {
  state = { lessSport: false, moreSport: true, visibleSports: false };

  handleToggle = () => {
    this.setState({ lessSport: true, moreSport: false, visibleSports: true });
  };

  handleToggleLessSport = () => {
    this.setState({ lessSport: false, moreSport: true, visibleSports: false });
  };

  render() {
    return (
      <div>
        <section id="gaming_wrapper">
          <div className="container">
            <div className="heading">
              Simply <span>select your sport</span> and start your journey to
              become a faster, stronger, better athlete
            </div>

            <div className="row text-center">
              <div className="col-lg-2 col-md-2 offset-md-1">
                <div className="game_play">
                  <figure>
                    <img
                      src={athleticsImg}
                      className="img-fluid"
                      alt={athleticsImg}
                    />
                  </figure>
                  <div className="sports_title">Athletics</div>
                </div>
              </div>
              <div className="col-lg-2 col-md-2">
                <div className="game_play">
                  <figure>
                    <img
                      src={badmintonImg}
                      className="img-fluid"
                      alt={badmintonImg}
                    />
                  </figure>
                  <div className="sports_title">Badminton</div>
                </div>
              </div>
              <div className="col-lg-2 col-md-2">
                <div className="game_play">
                  <figure>
                    <img
                      src={basketballImg}
                      className="img-fluid"
                      alt={basketballImg}
                    />
                  </figure>
                  <div className="sports_title">Basketball</div>
                </div>
              </div>
              <div className="col-lg-2 col-md-2">
                <div className="game_play">
                  <figure>
                    <img
                      src={bodyTransformationImg}
                      className="img-fluid"
                      alt={bodyTransformationImg}
                    />
                  </figure>
                  <div className="sports_title">Body Transformation</div>
                </div>
              </div>
              <div className="col-lg-2 col-md-2">
                <div className="game_play">
                  <figure>
                    <img
                      src={cricketImg}
                      className="img-fluid"
                      alt={cricketImg}
                    />
                  </figure>
                  <div className="sports_title">Cricket</div>
                </div>
              </div>
            </div>

            {this.state.visibleSports && (
              <div>
                <div className="row text-center">
                  <div className="col-lg-2 col-md-2 offset-md-1">
                    <div className="game_play">
                      <figure>
                        <img
                          src={fencingImg}
                          className="img-fluid"
                          alt={fencingImg}
                        />
                      </figure>
                      <div className="sports_title">Fencing</div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <div className="game_play">
                      <figure>
                        <img
                          src={footballImg}
                          className="img-fluid"
                          alt={footballImg}
                        />
                      </figure>
                      <div className="sports_title">Football</div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <div className="game_play">
                      <figure>
                        <img
                          src={golfImg}
                          className="img-fluid"
                          alt={golfImg}
                        />
                      </figure>
                      <div className="sports_title">Golf</div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <div className="game_play">
                      <figure>
                        <img
                          src={handballImg}
                          className="img-fluid"
                          alt={handballImg}
                        />
                      </figure>
                      <div className="sports_title">Handball</div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <div className="game_play">
                      <figure>
                        <img
                          src={hockeyImg}
                          className="img-fluid"
                          alt={hockeyImg}
                        />
                      </figure>
                      <div className="sports_title">Hockey</div>
                    </div>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-lg-2 col-md-2 offset-md-1">
                    <div className="game_play">
                      <figure>
                        <img
                          src={iceHockeyImg}
                          className="img-fluid"
                          alt={iceHockeyImg}
                        />
                      </figure>
                      <div className="sports_title">Ice Hockey</div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <div className="game_play">
                      <figure>
                        <img
                          src={lacrosseImg}
                          className="img-fluid"
                          alt={lacrosseImg}
                        />
                      </figure>
                      <div className="sports_title">Lacrosse</div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <div className="game_play">
                      <figure>
                        <img src={mmaImg} className="img-fluid" alt={mmaImg} />
                      </figure>
                      <div className="sports_title">MMA</div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <div className="game_play">
                      <figure>
                        <img
                          src={netballImg}
                          className="img-fluid"
                          alt={netballImg}
                        />
                      </figure>
                      <div className="sports_title">Netball</div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <div className="game_play">
                      <figure>
                        <img
                          src={rowingImg}
                          className="img-fluid"
                          alt={rowingImg}
                        />
                      </figure>
                      <div className="sports_title">Rowing</div>
                    </div>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-lg-2 col-md-2 offset-md-1">
                    <div className="game_play">
                      <figure>
                        <img
                          src={rugbyImg}
                          className="img-fluid"
                          alt={rugbyImg}
                        />
                      </figure>
                      <div className="sports_title">Rugby</div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <div className="game_play">
                      <figure>
                        <img
                          src={skiingImg}
                          className="img-fluid"
                          alt={skiingImg}
                        />
                      </figure>
                      <div className="sports_title">Skiing</div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <div className="game_play">
                      <figure>
                        <img
                          src={squashImg}
                          className="img-fluid"
                          alt={squashImg}
                        />
                      </figure>
                      <div className="sports_title">Squash</div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <div className="game_play">
                      <figure>
                        <img
                          src={tennisImg}
                          className="img-fluid"
                          alt={tennisImg}
                        />
                      </figure>
                      <div className="sports_title">Tennis</div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-2">
                    <div className="game_play">
                      <figure>
                        <img
                          src={volleyballImg}
                          className="img-fluid"
                          alt={volleyballImg}
                        />
                      </figure>
                      <div className="sports_title">Volleyball</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="text-center">
              {this.state.moreSport && (
                <button className="sport_btn" onClick={this.handleToggle}>
                  More Sport <span>+</span>
                </button>
              )}

              {this.state.lessSport && (
                <button
                  className="sport_btn"
                  onClick={this.handleToggleLessSport}
                >
                  Less Sport <span>-</span>
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default GamingWrapper;
