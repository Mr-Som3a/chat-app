import User from "../models/users.model.js";
import cloudinary from "../middleware/upload.js"
export const usersContact = async (req, res) => {
  
  try {
    const { _id } = req.user;
  
    const filteredUsers =await User.find({ _id: { $ne: _id } }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({message:error.message+" hello"})
  }
};

export const ProfileImg = async (req, res) => {
  try {
    const { picturePath,id } = req.body;

    if (!picturePath) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(picturePath,{
      use_filename: true,      // use original file name
      unique_filename: false,  // do not add random string
      overwrite: true,         // optional: replace if exists
    });
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { picturePath: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

