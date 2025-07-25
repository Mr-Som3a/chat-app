import bcrypt from "bcryptjs";
import User from "../models/users.model.js";
import genToken from "../genToken.js";

export const Signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const picturePath = req.file||"";

    const isExist = await User.findOne({ email: email });
    if (isExist) {
      return res
        .status(401)
        .json({ message: "email already exists go to login! " });
    }
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullName,
      email,
      password:hashedPassword,
      picturePath,
    });
    const newUser = await user.save();
    const token = genToken(user._id, res);
    
    res.status(201).json({token:token,user:newUser});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const Login = async (req, res) => {
    console.log(req.body)
    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or Password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "No have Credentials" });
    }

    const token =(user)?genToken(user._id, res):null;
    delete user.password;

    res.status(200).json({ token: token, user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const Logout = async (req, res) => {
  res.status(200).send("loged out");
};
