import React, { useState } from "react";
import instance from "../../../../instance";
const Login = ({ displayLogin, changeLayout, inputTransition, widths }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emails = value => {
    const mEmail = document.getElementById(value.target.id).value;
    setEmail(mEmail);
    inputTransition(value);
  };
  const passwords = value => {
    const mPAssword = document.getElementById(value.target.id).value;
    setPassword(mPAssword);
    inputTransition(value);
  };

  const login = async e => {
    e.preventDefault();
    console.log("SEND");
    const user = {
      email: email,
      password: password
    };
    try {
      const response = await instance.post("/api/user/auth/login", user);
      console.log(response);
      if (response.status === 200) {
        document.querySelector("input").value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      id="login-form"
      className="form"
      style={{
        zIndex: widths === 100 ? "3" : "0",
        display: displayLogin === true ? "flex" : "none"
      }}
      onSubmit={login}
    >
      {/* <div id="title">
            <h5>SIGN IN</h5>
          </div> */}
      <div id="input-area">
        <div id="email-wrapper" className="wrapper">
          <label className="loginLabel">Email</label>
          <input
            key="1"
            type="email"
            id="email"
            className="input"
            name="email"
            value={email}
            onChange={value => emails(value)}
          />
        </div>
        <div id="password-wrapper" className="wrapper">
          <label className="loginLabel">Password</label>
          <input
            type="password"
            id="password"
            className="input"
            name="password"
            autoComplete="on"
            value={password}
            onChange={value => passwords(value)}
          />
        </div>
        <div className="remember-forget wrapper">
          <div id="remember-wrapper">
            <input type="checkbox" name="remember" id="remember" />
            <h5>Remember me</h5>
          </div>
          <div id="forget-password">
            <div>Forgot password?</div>
          </div>
        </div>
        <div id="signin-btn">
          <button type="submit" className="btn btn-primary" id="signin">
            Sign in
          </button>
          <hr />
          <button className="btn btn-danger" id="google" href="/">
            <img src={require("../../img/g-signin.png")} alt="" /> SIGN IN WITH
            GOOGLE
          </button>
          <button className="btn" id="facebook" href="/">
            <img src={require("../../img/f-signin.png")} alt="" /> SIGN IN WITH
            FACEBOOK
          </button>
        </div>
        <div className="wrapper" id="register-wrapper">
          <h5 className="registertext">
            Don't have any account? <span onClick={changeLayout}>Register</span>
          </h5>
        </div>
      </div>
    </form>
  );
};

export default Login;
