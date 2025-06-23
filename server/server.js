const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
// const mongoose = require("mongoose");  // 🔹 暂时注释掉 MongoDB 相关代码

// 🔹 连接 MongoDB（暂时注释掉，如果以后需要恢复，取消注释即可）
// mongoose.connect("mongodb://localhost:27017/colorsDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// 🔹 创建数据库 Schema 和 Model（暂时不使用数据库存储颜色）
// const colorSchema = new mongoose.Schema({ color: String });
// const Color = mongoose.model("Color", colorSchema);

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // 允许跨域请求
});

// 添加 GET / 端点
app.get("/", (req, res) => {
  res.send("Server is running! 🚀");
});

io.on("connection", async (socket) => {
  console.log("✅ 新用户连接");

  // 🔹 获取数据库中的颜色数据，并发送给新用户（暂时不使用数据库，改为默认颜色）
  const defaultColor = "#3498db";  // 🚀 你可以换成其他默认颜色
  socket.emit("changeColor", defaultColor);

  // 广播当前连接人数
  io.emit("userCount", io.engine.clientsCount);

  // 监听颜色更改
  socket.on("changeColor", async (color) => {
    console.log("🎨 收到用户更改颜色:", color);
    io.emit("changeColor", color); // 广播颜色更新给所有用户

    // 🔹 存储最新的颜色数据（暂时不存入数据库）
    // await Color.findOneAndUpdate({}, { color }, { upsert: true });
  });

  

  socket.on("disconnect", () => {
    console.log("❌ 用户断开连接");
  });
});

// 监听端口 5001 并绑定 0.0.0.0 允许外部访问
const PORT = 5001;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 服务器运行在 http://0.0.0.0:${PORT}`);
});
