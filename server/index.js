import express from 'express'
import { Server } from 'socket.io';
import dotenv from 'dotenv'
import userRoute from './routes/UserRoute.js'
import postRoute from './routes/PostRoute.js'
import commentRoute from './routes/CommentRoute.js'
import userGoalRoute from './routes/UserGoalRoute.js'
import squadRoute from './routes/SquadRoute.js'
import notificationRoute from './routes/NotificationRoute.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { UserGoalCategory } from './models/UserGoalCategory.js'
import userGoalCategoryRouter from './routes/UserGoalCategoryRoute.js'
import http from 'http'
import { registerUser, removeUser, sendNotificationToUser } from './utils/notification.js';


const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
dotenv.config()
const server = http.createServer(app,  {cors: {
  origin:"*"
  }});

const whitelist = ['http://localhost:5173', 'https://localhost:5173', 'http://localhost:5000', 'http://127.0.0.1:5173', 'https://squad-63mu.onrender.com'];

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
app.use("/api/v1/posts", postRoute)
app.use("/api/v1/comments", commentRoute)
app.use("/api/v1/squads", squadRoute)
app.use("/api/v1/notifications", notificationRoute)
app.use("/api/v1/usergoalcategories", userGoalCategoryRouter)



server.listen(8080, ()=>{
    console.log("Listening to port 8080")
})

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
})


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('register', (userId) => {
      registerUser(userId, socket.id);
  });

  socket.on('postLiked', ({ authorId, likerName }) => {
      const message = `${likerName} liked your post!`;
      sendNotificationToUser(authorId, message, io);
  });

  socket.on('disconnect', () => {
      removeUser(socket.id);
  });
});

