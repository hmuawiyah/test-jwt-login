import express from "express"
import { registerCtrl, loginCtrl, profileCtrl, updateByIdCtrl, deleteByIdCtrl } from "../controllers/UserCtrl.js"

const router = express.Router()

router.post("/register", registerCtrl)
router.post("/login", loginCtrl)
router.get("/profile", profileCtrl)
router.put("/update/:id", updateByIdCtrl)
router.delete("/delete/:id", deleteByIdCtrl)

export default router