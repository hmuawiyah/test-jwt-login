import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function registerCtrl (req, res) {
    let { userName, email, password, role } = req.body
    const userExists = await User.findOne({ email })

    try{
        if (userExists) return res.status(400).json({ msg: "User already exists" })
        if (!email || !password) { return res.status(400).json({ msg: "Email and password are required" }) }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        let finalRole = "member"
        
        if (req.user && req.user.role == "admin"){ 
            if ( role == "member" || role == "admin" ){
                finalRole = role
            }else{
                return res.status(400).json({ msg: "Failed to register user" })
            }
        }

        if (!req.user || req.user.role !== "admin") {
            finalRole = "member"
        }
        
        const newUser = new User({ userName, email, password: hashedPassword, role:finalRole })
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
        if (!user) return res.status(400).json({ msg: "Invalid credentials user" })
        
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials pass" })
        
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.json({ token })
    }catch(error){
        console.log("Error on /register", error.message)
        res.status(400).json({ msg: "Error" })
    }
}

export async function userCtrl (req, res) {
    const user = req.user
    
    try{
        res.json({user})
    }catch(error){
        res.status(401).json({ msg: "Invalid token" })
    }
}

export async function userAllCtrl (req, res) {
    try{
        const userAll = await User.find().select("-password")
        res.json({userAll})
    }catch(error){
        res.status(401).json({ msg: "Invalid token" })
    }
}

export async function updateByIdCtrl(req, res){
    const { id } = req.params
    const { userName, email, password, role } = req.body
    const updateData = {}
    const user = req.user
    
    try{
        if (user.role !== "admin" && user._id.toString() !== id ) return res.status(401).json({ msg:"Access Denied" })
        // console.log({idnya: id})
        // console.log(typeof id)
        // console.log({userid: user._id})
        // console.log(typeof user._id)
        if (userName) updateData.userName = userName
        if (email) updateData.email = email
        if (role) updateData.role = role
        if (password) {
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
    const user = req.user

    try{
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