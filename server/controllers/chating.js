import express from "express";
import { Server } from "socket.io";
import http from "http";
import Message from "../models/messages.model.js";
const app = express();
const server = http.createServer(app);

export const getOldMsg = async (req,res) => {
    try {
        const {id} = req.user
        const {recieverId} =req.params
        
        const chat = await Message.find({$or:[
            {senderId:id,recieverId:recieverId},
            {senderId:recieverId,recieverId:id}
        ]})

        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const chatting = async (req, res) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:8080", // React frontend origin
      methods: ["GET", "POST"],
    },
  });

  const { recieverId } = req.params;
  const { id } = req.user;
  const { text } = req.body;
  const photoPath  = (req.file)? `/public/assets/${req.file.filename}` : null;
  
  try {
    const sendMsg = new Message({
      senderId: id,
      recieverId: recieverId,
      text: text,
      img: photoPath,
    });

    const savedMsg = await sendMsg.save();

    io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("send_message", (data) => {
      socket.broadcast.emit("receive_message", data); // send to all except sender
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
    res.status(201).json(savedMsg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  
};


