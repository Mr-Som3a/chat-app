import { Router } from "express";
import * as Auth from "../controllers/auth.js";
import upload from "../middleware/upload.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router()

router.get("/check", verifyToken ,Auth.checkAuth) 
router.post("/signup", upload.single('photoPath'), Auth.Signup)  // done
router.post("/login", Auth.Login) // done
router.post("/logout", Auth.Logout) 

export default router
