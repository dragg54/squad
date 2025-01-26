import logger from "../logger.js";
import { getAllUsers } from "../services/UserService.js";
import { users } from "./users.js";

export async function sendGoalCreatedNotification(userId, squadId, io) {
    try {
        const userRequest = {
            user: {
                id: userId,
                squadId: squadId
            }
        }

        const usersToRecieveNotification = await getAllUsers(userRequest)
        usersToRecieveNotification.forEach((user) => {
            if (user.id != userId) {
                const recipientSocketId = users.get(user.id)
                if (recipientSocketId) {
                    io.to(recipientSocketId).emit('receiveNotification', "Message delivered");
                } else {
                    logger.error(`User ${userId} is not connected`);
                }
            }
        })
    }
    catch (err) {
        logger.error(err)
    }
}

export async function sendGoalExpiredNotification(userId, squadId, io) {
    try {
        const recipientSocketId = users.get(userId)
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('receiveNotification', "Message delivered");
        } else {
            logger.error(`User ${userId} is not connected`);
        }
    }
    catch (err) {
        logger.error(err.message)
    }
}

export async function sendGoalExpirationReminderNotification(userId, squadId, io) {
    try {
        const recipientSocketId = users.get(userId)
        if (recipientSocketId) {
            logger.info("Notification handled")
            io.to(recipientSocketId).emit('receiveNotification', "Message delivered");
        } else {
            logger.error(`User ${userId} is not connected`);
        }
    }
    catch (err) {
        logger.error(err.message)
    }
}