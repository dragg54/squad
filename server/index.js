import dotenv from 'dotenv'
import express from 'express'
import { Server } from 'socket.io';
import userRoute from './routes/UserRoute.js'
import postRoute from './routes/PostRoute.js'
import pointRoute from './routes/PointRoute.js'
import commentRoute from './routes/CommentRoute.js'
import userGoalRoute from './routes/UserGoalRoute.js'
import notificationSummaryRoute from './routes/NotificationSummaryRoute.js'
import squadRoute from './routes/SquadRoute.js'
import notificationRoute from './routes/NotificationRoute.js'
import inviteRoute from './routes/InviteRoute.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import paymentRoute from "./routes/PaymentRoute.js"
import { UserGoalCategory } from './models/UserGoalCategory.js'
import userGoalCategoryRouter from './routes/UserGoalCategoryRoute.js'
import http from 'http'
import { route as donationRoute } from './routes/DonationRoute.js'
import { registerUser, removeUser } from './socket.io/users.js';
import { sendPostCreatedNotification, sendPostLikedNotificationToUser } from './socket.io/postNotification.js';
import { sendGoalCreatedNotification } from './socket.io/goalNotification.js';


dotenv.config()
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
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
app.use("/api/v1/invites", inviteRoute)
app.use("/api/v1/notifications", notificationRoute)
app.use("/api/v1/usergoalcategories", userGoalCategoryRouter)
app.use("/api/v1/notificationSummaries", notificationSummaryRoute)
app.use("/api/v1/points", pointRoute)
app.use("/api/v1/donations", donationRoute)
app.use("/api/v1/payments", paymentRoute)

server.listen(8080, ()=>{
    console.log("Listening to port 8080")
})

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
})


io.on('connection', (socket) => {
  socket.on('register', (userId) => {
      registerUser(userId, socket.id);
  });

  socket.on('postLiked', ({ authorId }) => {
      sendPostLikedNotificationToUser(authorId, io);
  });

  socket.on('postCreated', ({ authorId, squadId }) => {
    sendPostCreatedNotification(authorId, squadId, io);
});

  socket.on('goalCreated', ({ authorId, squadId}) =>{
    sendGoalCreatedNotification(authorId, squadId, io)
  })

  socket.on('disconnect', () => {
      removeUser(socket.id);
  });
});

