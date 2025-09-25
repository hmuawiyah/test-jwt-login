import User from '../models/User.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function registerCtrl (req, res) {
    const { email, password } = req.body
    const userExists = await User.findOne({ email })
    try{
        if (userExists) return res.status(400).json({ msg: "User already exists" })
            
        const hashedPassword = await bcrypt.hash(password, 10)
        const roleDef = "member"
        
        const newUser = new User({ email, password: hashedPassword, role: roleDef })
        await newUser.save()
            
        res.status(201).json({ msg: "User registered succesfully" })
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
        const user = await User.findById(decoded.id).select("-password")
        const userAll = await User.find().select("-password")
        console.log("isi user:", user)
        console.log("isi userAll:", userAll)
        res.json(user)

    }catch(error){
        res.status(401).json({ msg: "Invalid token" })
    }
}