import jwt from "jsonwebtoken"
import User from "../models/User.js"

const authOptional = async (req, res, next) => {
    // const token = req.headers.authorization?.split(" ")[1]
    // if (!token) return res.status(401).json({ msg: "No token" })

    const token = req.headers.authorization?.split(" ")[1]
    // console.log("tokennya: "+req.headers.authorization)
    
    if (!token) return next() 
 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)
        console.log("usernya: "+user)

        if (user) req.user = user

    } catch (err) {

        console.log("Optional auth error:", err.message)
    }
    next()
}

export default authOptional
