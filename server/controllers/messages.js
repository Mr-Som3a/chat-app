import Message from "../models/messages.model.js";
import { getRecieverSocketId, io } from "../config/socket.js";
import cloudinary from "../middleware/upload.js";

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
  const { text,image } = req.body;
  let imageUrl = null;
  try {
    if(image){
      try {
        const result = await cloudinary.uploader.upload(image,{
      use_filename: true,      // use original file name
      unique_filename: false,  // do not add random string
      overwrite: true,         // optional: replace if exists
    })
        console.log(result,"result")
        imageUrl = result.secure_url
      } catch (error) {
        console.log(error)
      }
    }

    const sendMsg = new Message({
      senderId: id,
      recieverId: recieverId,
      text: text,
      img: imageUrl,
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
