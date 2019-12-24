import React, { Component } from "react";
import SocialMedia from "./socialmedia";
class Footer extends Component {
  render() {
    const { onHover, imageNoColor, imageColor, image, onLeave } = this.props;
    return (
      <div id="footer">
        <div className="left">
          {/* <a className="nav-logo" href="/">
            <span className="logo-F">F</span>H<span className="logo-X">X</span>
            ite
          </a> */}
          <p id="footer-text">
            <div className="nav-logo">
              <span className="logo-F">F</span>H
              <span className="logo-X">X</span>
              ite
            </div>
            <strong>© 2019</strong>
          </p>
        </div>
        <div id="social-media-wrapper">
          {image.map(social => (
            <SocialMedia
              key={social.key}
              onHover={onHover}
              onLeave={onLeave}
              imageNoColor={imageNoColor}
              imageColor={imageColor}
              image={social}
            ></SocialMedia>
          ))}
        </div>
      </div>
    );
  }
}

export default Footer;
