const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

// 连接 MongoDB
mongoose.connect("mongodb://localhost:27017/colorsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 创建数据库 Schema 和 Model
const colorSchema = new mongoose.Schema({ color: String });
const Color = mongoose.model("Color", colorSchema);

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // 允许跨域请求
});

io.on("connection", async (socket) => {
  console.log("新用户连接");

  // 获取数据库中的颜色数据，并发送给新用户
  const lastColor = await Color.findOne();
  if (lastColor) {
    socket.emit("changeColor", lastColor.color);
  }

  socket.on("changeColor", async (color) => {
    console.log("收到用户更改颜色:", color);
    io.emit("changeColor", color); // 广播颜色更新给所有用户

    // 存储最新的颜色数据（更新或插入）
    await Color.findOneAndUpdate({}, { color }, { upsert: true });
  });

  socket.on("disconnect", () => {
    console.log("用户断开连接");
  });
});

server.listen(5001, () => {
  console.log(`服务器运行在 http://${process.env.HOST || '0.0.0.0'}:5001`);
});
