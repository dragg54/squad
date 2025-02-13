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
import avatarRoute from "./routes/AvatarRoute.js"
import inviteRoute from './routes/InviteRoute.js'
import emailRoute from './routes/EmailRoute.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import paymentRoute from "./routes/PaymentRoute.js"
import { router as monthlyGoalRoute } from "./routes/UserMonthlyGoalRoute.js"
import { UserGoalCategory } from './models/UserGoalCategory.js'
import userGoalCategoryRouter from './routes/UserGoalCategoryRoute.js'
import http from 'http'
import { route as donationRoute } from './routes/DonationRoute.js'
import donationPaymentRoute from './routes/DonationPaymentRoute.js'
import { registerUser, removeUser } from './socket.io/users.js';
import { sendPostCreatedNotification, sendPostLikedNotificationToUser } from './socket.io/postNotification.js';
import { sendGoalCreatedNotification } from './socket.io/goalNotification.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { scheduleJob } from './services/schedulers/index.js';
import logger from './logger.js';
import { goalReminderRoute } from './routes/GoalReminderRoute.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config()
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

const whitelist = ['http://localhost:5173', 'https://localhost:5173', 'http://localhost:5000', 'http://127.0.0.1:5173', 'https://squad-63mu.onrender.com']

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
const server = http.createServer(app,  {cors: corsOptions});

// Middleware to log all incoming requests
app.use((req, res, next) => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const { method, url } = req;
    const { statusCode } = res;
    const logMessage = `${method} ${url} ${statusCode} - ${duration}ms`;
    if (statusCode >= 500) {
      logger.error(logMessage);
    } else if (statusCode >= 400) {
      logger.warn(logMessage);
    } else {
      logger.info(logMessage);
    }  });
  //  logger.info(statusMessage)
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

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
app.use("/api/v1/avatars", avatarRoute)
app.use("/api/v1/emailVerifications", emailRoute)
app.use("/api/v1/donationPayments", donationPaymentRoute)
app.use("/api/v1/monthlyGoals", monthlyGoalRoute)
app.use("/api/v1/goalReminders", goalReminderRoute)

const clientBaseURl = process.env.NODE_ENV ==  'Development' || !process.env.NODE_ENV ? 
                    process.env.LOCAL_CLIENT_BASE_URL :
                     process.env.PROD_CLIENT_NASE_URL


const io = new Server(server, {
  cors: {
    origin:clientBaseURl
  }
})

//schedule job
scheduleJob(io)

server.listen(8080, ()=>{
    console.log(`Listening to port 8080: Environment is ${process.env.NODE_ENV}`)
})

io.on('connection', (socket) => {
  socket.on('register', (userId) => {
      registerUser(userId, socket.id);
  });

  socket.on('postLiked', ({ authorId, senderId }) => {
      sendPostLikedNotificationToUser(authorId, io, senderId);
  });

  socket.on('postCreated', ({ authorId, squadId }) => {
    sendPostCreatedNotification(authorId, squadId, io);
});

  socket.on('goalCreated', ({ authorId, squadId}) =>{
    sendGoalCreatedNotification(authorId, squadId, io)
  })

  socket.on('goalCreated', ({ authorId, squadId}) =>{
    sendGoalCreatedNotification(authorId, squadId, io)
  })

  socket.on('disconnect', () => {
      removeUser(socket.id);
  });
});

