import express from "express"
import auth from "../middleware/auth.js"
import { 
    registerCtrl, 
    loginCtrl, 
    profileCtrl, 
    updateByIdCtrl, 
    deleteByIdCtrl 
} from "../controllers/UserCtrl.js"

const router = express.Router()

router.post("/register", registerCtrl)
router.post("/login", loginCtrl)
router.get("/profile", auth, profileCtrl)
router.put("/update/:id", auth, updateByIdCtrl)
router.delete("/delete/:id", auth, deleteByIdCtrl)

export default router