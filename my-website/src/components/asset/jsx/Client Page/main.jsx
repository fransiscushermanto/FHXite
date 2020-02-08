import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import WelcomeJumbotron from "./welcomejumbotron";
import Introduce from "./introduce";
import ToolsJumbotron from "./toolsjumbotron";
import StarRating from "./starRating";
import Subscribe from "./subscribe";
import Footer from "./footer";
import "../../js/animate.js";

const Main = ({ widths, imageNoColor, imageColor, image, onHover }) => {
  const img = [
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
  ];
  // const [pos, setPos] = useState(0);
  // const [press, setPress] = useState(false);
  // const [delay, setDelay] = useState(6000);
  const [offSetY, setOffSetY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = e => {
      // updated position
      const temp = e.srcElement.scrollTop;
      var visible;
      visible = offSetY < temp;
      if (temp === 0) {
        setVisible(visible);
      }
      setOffSetY(temp);
      setVisible(!visible);
    };

    const div = document.querySelector("#main");
    div.addEventListener("scroll", handleScroll);
    window.removeEventListener("scroll", handleScroll);
  }, [offSetY]);

  // UNSAFE_componentWillMount() {
  //   setInterval(setInterval(autoSlide, delay), 1000);
  // }

  // const autoSlide = () => {
  //   let increment = pos + 1;
  //   if (pos === 4) {
  //     increment = pos - pos;
  //   }
  //   setPos(increment);
  // };

  // const didPress = () => {
  //   setPress(true);
  //   setTimeout(setPress(false), 2000);
  // };

  // const resetPress = () => {
  //   setPress(false);
  // };

  // const toolsHandlePos = status => {
  //   let increment = pos + 1;
  //   let decrement = pos - 1;
  //   if (pos === 0) {
  //     decrement = pos + 4;
  //   } else if (pos === 4) {
  //     increment = pos - pos;
  //   }

  //   setPos(status === "add" ? increment : decrement);
  // };

  // const toolsSlider = pos => {
  //   const src = img[pos].src;
  //   const id = img[pos].id;
  //   const key = img[pos].key;
  //   const text = img[pos].text;

  //   return (
  //     <div id={id} className={"tools"} key={key}>
  //       <img src={src} alt="" />
  //       <div id="toolstext">
  //         <h1 id="tools-title">{text}</h1>
  //       </div>
  //     </div>
  //   );
  // };

  const callTools = () => {
    return img.map(image => {
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
  };

  return (
    <div
      id="main"
      style={{
        overflowY: widths === 100 ? "visible" : "hidden",
        zIndex: widths === 100 ? "3" : "0"
      }}
    >
      <WelcomeJumbotron visible={visible}></WelcomeJumbotron>
      <Introduce></Introduce>
      <ToolsJumbotron callTools={callTools}></ToolsJumbotron>
      <Subscribe></Subscribe>
      <Footer
        imageNoColor={imageNoColor}
        imageColor={imageColor}
        image={image}
        onHover={onHover}
      ></Footer>
    </div>
  );
};

Main.propTypes = {
  widths: PropTypes.number.isRequired,
  imageNoColor: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string }))
    .isRequired,
  imageColor: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string }))
    .isRequired,
  image: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      id: PropTypes.string,
      value: PropTypes.bool,
      href: PropTypes.string
    })
  ).isRequired,
  onHover: PropTypes.func.isRequired
};

export default Main;
