import $ from "jquery";
import velocity from "velocity-animate";
require("velocity-animate/velocity.ui.js");
require("velocity-animate/velocity.min.js");

function FirstLoad() {
  function ImageIn() {
    velocity(
      $("#main #welcome-jumbotron .container #image-illustration"),
      "transition.slideUpBigIn",
      {
        duration: 500
      }
    );
  }

  function ButtonIn() {
    velocity(
      $("#main #welcome-jumbotron .container #wrap-btn"),
      "transition.slideUpBigIn",
      {
        duration: 300
      }
    );
  }
  velocity(
    $("#main #welcome-jumbotron .container #title"),
    "transition.slideUpBigIn",
    {
      duration: 400,
      complete: function() {
        velocity(
          $("#main #welcome-jumbotron .container #subtitle"),
          "transition.slideUpBigIn",
          {
            duration: 300,
            complete: function() {
              ImageIn();
              ButtonIn();
            }
          }
        );
      }
    }
  );
}
$(window).on("load", function() {
  FirstLoad();
});
