import * as NotificationService from '../services/NotificationService.js'

export const createNotification = async (req, res) => {
    try {
        await NotificationService.createNotification(req)
        return res.json({ message: "Notification created" })
    }
    catch (error) {
        return res.status(error.statusCode || 500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

export const getAllNotifications = async(req, res) =>{
    try{
        const notifications = await NotificationService.getAllNotifications(req)
        return res.json(notifications)
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}

export const subscribeNotification = async(req, res)=>{
    try{
        await NotificationService.subscribeNotification(req)
        res.json("Notification subscribed to")
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}