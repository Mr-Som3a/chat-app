import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    requried: true,
  },
  fullName: {
    type: String,
    requried: true,
  },
  password: {
    type: String,
    requried: true,
    minlength: 6,
  },
  picturePath: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;
