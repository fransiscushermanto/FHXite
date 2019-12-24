import React, { Component } from "react";
import WelcomeJumbotron from "./welcomejumbotron";
import Introduce from "./introduce";
import ToolsJumbotron from "./toolsjumbotron";
import StarRating from "./starRating";
import Subscribe from "./subscribe";
import Footer from "./footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../../js/animate.js";

class Main extends Component {
  state = {
    img: [
      {
        key: 0,
        id: "html",
        src: require("../../img/html.png"),
        text: "HTML(5)"
      },
      {
        key: 9,
        id: "php",
        src: require("../../img/php.png"),
        text: "PHP"
      },
      { key: 2, id: "css", src: require("../../img/css.png"), text: "CSS(3)" },
      { key: 1, id: "java", src: require("../../img/java.png"), text: "Java" },
      {
        key: 4,
        id: "js",
        src: require("../../img/js.png"),
        text: "Javascript"
      },
      {
        key: 3,
        id: "csharp",
        src: require("../../img/csharp.png"),
        text: "C#"
      },
      { key: 7, id: "bs", src: require("../../img/bs.png"), text: "Bootstrap" },
      { key: 6, id: "c", src: require("../../img/c.png"), text: "C" },
      {
        key: 5,
        id: "react",
        src: require("../../img/react.png"),
        text: "React Js"
      },
      {
        key: 8,
        id: "android",
        src: require("../../img/android.png"),
        text: "Android Studio"
      }
    ],
    img2: [],
    img3: [],
    pos: 0,
    press: false,
    delay: 6000,
    offSetY: 0,
    visible: true
  };

  componentDidMount() {
    const div = document.querySelector("#main");
    div.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  // UNSAFE_componentWillMount() {
  //   setInterval(setInterval(this.autoSlide, this.state.delay), 1000);
  // }

  handleScroll = e => {
    const { offSetY } = this.state;
    // updated position
    const temp = e.srcElement.scrollTop;
    var visible;
    visible = offSetY < temp;
    if (temp === 0) {
      visible = true;
    }
    this.setState({
      offSetY: temp,
      visible
    });
  };

  autoSlide = () => {
    let increment = this.state.pos + 1;
    if (this.state.pos === 4) {
      increment = this.state.pos - this.state.pos;
    }
    this.setState({ pos: increment });
  };

  didPress = () => {
    this.setState({ press: true });
    setTimeout(this.setState({ press: false }), 2000);
  };

  resetPress = () => {
    this.setState({ press: false });
  };

  toolsHandlePos = status => {
    let increment = this.state.pos + 1;
    let decrement = this.state.pos - 1;
    if (this.state.pos === 0) {
      decrement = this.state.pos + 4;
    } else if (this.state.pos === 4) {
      increment = this.state.pos - this.state.pos;
    }
    this.setState({
      pos: status === "add" ? increment : decrement
    });
  };

  toolsSlider = pos => {
    const src = this.state.img[pos].src;
    const id = this.state.img[pos].id;
    const key = this.state.img[pos].key;
    const text = this.state.img[pos].text;

    return (
      <div id={id} className={"tools"} key={key}>
        <img src={src} alt="" />
        <div id="toolstext">
          <h1 id="tools-title">{text}</h1>
        </div>
      </div>
    );
  };

  callTools() {
    return this.state.img.map(image => {
      const { key, id, src, text } = image;
      return (
        <li id={id} className={"tools"} key={key}>
          <img src={src} alt="" />
          <div className={"col-tools"}>
            <p>{text}</p>
            <div className="starRating">
              <StarRating id={id + "star"}></StarRating>
            </div>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <div
        id="main"
        style={{
          overflowY: this.props.widths === 100 ? "visible" : "hidden",
          zIndex: this.props.widths === 100 ? "3" : "0"
        }}
      >
        <WelcomeJumbotron visible={this.state.visible}></WelcomeJumbotron>
        <Introduce
          onClick={this.toolsHandlePos}
          toolsSlider={this.toolsSlider}
          pos={this.state.pos}
          press={this.state.press}
          didPress={this.didPress}
          resetPress={this.resetPress}
          img={this.state.img}
        ></Introduce>
        <ToolsJumbotron callTools={this.callTools()}></ToolsJumbotron>
        <Subscribe update={this.props.update}></Subscribe>
        <Footer
          imageNoColor={this.props.imageNoColor}
          imageColor={this.props.imageColor}
          image={this.props.image}
          onHover={this.props.onHover}
        ></Footer>
      </div>
    );
  }
}

export default Main;
