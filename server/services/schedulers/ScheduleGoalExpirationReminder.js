import { Op } from "sequelize";
import { notificationSource, notificationType } from "../../constants/NotificationConstants.js";
import Notification from "../../models/Notification.js";
import User from "../../models/User.js";
import UserGoal from "../../models/UserGoal.js";
import db from "../../configs/db.js";
import { createNotification } from "../NotificationService.js";
import logger from "../../logger.js";
import { goalFrequency } from "../../constants/GoalFrequency.js";
import { sendGoalExpirationReminderNotification } from "../../socket.io/goalNotification.js";

export async function scheduleGoalExpirationReminder(io) {
    const now = new Date();
    try {
        const goals = await UserGoal.findAll({
            where: {
                completed: false,
            },
            include:[
                {
                    model: User,
                    attributes: ["id"]
                }
            ],
            attributes: ["id", 'squadId', 'title', "endDate",
            'frequency' ]
        });

        for(const goal of goals){
            const reminderTime = getReminderTime(goal.frequency, goal.endDate);
            if ((now >= reminderTime) && (now < new Date(goal.endDate))) {
                await sendReminderNotification(goal.userId, goal, io);
            }
        }
    }
    catch (err) {
        logger.error('Goal expiration failed', err.message)
    }

}

function getReminderTime(frequency, deadline) {
    const reminderTime = new Date(deadline);
    if (frequency == goalFrequency.daily) {
        reminderTime.setHours(reminderTime.getHours() - 6);
    } else if (frequency === goalFrequency.monthly) {
        reminderTime.setDate(reminderTime.getDate() - 1);
    } else if (frequency === goalFrequency.yearly) {
        reminderTime.setMonth(reminderTime.getMonth() - 1);
    }
    return reminderTime;
}


async function sendReminderNotification(userId, userGoal, io) {
    const notificationRequest = {
        senderId: userGoal.squadId,
        recipientId: userGoal.user.id,
        squadId: userGoal.squadId,
        title: "NOTIFICATION",
        message: `One of your goal is about to expire`,
        detailLink: `/goal/${userGoal.id}`,
        type: notificationType.INFO,
        sourceId: userGoal.id,
        sourceName: notificationSource.GOALEXPIRATION
    }
    await createNotification(notificationRequest)
    await sendGoalExpirationReminderNotification(userGoal.user.id, userGoal.squadId, io)
    logger.info("Expiration notification sent")

}