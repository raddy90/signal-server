const io = require("socket.io")(process.env.PORT || 3000, {
  cors: { origin: "*" }
});

io.on("connection", socket => {
  console.log("Нов клиент свързан:", socket.id);

  socket.on("signal", data => {
    io.to(data.to).emit("signal", { from: socket.id, signal: data.signal });
  });

  socket.on("disconnect", () => {
    console.log("Клиент се разкачи:", socket.id);
  });
});

console.log("Сигналинг сървър стартиран на порт", process.env.PORT || 3000);
