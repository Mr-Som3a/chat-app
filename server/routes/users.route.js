import { Router } from "express"
import usersContact from "../controllers/users.js"
import verifyToken from "../middleware/verifyToken.js"
import ProfileImg from "../controllers/profile.js"
import upload from "../middleware/upload.js"
const router = Router()

router.get("/",verifyToken,usersContact) // done
router.put("/:id/profile",verifyToken,upload.single('photoPath'),ProfileImg)

export default router