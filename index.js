require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 8000;
const path = require("path");
const favicon = require("express-favicon");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const passport = require("passport");
require("./api/config/passport");

//Import Routes
const db = require("./api/database");
const subscribe_routers = require("./api/routes/subscribe_routers");
const auth = require("./api/routes/auth");
const post = require("./api/routes/post");
//Middleware
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(passport.initialize());

//Route Middlewares
app.use("/api/client", subscribe_routers);
app.use("/api/user", auth);
app.use("/api/post", post);
app.use(favicon(path.join(__dirname, "my-website", "build", "favicon.ico")));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "my-website", "build")));
app.get("/ping", function(req, res) {
  res.json({
    message: "Welcome to Mobile Legend"
  });
});
app.post("/ping/login", async (req, res) => {
  try {
    const user = {
      id: 1,
      username: "fransiscus",
      email: "fransiscus.huang47@gmail.com"
    };

    jwt.sign(
      { user: user },
      "secretkey",
      { expiresIn: "30s" },
      (err, token) => {
        res.json({
          token: token
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
});
app.get("*", function(req, res) {
  const index = path.join(__dirname, "my-website", "build", "index.html");
  res.sendFile(index);
});
io.on("connection", function(socket) {
  console.log(socket.id);
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
  socket.on("ADD_USERS", function() {
    io.emit("LOAD_USERS");
  });
});
http.listen(port, "0.0.0.0", () => {
  console.log(`Products server listening on port ${port}`);
});

module.exports = app;

//Connect to DB
async function TestConnection() {
  let post;
  try {
    post = await db.authenticate();
    console.log("Connection success");
  } catch (error) {
    console.error("Unable to connect", error);
  }
}

TestConnection();
