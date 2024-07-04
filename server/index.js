import express from 'express'
import dotenv from 'dotenv'
import userRoute from './routes/UserRoute.js'
import userGoalRoute from './routes/UserGoalRoute.js'

const app = express()
dotenv.config()

//routes
app.use("/api/v1/users", userRoute)
app.use("/api/v1/usergoals", userGoalRoute)

app.listen(8080, ()=>{
    console.log("Listening to port 8080")
})