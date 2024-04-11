import { Server } from "socket.io";

const io = new Server(4000, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on("send_message", (data) => {
    socket.broadcast.emit("welcome", data);
  });
});