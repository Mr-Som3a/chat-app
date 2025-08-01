import http from 'http'
import express from 'express'
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);

const userSocketMap = {}; //{userId,socketId}


const io = new Server(server, {
    cors: {
      origin: ["http://localhost:8080"],
    },
  });

  //used to store online users

  io.on("connection", (socket) => {
    console.log("a user connected id: " + socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap[userId] = socket.id;
    }
    console.log(userSocketMap)
    
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnected", () => {
      console.log("a user disconnected id: " + socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });


export function getRecieverSocketId(userId) {
  return userSocketMap[userId];
}


export {io,server,app}