import express from "express"
import { taskGetCtrl, taskPostCtrl, taskUpdateByIdCtrl, taskDeleteByIdCtrl } from "../controllers/TaskCtrl.js"

const router = express.Router()

router.get("/", taskGetCtrl)
router.post("/", taskPostCtrl)
router.put("/update/:id", taskUpdateByIdCtrl)
router.delete("/delete/:id", taskDeleteByIdCtrl)

export default router 