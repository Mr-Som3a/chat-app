import { Router } from "express";
import upload from "../middleware/upload.js";
import verifyToken from "../middleware/verifyToken.js";
import {chatting ,getOldMsg}from "../controllers/chating.js";

const router = Router()

router.get("/:recieverId",verifyToken, getOldMsg)
router.post("/:recieverId",verifyToken,upload.single('photoPath'),chatting)


export default router
