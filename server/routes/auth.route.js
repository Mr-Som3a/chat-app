import { Router } from "express";
import * as Auth from "../controllers/auth.js";
import upload from "../middleware/upload.js";
import verifyToken from "../middleware/verifyToken.js";
import ProfileImg from "../controllers/profile.js";
const router = Router()

router.post("/signup", upload.single('photoPath'), Auth.Signup)
router.post("/login", Auth.Login)
router.post("/logout", Auth.Logout)

router.put("/:id/profile",verifyToken,upload.single('photoPath'),ProfileImg)
export default router
