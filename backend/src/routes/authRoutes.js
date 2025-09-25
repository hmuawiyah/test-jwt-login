import express from "express"
import { registerCtrl, loginCtrl, profileCtrl } from "../controllers/UserCtrl.js"

const router = express.Router()

router.post("/register", registerCtrl)
router.post("/login", loginCtrl)
router.get("/profile", profileCtrl)

export default router