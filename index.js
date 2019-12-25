require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const favicon = require("express-favicon");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bcrypt = require("bcrypt");

const db = require("./api/database");
const subscribe_routers = require("./api/routes/subscribe_routers");
const tes = require("./api/routes/tes");

app.use(cors());
app.set("view-engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use("/users", subscribe_routers);
app.use("/insert", tes);
app.use(favicon(path.join(__dirname, "my-website", "build", "favicon.ico")));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "my-website", "build")));
app.get("/ping", function(req, res) {
  return res.send("pong");
});
app.get("*", function(req, res) {
  const index = path.join(__dirname, "my-website", "build", "index.html"); //oke2 lanjut dulu ko wkwk, ini udah sih aturan, coba deploy oke bentar
  res.sendFile(index);
});

io.on("connection", function(socket) {
  console.log(socket.id);
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
  socket.on("ADD_SUBS", function() {
    io.emit("LOAD_SUBS");
  });
});

http.listen(port, "0.0.0.0", () => {
  console.log(`Products server listening on port ${port}`);
});

module.exports = app;

async function TestConnection() {
  let post;

  post = await db
    .authenticate()
    .catch(err => console.error("Unable to connect", err));
  console.log("Connection success");
}

TestConnection();
