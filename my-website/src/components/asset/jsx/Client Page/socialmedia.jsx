import React from "react";
import PropTypes from "prop-types";
const SocialMedia = ({ image, imageNoColor, imageColor, onHover }) => {
  return (
    <a
      id={image.id}
      className="sosmed"
      onMouseEnter={() => onHover(image)}
      onPointerLeave={() => onHover(image)}
      href={image.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={
          image.value === true
            ? imageNoColor[image.key - 1].src
            : imageColor[image.key - 1].src
        }
        alt=""
        width="25px"
        height="25px"
      />
    </a>
  );
};

SocialMedia.propTypes = {
  imageNoColor: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string }))
    .isRequired,
  imageColor: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string }))
    .isRequired,
  image: PropTypes.shape({
    key: PropTypes.number,
    id: PropTypes.string,
    value: PropTypes.bool,
    href: PropTypes.string
  }).isRequired,
  onHover: PropTypes.func.isRequired
};

export default SocialMedia;
