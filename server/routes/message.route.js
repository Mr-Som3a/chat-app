import { Router } from "express";
import upload from "../middleware/upload.js";
import verifyToken from "../middleware/verifyToken.js";
import {getOldMsg, sendMessage}from "../controllers/messages.js";

const router = Router()

router.get("/:recieverId",verifyToken, getOldMsg) // done
router.post("/:recieverId",verifyToken,upload.single('photoPath'),sendMessage) // done


export default router
