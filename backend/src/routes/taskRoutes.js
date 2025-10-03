import express from "express"
import { 
    taskGetCtrl, 
    taskGetByIdCtrl, 
    taskPostCtrl, 
    taskUpdateByIdCtrl, 
    taskDeleteByIdCtrl 
} from "../controllers/TaskCtrl.js"

const router = express.Router()

router.get("/", taskGetCtrl)
router.get("/:id", taskGetByIdCtrl)
router.post("/", taskPostCtrl)
router.put("/update/:id", taskUpdateByIdCtrl)
router.delete("/delete/:id", taskDeleteByIdCtrl)

export default router 