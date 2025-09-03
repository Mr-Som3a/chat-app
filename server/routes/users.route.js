import { Router } from "express"
import {usersContact,ProfileImg } from "../controllers/users.js"
import verifyToken from "../middleware/verifyToken.js"
const router = Router()

router.get("/",verifyToken,usersContact) // done
router.put("/profile/:id",verifyToken,ProfileImg)

export default router