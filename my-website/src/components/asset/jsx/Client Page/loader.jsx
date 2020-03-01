import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "../../css/Client/loader.css";
const Loader = ({ widths }) => {
  const getStroke = () => {
    document.querySelectorAll("#logo #Text path");
  };

  useEffect(() => {
    getStroke();
  }, []);

  return (
    <div id="loader" className={widths === 100 ? "hidden" : "show"}>
      <div id="progressBarField">
        <div id="progressBar" style={{ width: widths + "%" }}></div>
      </div>
      <svg
        id="logo"
        xmlns="http://www.w3.org/2000/svg"
        width="168.3"
        height="114.55"
        viewBox="0 0 168.3 114.55"
      >
        <g id="Text" data-name="Group 1" transform="translate(-504.25 -472.45)">
          <path
            id="Path_1"
            data-name="Path 1"
            d="M11.25,0h17.1V-45.6h34.5V-59.55H28.35V-90.3H72.6v-13.95H11.25Z"
            transform="translate(498 582)"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="10"
          />
          <path
            id="Path_2"
            data-name="Path 2"
            d="M70.95,0H86.4L54.3-52.2l32.25-52.35H71.25l-24,40.95-25.2-40.95H6.75L38.85-52.2,6.9,0H22.05L45.9-40.8Z"
            transform="translate(581 582)"
            fill="#056ff0"
            stroke="#056ff0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="10"
          />
        </g>
      </svg>
    </div>
  );
};

Loader.propTypes = {
  widths: PropTypes.number.isRequired
};
export default Loader;
