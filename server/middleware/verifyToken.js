import jwt from "jsonwebtoken"

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("auth-x");
    if (!token) {
      return res.status(403).json({ message: "access Denaid" });
    }
    if (token.startsWith("Bearer ")){
        token =token.slice(7,token.length).trimLeft()
    } 
    const verified = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user =verified
    next();
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

export default verifyToken;
