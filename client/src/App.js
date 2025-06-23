import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://100.24.4.55:5001"); // 连接到 AWS EC2

function App() {
  const [color, setColor] = useState("white");

  useEffect(() => {
    socket.on("changeColor", (newColor) => {
      setColor(newColor);
    });

    return () => {
      socket.off("changeColor");
    };
  }, []);

  const changeColor = () => {
    const newColor = color === "white" ? "green" : "white";
    socket.emit("changeColor", newColor);
  };

  //显示当前连接人数
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    socket.on("userCount", setUserCount);
    return () => socket.off("userCount");
  }, []);



  
  return (
    <div style={{ height: "100vh", backgroundColor: color, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <button onClick={changeColor} style={{ padding: "10px 20px", fontSize: "20px" }}>
        change color
      </button>
      <p style={{ position: "absolute", top: 10, right: 10 }}>
        Current users: {userCount}
      </p>
    </div>
  );
}

export default App;
