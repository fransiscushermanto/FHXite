require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const favicon = require("express-favicon");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const connectionString = "mongodb://localhost/fhxite";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Middlewares
if (process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, "my-website", "build", "favicon.ico")));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "my-website", "build")));
if (!process.env.NODE_ENV === "test") {
  app.get("*", function(req, res) {
    const index = path.join(__dirname, "my-website", "build", "index.html");
    res.sendFile(index);
  });
}

//Route Middlewares
app.use("/api/users", require("./routes/auth"));
app.use("/api/post", require("./routes/post"));

module.exports = http;
