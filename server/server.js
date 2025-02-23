const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("新用户连接");

  socket.on("changeColor", (color) => {
    console.log("收到颜色变化请求：", color);
    io.emit("changeColor", color); // 广播颜色变化
  });

  socket.on("disconnect", () => {
    console.log("用户断开连接");
  });
});

server.listen(5001, () => {
  console.log("服务器运行在 http://localhost:5001");
});
