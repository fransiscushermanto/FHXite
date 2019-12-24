import React, { useEffect, useState } from "react";
import Register from "../Client Page/register";
import "../../css/Client/login.css";
const Login = ({ widths }) => {
  const [displayLogin, setLogin] = useState(true);
  const [displayRegister, setRegister] = useState(false);
  const wrapperBackground = [
    { pathname: "/login", background: "#db4437" },
    { pathname: "/register", background: "#fcf500" }
  ];

  useEffect(() => {
    LoadPage();
  }, []);

  const LoadPage = () => {
    if (window.location.pathname == "/login") {
      setRegister(false);
      setLogin(true);
    } else {
      setRegister(true);
      setLogin(false);
    }
    const wrapper = document.getElementsByClassName("user-wrapper");
    wrapperBackground.map(bg => {
      const { pathname, background } = bg;
      if (window.location.pathname == pathname) {
        wrapper[0].style.background = `${background}`;
      }
    });
  };

  const inputTransition = e => {
    const field = [
      { target: "email", pos: "0" },
      { target: "password", pos: "1" }
    ];
    if (window.location.pathname == "/login") {
      var c = document.getElementsByClassName("loginLabel");
    } else {
      var c = document.getElementsByClassName("registerLabel");
    }
    field.map(x => {
      var { target, pos } = x;
      if (window.location.pathname == "/register") {
        target = target + "Regis";
      }
      if (target == e.target.id) {
        var ele = document.getElementById(target);
        if (ele.value.length > 0) {
          c[pos].style.top = "10%";
          c[pos].style.fontSize = "12px";
          ele.style.padding = "20px 25px 0px 25px";
        } else {
          c[pos].style.top = "25%";
          c[pos].style.fontSize = "16px";
          ele.style.padding = "10px 25px";
        }
      }
    });
  };

  const changeLayout = e => {
    e.preventDefault();
    if (window.location.pathname == "/login") {
      setRegister(!displayRegister);
      setLogin(!displayLogin);
      window.history.pushState("object or string", "FHXite", "/register");
    } else {
      setRegister(!displayRegister);
      setLogin(!displayLogin);
      window.history.pushState("object or string", "FHXite", "/login");
    }

    const wrapper = document.getElementsByClassName("user-wrapper");
    wrapperBackground.map(bg => {
      const { pathname, background } = bg;
      if (window.location.pathname == pathname) {
        wrapper[0].style.background = `${background}`;
      }
    });
  };

  const Login = () => {
    return (
      <form
        id="login-form"
        className="form"
        style={{
          zIndex: widths === 100 ? "3" : "0",
          display: displayLogin === true ? "flex" : "none"
        }}
      >
        {/* <div id="title">
            <h5>SIGN IN</h5>
          </div> */}
        <div id="input-area">
          <div id="email-wrapper" className="wrapper">
            <label className="loginLabel">Email</label>
            <input
              type="email"
              id="email"
              className="input"
              name="email"
              onChange={inputTransition}
            />
          </div>
          <div id="password-wrapper" className="wrapper">
            <label className="loginLabel">Password</label>
            <input
              type="password"
              id="password"
              className="input"
              name="password"
              onChange={inputTransition}
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
            <a className="btn btn-primary" id="signin" href="/">
              Sign in
            </a>
            <hr />
            <a className="btn btn-danger" id="google" href="/">
              <img src={require("../../img/g-signin.png")} alt="" /> SIGN IN
              WITH GOOGLE
            </a>
            <a className="btn" id="facebook" href="/">
              <img src={require("../../img/f-signin.png")} alt="" /> SIGN IN
              WITH FACEBOOK
            </a>
          </div>
          <div className="wrapper" id="register-wrapper">
            <h5 className="registertext">
              Don't have any account?{" "}
              <span onClick={changeLayout}>Register</span>
            </h5>
          </div>
        </div>
      </form>
    );
  };

  const renderedForm = () => {
    if (displayLogin) {
      return <Login></Login>;
    } else if (displayRegister) {
      return (
        <Register
          inputTransition={inputTransition}
          changeLayout={changeLayout}
          displayRegister={displayRegister}
        />
      );
    }
  };

  return (
    <div
      className="user-wrapper"
      style={{ zIndex: widths === 100 ? "3" : "0" }}
    >
      <div className="container">
        <a className="nav-logo" href="/">
          <span className="logo-F">F</span>H<span className="logo-X">X</span>
          ite
        </a>
        {renderedForm()}
      </div>
    </div>
  );
};

export default Login;
