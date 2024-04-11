import http from "http";
import express from "express";
import { Server } from "socket.io";

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
let options = {};
	
if (process.env.NODE_ENV == "production") {
	app.use(express.static("../client/dist"));
	app.get("/", (_req, res) => {
		res.sendFile("index.html");
	});
}
else {
	options = {
		cors: {
			origin: "http://localhost:3000",
			methods: ["GET", "POST"]
		}
	};
}

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

const io = new Server(server, options);

io.on("connection", socket => {
	console.log(`User connected: ${socket.id}`);
	
	socket.on("sendMessage", data => {
		socket.broadcast.emit("receiveMessage", data);
	});
});