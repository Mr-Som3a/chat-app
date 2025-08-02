import Message from "../models/messages.model.js";
import { getRecieverSocketId, io } from "../config/socket.js";

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

export const sendMessage = async (req, res) => {
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
    
    await sendMsg.save();
    const recieverSocketId = getRecieverSocketId(recieverId)
    if(recieverSocketId){
      io.to(recieverSocketId).emit("newMessage",sendMsg)
    }
    res.status(201).json(sendMsg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  
};
