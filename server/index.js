const PORT = 4000;

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
});

io.on("connection", socket => {
	console.log(`User connected: ${socket.id}`);

	socket.on("sendMessage", data => {
		socket.broadcast.emit("receiveMessage", data);
	});
});

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});