import express from "express"
import { registerCtrl, loginCtrl, profileCtrl, deleteByIdCtrl } from "../controllers/UserCtrl.js"

const router = express.Router()

router.post("/register", registerCtrl)
router.post("/login", loginCtrl)
router.get("/profile", profileCtrl)
router.delete("/delete/:id", deleteByIdCtrl)

export default router