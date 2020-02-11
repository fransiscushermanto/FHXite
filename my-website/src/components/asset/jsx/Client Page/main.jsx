import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import WelcomeJumbotron from "./welcomejumbotron";
import Introduce from "./introduce";
import ToolsJumbotron from "./toolsjumbotron";
import StarRating from "./starRating";
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
  const [visible, setVisible] = useState(false);
  const prevScrollY = useRef(0);
  useEffect(() => {
    const handleScroll = e => {
      // updated position
      const currentScrollY = e.srcElement.scrollTop;
      if (prevScrollY.current < currentScrollY && visible) {
        setVisible(false);
      }
      if (prevScrollY.current > currentScrollY && !visible) {
        setVisible(true);
      }
      if (currentScrollY === 0) {
        setVisible(false);
      }

      prevScrollY.current = currentScrollY;
    };

    const div = document.querySelector("#main");
    div.addEventListener("scroll", handleScroll);
    return () => div.removeEventListener("scroll", handleScroll);
  }, [visible]);

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
