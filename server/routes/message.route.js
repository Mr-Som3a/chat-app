import { Router } from "express";
import {getOldMsg, sendMessage }from "../controllers/messages.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router()


router.get("/:recieverId",verifyToken, getOldMsg) // done
router.post("/:recieverId",verifyToken,sendMessage) // done


export default router
