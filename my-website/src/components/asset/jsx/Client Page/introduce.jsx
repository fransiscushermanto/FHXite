import React from "react";

const Introduce = () => {
  return (
    <div id="introduce" className="container">
      <div id="wrap-text" className="container">
        <h1 id="title">Create Your Web Application Here!</h1>
        <p id="paragraph">
          <strong>Web App is All Around Us!</strong>
          <br></br>
          <span id="inner-p">
            Web app is an application program that is stored on a remote server
            and delivered over the Internet through a browser interface.
          </span>
        </p>
      </div>
      <div id="wrap-illustrations" className="container">
        <img
          id="text-image"
          className="img-fluid"
          src={require("../../img/website.png")}
          alt=""
        />
      </div>
    </div>
  );
};

export default Introduce;
