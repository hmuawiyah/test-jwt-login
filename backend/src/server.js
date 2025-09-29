import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(cors())


app.use("/api/user", userRoutes)
app.use("/api/task", taskRoutes)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
})