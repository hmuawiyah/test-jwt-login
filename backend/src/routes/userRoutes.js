import express from "express"
import auth from "../middleware/auth.js"
import authOptional from "../middleware/authOptional.js"
import authAdminOnly from "../middleware/authAdminOnly.js"
import { 
    registerCtrl, 
    loginCtrl, 
    userCtrl, 
    userAllCtrl, 
    updateByIdCtrl, 
    deleteByIdCtrl 
} from "../controllers/UserCtrl.js"

const router = express.Router()

router.post("/register", authOptional, registerCtrl)
router.post("/login", loginCtrl)
router.get("/user", auth, userCtrl)
router.get("/userAll", auth, authAdminOnly, userAllCtrl)
router.put("/update/:id", auth, updateByIdCtrl)
router.delete("/delete/:id", auth, authAdminOnly, deleteByIdCtrl)

export default router