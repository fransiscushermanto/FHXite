import React, { useState, useEffect } from "react";
import Main from "./components/asset/jsx/Client Page/main";
import Loader from "./components/asset/jsx/Client Page/loader";
import Admin from "./components/asset/jsx/Admin Page/Admin.jsx";
import Login from "./components/asset/jsx/Client Page/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
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
    { src: require("../src/components/asset/img/instagram.png") },
    { src: require("../src/components/asset/img/facebook.png") },
    { src: require("../src/components/asset/img/mail.png") },
    { src: require("../src/components/asset/img/phone.png") }
  ]);
  const [color_img] = useState([
    { src: require("../src/components/asset/img/instagram-color.png") },
    { src: require("../src/components/asset/img/facebook-color.png") },
    { src: require("../src/components/asset/img/mail-color.png") },
    { src: require("../src/components/asset/img/phone-color.png") }
  ]);
  const [width, setWidth] = useState(0);

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
      <Router forceRefresh={false}>
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
          <Route path="/admin">
            <Admin widths={width}></Admin>
          </Route>
          <Route path="/login">
            <Login widths={width}></Login>
          </Route>
          <Route path="/register">
            <Login widths={width}></Login>
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
