import React from "react";
import PropTypes from "prop-types";

import SocialMedia from "./socialmedia";
const Footer = ({ onHover, imageNoColor, imageColor, image }) => {
  return (
    <div id="footer">
      <div className="left">
        {/* <a className="nav-logo" href="/">
            <span className="logo-F">F</span>H<span className="logo-X">X</span>
            ite
          </a> */}
        <div id="footer-text">
          <div className="nav-logo">
            <span className="logo-F">F</span>H<span className="logo-X">X</span>
            ite
          </div>
          <strong>© 2019</strong>
        </div>
      </div>
      <div id="social-media-wrapper">
        {image.map(social => (
          <SocialMedia
            key={social.key}
            onHover={onHover}
            imageNoColor={imageNoColor}
            imageColor={imageColor}
            image={social}
          ></SocialMedia>
        ))}
      </div>
    </div>
  );
};

Footer.propTypes = {
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

export default Footer;
