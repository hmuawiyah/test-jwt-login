import express from "express"
import auth from "../middleware/auth.js"
import { 
    taskGetCtrl, 
    taskGetByIdCtrl, 
    taskPostCtrl, 
    taskUpdateByIdCtrl, 
    taskDeleteByIdCtrl 
} from "../controllers/TaskCtrl.js"

const router = express.Router()

router.get("/", auth, taskGetCtrl)
router.get("/:id", auth, taskGetByIdCtrl)
router.post("/", auth, taskPostCtrl) 
router.put("/update/:id", auth, taskUpdateByIdCtrl)
router.delete("/delete/:id", auth, taskDeleteByIdCtrl)

export default router 