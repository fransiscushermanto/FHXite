const app = require("./api/app");
const port = process.env.PORT || 8000;
const io = require("socket.io")(app);

io.on("connection", function(socket) {
  console.log(socket.id);
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
  socket.on("ADD_USERS", function() {
    io.emit("LOAD_USERS");
  });
});

app.listen(port, () => {
  console.log(`Products server listening on port ${port}`);
});

module.exports = app;
