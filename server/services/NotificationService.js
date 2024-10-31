import pkg from 'web-push';
const { sendNotification } = pkg;
import Notification from "../models/Notification.js"

export const createNotification = async(req) =>{
    req.body.userId = req.user.id
    await Notification.create(req.body)
    await sendNotificationMessage(req)
}

export const notificationSubscription = async(req, res) => {
    const subscription = req.body;
    // Save subscription to database
    console.log(req.body)
    // res.status(201).json({});
  };

export const getAllNotifications = async(req) =>{
    return Notification.findAll({
        where:{
            userId: req.user.id
        }
    })
}

  
  export const sendNotificationMessage = async(req) => {
    const { subscription, title, message } = req.body;
    const payload = JSON.stringify({ title, message });
  
    try {
      await sendNotification(subscription, payload);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  
  export const subscribeNotification = async(req) =>{
  }