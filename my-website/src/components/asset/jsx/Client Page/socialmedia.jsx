import React, { Component } from "react";

class SocialMedia extends Component {
  render() {
    return (
      <a
        id={this.props.image.id}
        className="sosmed"
        onMouseEnter={() => this.props.onHover(this.props.image)}
        onPointerLeave={() => this.props.onHover(this.props.image)}
        href={this.props.image.href}
        target="_blank"
        rel="noopener noreferrer"
        // onMouseLeave={() => this.props.onLeave(this.props.image)}
      >
        <img
          src={
            this.props.image.value === true
              ? this.props.imageNoColor[this.props.image.key - 1].src
              : this.props.imageColor[this.props.image.key - 1].src
          }
          alt=""
          width="25px"
          height="25px"
        />
      </a>
    );
  }
}

export default SocialMedia;
