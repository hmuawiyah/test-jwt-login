import jwt from "jsonwebtoken"
import User from "../models/User.js"

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ msg: "No token" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select("-password -__v -updatedAt -createdAt")
    if (!user) return res.status(401).json({ msg: "User not found" })

    req.user = user
    next()
  } catch (err) {
    console.log("Auth error:", err.message)
    res.status(401).json({ msg: "Invalid token" })
  }
}

export default auth
