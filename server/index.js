import express from 'express'
import dotenv from 'dotenv'
import userRoute from './routes/UserRoute.js'
import userGoalRoute from './routes/UserGoalRoute.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { UserGoalCategory } from './models/UserGoalCategory.js'
import userGoalCategoryRouter from './routes/UserGoalCategoryRoute.js'

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
dotenv.config()

const whitelist = ['http://localhost:5173','http://localhost:5000', 'http://127.0.0.1:5173', 'https://bond-1.onrender.com'];

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    } else if (whitelist.indexOf(origin) === -1) {
      return callback(new Error('not allowed by CORS'), false);
    }
    return callback(null, true);
  },
};

app.use(cors(corsOptions))


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Credentials', 'true');
  
    next();
  });

  // app.use(session());
  

//routes
app.use("/api/v1/users", userRoute)
app.use("/api/v1/usergoals", userGoalRoute)
app.use("/api/v1/usergoalcategories", userGoalCategoryRouter)

app.listen(8080, ()=>{
    console.log("Listening to port 8080")
})