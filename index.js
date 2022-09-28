const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { default: mongoose } = require("mongoose");
const router = require("./src/router");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT;
const URI = process.env.URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router(app);

mongoose
  .connect(URI)
  .then(() => {
    console.log(`MongoDB is connected !!!`);
  })
  .catch((err) => {
    console.log(err);
  });

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
