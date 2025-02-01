import { Op } from "sequelize";
import { notificationSource, notificationType } from "../../constants/NotificationConstants.js";
import Notification from "../../models/Notification.js";
import User from "../../models/User.js";
import UserGoal from "../../models/UserGoal.js";
import { sendGoalExpiredNotification } from "../../socket.io/goalNotification.js";
import { updateUserGoal } from "../UserGoalService.js";
import { addPoint } from "../PointService.js";
import Point from "../../models/Point.js";
import { activityPoints } from "../../constants/ActivityPoints.js";
import db from "../../configs/db.js";
import { createNotification } from "../NotificationService.js";
import logger from "../../logger.js";
import GoalPartner from "../../models/GoalPartner.js";
import GoalReminder from "../../models/GoalReminder.js";

export async function scheduleGoalExpiration(io) {
    try {
        const now = new Date().setMonth(new Date().getMonth() + 1);
        const transaction = await db.transaction()
        const formattedNow = new Date(now).toISOString().slice(0, 19).replace('T', ' ');
        const expiredGoals = await UserGoal.findAll({
            attributes: ['id', 'squadId'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'userName']
                },
                {
                    model: GoalPartner,
                    attributes: ["id"]
                }

            ],
            where: {
                endDate: {
                    [Op.lte]: formattedNow,
                },
                completed: false,
                isExpired: false
            }
        });

        if (expiredGoals && expiredGoals.length) {
            await Promise.all(expiredGoals?.map(async (userGoal) => {
                await UserGoal.update({
                    isExpired: true
                }, { where: { id: userGoal.id } }, { transaction })

                await deductUserPoint(userGoal.user.id, transaction, userGoal.user.id, 3)
                await deductPartnerPoint(userGoal, transaction)
                const notificationRequest = {
                    senderId: userGoal.squadId,
                    recipientId: userGoal.user.id,
                    squadId: userGoal.squadId,
                    title: "NOTIFICATION",
                    message: `One of your goals has expired`,
                    type: notificationType.INFO,
                    sourceId: userGoal.id,
                    sourceName: notificationSource.GOALEXPIRATION
                }
                await createNotification(notificationRequest)
                await transaction.commit()
                await sendGoalExpiredNotification(userGoal.user.id, userGoal.squadId, io)
                logger.INFO("Expiration notification sent")
            }))
        }
    }
    catch (err) {
        logger.error('Goal expiration failed', err.message)
    }

}

async function deductUserPoint(userId, transaction, deductionPoint) {
    await Point.decrement('points', {
        by: activityPoints.goalCreationPoints + deductionPoint,
        where: {
            userId: userId,
        }
    }, { transaction })
}


export async function deductPartnerPoint(userGoal, transaction) {
    const goalReminders = await GoalReminder.findOne({
        where:
        {
            goalId: userGoal.id,
            remindedBy: {
                [Op.notIn]: userGoal.partner
            },
            include: [{
                model: GoalPartner,
                as: 'reminder',
                attributes: ['id'],
                include:{
                    model: User,
                    attributes: ["id"]
                }
            }]
        }
    })
    for(const rem of goalReminders){
        await deductUserPoint(rem.reminder.user.id, transaction, 2)
        const notificationRequest = {
            senderId: userGoal.squadId,
            recipientId: rem.reminder.user.id,
            squadId: userGoal.squadId,
            title: "NOTIFICATION",
            message: `Oops!!! Your point got deducted because you forgot to remind ${userGoal.user.userName} about one of his goal.`,
            type: notificationType.INFO,
            sourceId: userGoal.id,
            sourceName: notificationSource.GOALEXPIRATION
        }
        await createNotification(notificationRequest)
        await transaction.commit()
        await sendGoalExpiredNotification(userGoal.user.id, userGoal.squadId, io)
        logger.INFO("Expiration notification sent")
}
}
