import User from "../models/users.model.js";

const usersContact = async (req, res) => {
  const { id } = req.user;
 
  try {
    const filteredUsers =await User.find({ _id: { $ne: id } }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({message:error.message+" hello"})
  }
};

export default usersContact;
