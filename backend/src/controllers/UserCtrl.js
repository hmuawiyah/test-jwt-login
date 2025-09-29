import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function registerCtrl (req, res) {
    let { email, password, role } = req.body
    const userExists = await User.findOne({ email })
    try{
        if (userExists) return res.status(400).json({ msg: "User already exists" })
        if (!email || !password) { return res.status(400).json({ msg: "Email and password are required" }) }

        const hashedPassword = await bcrypt.hash(password, 10)

        if (!role){ role = "member" }
        if (role !== "admin" && role !== "member" ){ return res.status(400).json({ msg: "Failed to register user" }) }
        
        const newUser = new User({ email, password: hashedPassword, role })
        await newUser.save()

        const userAll = await User.find()
             
        res.status(201).json({ msg: "User registered successfully", userAll })
    }catch(error){
        console.log("Error on /register", error.message)
        res.status(400).json({ msg: "Error" })
    }
}

export async function loginCtrl (req, res) {
    const { email, password } = req.body

    try{
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ msg: "Invalid credentials" })
        
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" })
        
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.json({ token })
    }catch(error){
        console.log("Error on /register", error.message)
        res.status(400).json({ msg: "Error" })
    }
}

export async function profileCtrl (req, res) {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({ msg:"No token" })
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        const userAll = await User.find()

        res.json({user, userAll})

    }catch(error){
        res.status(401).json({ msg: "Invalid token" })
    }
}

export async function updateByIdCtrl(req, res){
    const { id } = req.params
    const { email, password, role } = req.body
    const updateData = { email, role }

    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({ msg:"No token" })
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)

        if (user.role !== "admin") return res.status(401).json({ msg:"Access Denied" })
        if (password && password.trim() !== '') {
            const hashedPassword = await bcrypt.hash(password, 10)
            updateData.password = hashedPassword
        }

        const result = await User.findByIdAndUpdate(id, updateData, { new: true })
        const userAll = await User.find()

        res.status(200).json({ msg: "User update successfully", userAll })
    }catch(error){
        console.log("Error on update by id: "+error.message)
    }
}

export async function deleteByIdCtrl(req, res){
    const { id } = req.params
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({ msg:"No token" })
   
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)

        if (user.role !== "admin") return res.status(401).json({ msg:"Access Denied" })
        
        const result = await User.deleteOne({ _id:id })

        if (result.deletedCount === 0) {
            return res.status(404).json({ msg: "User not found or already deleted" })
        }
        
        res.status(200).json({ msg: "User deleted successfully" })

        console.log("Success Delete by ID: "+id)
    }catch(error){
        console.log("Error on delete by id: "+error.message)
    }
}