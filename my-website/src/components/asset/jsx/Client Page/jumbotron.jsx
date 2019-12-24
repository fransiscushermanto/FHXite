import React, { Component } from "react";

class Jumbotron extends Component {
  state = {};

  render() {
    return (
      <div
        id="my-jumbotron"
        className={this.props.seek === true ? "hide" : ""}
      ></div>
    );
  }
}

export default Jumbotron;
