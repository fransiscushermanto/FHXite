import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div id="ABOUT" className="">
        {/* {this.props.seek === true ? this.props.callStars : ""} */}
        <div
          id="button-next"
          onClick={this.props.onClick}
          className={this.props.seek === true ? "hide" : ""}
        >
          <span id="arrow-1" className="arrow-next"></span>
        </div>
        <div id="profile-image">
          <img src={require("../img/me.jpg")} alt="" />
        </div>
        This is Sample Text
      </div>
    );
  }
}

export default About;
