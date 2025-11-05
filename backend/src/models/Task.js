import mongoose from "mongoose"
import dayjs from "dayjs"

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in progress', 'completed'],
    default: 'pending'
  },
  level: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  }
}, {
  timestamps: true
})

taskSchema.set("toJSON", {
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


taskSchema.pre(/^find/, function(next) {
  this.populate('staffId', 'userName email role')
  this.populate('assignedBy', 'userName email role')
  next()
})

export default mongoose.model('Task', taskSchema)