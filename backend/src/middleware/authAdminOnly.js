import jwt from "jsonwebtoken"
import User from "../models/User.js"

const authAdminOnly = async (req, res, next) => {

  if (req.user.role !== "admin") {
    console.log("authAdminOnly: bukan admin")
    return res.status(403).json({ message: "Forbidden" })
  }
  next()
}

export default authAdminOnly
