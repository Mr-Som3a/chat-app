import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text: String,
    img: String
},{timestamps:true})

const Message = mongoose.model("Message",messageSchema)

export default Message