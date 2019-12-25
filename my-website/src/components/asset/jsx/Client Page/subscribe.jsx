import React, { Component } from "react";
import instance from "../../../../instance";
import io from "socket.io-client";

class Subscribe extends Component {
  constructor() {
    super();
    console.log("constructor");
    const socketUrl = `${process.env.REACT_APP_SOCKET_URL ||
      window.location.origin}`;
    this.socket = io.connect(socketUrl);
  }

  state = {
    addUser: {
      email: ""
    }
  };

  async componentDidMount() {
    // this.getEmail();
    console.log("hi");
  }

  addUser = async e => {
    e.preventDefault();
    const username = this.state.addUser.email;
    try {
      // selalu try catch trus console log errornya supaya bisa tau error dimana
      const response = await instance.post("users/subs", { username });
      this.socket.emit("ADD_SUBS");
      if (response.status === 200) {
        document.getElementById("subscribe-text").value = "";
        alert("Sucess");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <form id="subscribe" onSubmit={this.addUser}>
        <div className="container">
          <div id="title">
            <p>Subscribe to keep updated!</p>
          </div>
          <div id="wrap-input">
            <input
              type="email"
              id="subscribe-text"
              placeholder="example@gmail.com"
              required
              value={this.state.addUser.email}
              onChange={e =>
                this.setState({
                  addUser: { ...this.state.addUser, email: e.target.value }
                })
              }
            />
            <button type="submit" className="btn btn-submit">
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Subscribe;
