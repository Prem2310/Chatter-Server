const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.get("/", (req, res) => {
    res.send("WebSocket Server For Chatter");
});

io.on("connection", (socket) => {
    socket.on("join", (name) => {
        console.log(`${name} joined with ID : ${socket.id}`);
    });
    socket.on("message", (msg) => {
        console.log(msg);
        socket.broadcast.emit("message", msg);
    });

    socket.on("disconnect", (msg) => {
        console.log("Somebody has left the room");
    });
});

server.listen(3000, () => {
    console.log("Socket Server Listening PORT 3000");
});
