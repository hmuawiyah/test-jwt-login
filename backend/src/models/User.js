import mongoose from "mongoose"
import dayjs from "dayjs"

const UserSchema = new mongoose.Schema({
    userName : { type: String, required: true, },
    email : { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
}, {
    timestamps: true    
})

UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    if (ret.createdAt) {
      ret.createdAt = dayjs(ret.createdAt).format("YYYY-MM-DD HH:mm:ss")
    }
    if (ret.updatedAt) {
      ret.updatedAt = dayjs(ret.updatedAt).format("YYYY-MM-DD HH:mm:ss")
    }
    return ret
  }
})

export default mongoose.model("User", UserSchema)