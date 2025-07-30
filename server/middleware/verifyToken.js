import jwt from "jsonwebtoken"
import User from "../models/users.model.js";

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("auth-x");
    if (!token) {
      return res.status(403).json({ message: "access Denaid" });
    }
    if (token.startsWith("Bearer ")){
        token =token.slice(7,token.length).trimLeft()
    } 
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    if(!decoded){
      return res.status(401).json({message:"Token is not valid"})
    }
    const user = await User.findById(decoded.id).select("-password");
    req.user =user
    next();
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

export default verifyToken;
