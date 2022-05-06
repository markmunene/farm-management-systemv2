const express = require("express");

const app = express();

const http = require("http");

const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: { origin: "*" },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    //when ceonnect
    // console.log("am connected");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        console.log(users.userId);
        io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text, Conver_id }) => {
        const user = getUser(receiverId);
        io.emit("getMessage", {
            Conver_id,
            senderId,
            text,
        });
    });

    //when disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});
server.listen(3000, () => {
    console.log("listening on *:3000");
});

