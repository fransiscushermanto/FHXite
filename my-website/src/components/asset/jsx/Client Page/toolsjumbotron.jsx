import React, { Component } from "react";

class ToolsJumbotron extends Component {
  state = {};
  render() {
    return (
      <div id="toolsjumbotron">
        <div className="container">
          <h2 id="title">Abilities</h2>
          <p id="quotes">
            “Knowledge is power? No. Knowledge on its own is nothing, but the
            application of useful knowledge, now that is powerful.”<br></br> ―
            Rob Liano
          </p>
          <hr />
          <div className="frame-logo">
            <ul className="table">{this.props.callTools}</ul>
          </div>
          {/* <div className="table2">{this.props.callTools}</div>
          <div className="table3">{this.props.callTools}</div> */}
        </div>
      </div>
    );
  }
}

export default ToolsJumbotron;
