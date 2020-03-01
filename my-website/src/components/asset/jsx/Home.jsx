import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./Client Page/Main";
import Loader from "./Client Page/Loader";
import Admin from "../jsx/Admin Page/Admin";
import Login from "./Client Page/Login";
import "../css/Client/jumbotron.css";

const Home = () => {
  const [image, setImage] = useState([
    {
      key: 1,
      id: "instagram",
      value: true,
      href: "https://www.instagram.com/frans_huang/?hl=en"
    },
    {
      key: 2,
      id: "facebook",
      value: true,
      href: "https://www.facebook.com/fransiscus.hermanto.9"
    },
    {
      key: 3,
      id: "mail",
      value: true,
      href: "mailto:fransiscus.huang47@gmail.com"
    },
    { key: 4, id: "phone", value: true, href: "+62 85360781586" }
  ]);
  const [no_color_img] = useState([
    { src: require("../img/instagram.png") },
    { src: require("../img/facebook.png") },
    { src: require("../img/mail.png") },
    { src: require("../img/phone.png") }
  ]);
  const [color_img] = useState([
    { src: require("../img/instagram-color.png") },
    { src: require("../img/facebook-color.png") },
    { src: require("../img/mail-color.png") },
    { src: require("../img/phone-color.png") }
  ]);
  const [width, setWidth] = useState(0);

  const socketRef = useRef();
  useEffect(() => {
    const socketUrl = `${process.env.REACT_APP_SOCKET_URL ||
      window.location.origin}`;
    socketRef.current = io.connect(socketUrl);
  }, []);

  const socket = socketRef.current;

  useEffect(() => {
    onLoad();
  }, []);

  const onHover = target => {
    const images = [...image];
    const index = images.indexOf(target);
    images[index] = { ...target };
    images[index].value = !images[index].value;
    setImage(images);
  };

  const onLoad = () => {
    var perfData = window.performance.timing,
      EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
      time = parseInt((EstimatedTime / 1000) % 60) * 100,
      start = 0,
      end = 100,
      duration = time;

    var range = end - start,
      current = start,
      increment = end > start ? 1 : -1,
      stepTime = Math.abs(Math.floor(duration / range));

    var timer = setInterval(() => {
      current += increment;
      if (current === end) {
        clearInterval(timer);
      }
      setWidth(current);
    }, stepTime);
  };

  return (
    <React.Fragment>
      <Loader widths={width}></Loader>
      <Switch>
        <Route exact path="/">
          <Main
            widths={width}
            onHover={onHover}
            imageNoColor={no_color_img}
            imageColor={color_img}
            image={image}
          ></Main>
        </Route>
        <Route exact path="/admin">
          <Admin widths={width}></Admin>
        </Route>
        <Route exact path="/login">
          <Login widths={width}></Login>
        </Route>
        <Route exact path="/register">
          {socket && <Login widths={width} socket={socket}></Login>}
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default Home;
