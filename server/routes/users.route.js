import { Router } from "express";
import usersContact from "../controllers/users.js";

const router = Router()

router.get("/users",usersContact)

export default router