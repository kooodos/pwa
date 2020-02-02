import React, { Component } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderWelcome.css"

export default class SliderWelcome extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="slider">
        <Slider {...settings}>
          <div>
            <div className="dot">
              <img src="https://img.icons8.com/bubbles/2x/gift.png" alt="" />
            </div>
            <div className="dot-text">
              Pick a small treatment and pay for it with credit card or credits
            </div>
          </div>
          <div>
            <div className="dot">
              <img src="https://www.bbuzzart.com/static/images/img-about-sell-step-2.png" alt="" />
            </div>
            <div className="dot-text">
              share with the person you want to thank, appology, acknowledge.. and collect the credits
            </div>
          </div>
          <div>
            <div className="dot">
              <img src="https://img.icons8.com/plasticine/2x/coffee-to-go.png" alt="" />
            </div>
            <div className="dot-text">
              the receiver will collect the treatment from the Partner store :)
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
