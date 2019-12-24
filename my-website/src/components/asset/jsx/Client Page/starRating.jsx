import React, { Component } from "react";

class StarRating extends Component {
  state = {
    id: ["star1", "star2", "star3", "star4", "star5"]
  };

  stars = () => {
    return this.state.id.map(id => {
      return (
        <span key={id} id={id}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
          >
            <path
              id="star"
              d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"
            />
          </svg>
        </span>
      );
    });
  };

  render() {
    return <div id={this.props.id}>{this.stars()}</div>;
  }
}

export default StarRating;
