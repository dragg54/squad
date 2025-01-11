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
                }, { where: { id: userGoal.id } }, { transaction})

                await Point.decrement('points', {
                    by: activityPoints.goalCreationPoints + 2,
                    where: {userId: userGoal.user.id,
                    }}, {transaction})

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
            }))
        }
    }
    catch (err) {
        console.log(err)
    }

}
