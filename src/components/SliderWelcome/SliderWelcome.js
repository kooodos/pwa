import React, { Component } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderWelcome.css"

export default class SliderWelcome extends Component {
  render() {
    const settings = {
      dots: true,
      fade: true,
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
              <div className="dot-number">1</div>
              <img src="https://img.icons8.com/bubbles/2x/gift.png" alt="" />
            </div>
            <div className="dot-text">
              Pick a small treatment and pay for it with credit card or credits
            </div>
          </div>
          <div>
            <div className="dot">
              <div className="dot-number">2</div>
              <img src="https://images.squarespace-cdn.com/content/v1/56d5bc0fc6fc08c5377bb7e2/1461101752246-FK6GIO9XLUYKDUTPQFM6/ke17ZwdGBToddI8pDm48kHhlTY0to_qtyxq77jLiHTtZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7T-j82ScS_xjTqFYGqFrT72qZ_E0ELtHpOZiWcSG1QwIMeEVreGuQ8F95X5MZTW1Jw/DonateIcon.png" alt="" />
            </div>
            <div className="dot-text">
              share with the person you want to thank, appology, acknowledge.. and collect the credits
            </div>
          </div>
          <div>
            <div className="dot">
              <div className="dot-number">3</div>
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
