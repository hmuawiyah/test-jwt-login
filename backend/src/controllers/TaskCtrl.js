import User from "../models/User.js"
import Task from "../models/Task.js"
import jwt from "jsonwebtoken"

export async function taskGetCtrl (req, res) {
    try{
        const taskAll = await Task.find()
        res.status(200).json({ taskAll })
    }catch(error){
        console.log("Error on getting task", error.message)
        res.status(400).json({ msg: "Error on getting task" })
    }
}

export async function taskPostCtrl (req, res){
    let { title, description, staffId, status } = req.body
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({ msg:"No token" })

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)

        if (user.role !== "admin") return res.status(401).json({ msg:"Access Denied" })

        const newTask = new Task({ title, description, staffId, status })
        await newTask.save()

        const debugAll = await Task.find().populate("staffId")

        console.log( JSON.stringify(debugAll, null, 2) )
        
        res.status(201).json({ msg: "Task posted successfully"})
    }catch(error){
        console.log("Error on posting task", error.message)
        res.status(400).json({ msg: "Error on posting task" })
    }
}

export async function taskUpdateByIdCtrl (req, res){ 
    let { id } = req.params
    let { title, description, staffId, status } = req.body

    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({ msg:"No token" })

    const updateData = {}
    title ? updateData.title = title : null
    description ? updateData.description = description : null
    staffId ? updateData.staffId = staffId : null
    status ? updateData.status = status : null

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)

        if (user.role !== "admin") return res.status(401).json({ msg:"Access Denied" })

        const result = await Task.findByIdAndUpdate(id, updateData, { new: true })
        const taskAll = await Task.find()
            
        res.status(201).json({ msg: "Task updated successfully", taskAll})
        // console.log("Result Update by ID: "+result)
        // console.log("Success Update by ID: "+id)
    }catch(error){
        console.log("Error on updating task", error.message)
        res.status(400).json({ msg: "Error on updating task" })
    }
}

export async function taskDeleteByIdCtrl (req, res) {
    let { id } = req.params
    // let { title, description, staffId, status } = req.body

    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({ msg:"No token" })

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)

        if (user.role !== "admin") return res.status(401).json({ msg:"Access Denied" })

        const result = await Task.deleteOne({ _id:id })
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ msg: "Task not found or already deleted" })
        }
        
        res.status(200).json({ msg: "Task deleted successfully" })
        
    }catch(error){
        console.log("Error on deleting task", error.message)
        res.status(400).json({ msg: "Error on deleting task" })
    } 
} 