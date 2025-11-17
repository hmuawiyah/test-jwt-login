import Task from "../models/Task.js"
// import User from "../models/User.js"
// import jwt from "jsonwebtoken"
 
export async function taskGetCtrl (req, res) {

    try{
        const taskAll = await Task.find()
        res.status(200).json({ taskAll })
        console.log("Task fetched:", taskAll.length)
    }catch(error){
        console.log("Error on getting task", error.message)
        res.status(400).json({ msg: "Error on getting task" })
    }
}

export async function taskGetByIdCtrl(req, res) {
  try {
    const { id } = req.params 
    const taskAll = await Task.find({ staffId: id })

    if (!taskAll) {
      return res.status(404).json({ msg: "Task not found" })
    } 

    res.status(200).json({ taskAll })
  } catch (error) {
    console.log("Error on getting task by id", error.message)
    res.status(400).json({ msg: "Error on getting task by id" })
  }
}


export async function taskPostCtrl (req, res){
    let { title, description, assignedBy, staffId, status, level } = req.body
    const user = req.user

    try{
        if (user.role !== "admin" && user.role !== "member") return res.status(401).json({ msg:"Access Denied" })
        
        // if (user.role === "admin") {
        //     if (!staffId) {
        //         return res.status(400).json({ msg: "Staff ID is required for admin" })
        //     }
        //     assignedBy = user._id
        // } else if (user.role === "member") {
        //     assignedBy = user._id
        //     staffId = user._id   // 💥 di sini kita isi otomatis staffId dengan id user sendiri
        // }
            
        const newTask = new Task({ title, description, assignedBy, staffId, status, level })
        await newTask.save()

        let taskAll

        if (user.role == "admin") { 
            taskAll = await Task.find()
            return res.status(201).json({ msg: "Task posted successfully", taskAll})
        }
        else if (user.role == "member") { 
            taskAll = await Task.find({ staffId })
            return res.status(201).json({ msg: "Task posted successfully", taskAll})
        }
        else { 
            return res.status(403).json({ msg: "Access denied" }) 
        }
        
    }catch(error){
        console.log("Error on posting task", error.message)
        res.status(400).json({ msg: "Error on posting task" })
    }
}

export async function taskUpdateByIdCtrl (req, res){ 
    let { id } = req.params
    let { title, description, staffId, status, level } = req.body
    const user = req.user

    const updateData = {}
    title ? updateData.title = title : null
    description ? updateData.description = description : null
    staffId ? updateData.staffId = staffId : null
    status ? updateData.status = status : null
    level ? updateData.level = level : null

    try{

        if (user.role !== "admin" && user.role !== "member") return res.status(401).json({ msg:"Access Denied" })

        const result = await Task.findByIdAndUpdate(id, updateData, { new: true })

        let taskAll

        if (user.role == "admin") { 
            taskAll = await Task.find()
            return res.status(201).json({ msg: "Task updated successfully", taskAll})
        }
        else if (user.role == "member") { 
            taskAll = await Task.find({ staffId })
            return res.status(201).json({ msg: "Task updated successfully", taskAll})
        }
        else { 
            return res.status(403).json({ msg: "Access denied" }) 
        }
         
    }catch(error){
        console.log("Error on updating task", error.message)
        res.status(400).json({ msg: "Error on updating task" })
    }
}

export async function taskDeleteByIdCtrl (req, res) {
    let { id } = req.params
    const user = req.user

    try{

        if (user.role !== "admin" && user.role !== "member") return res.status(401).json({ msg:"Access Denied" })

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