const PORT = process.env.PORT || 4000;

const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/", (_req, res) => {
	res.sendFile("index.html");
});

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

io.on("connection", socket => {
	console.log(`User connected: ${socket.id}`);

	socket.on("sendMessage", data => {
		socket.broadcast.emit("receiveMessage", data);
	});
});

