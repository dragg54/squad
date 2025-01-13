import { notificationSource, notificationType } from "../../constants/NotificationConstants.js";
import Notification from "../../models/Notification.js";
import User from "../../models/User.js";
import logger from "../../logger.js";
import { sendBirthdayNotification } from "../../socket.io/birthdayNotification.js";
import { createNotification } from "../NotificationService.js";

export async function scheduleBirthday(io) {
    const today = getTodayDate()
    try {
        const birthdayUsers = await User.findAll({
            attributes: ['id', 'userName', 'birthday', 'squadId'],
            where: {
                birthday: today
            }
        });
        if (birthdayUsers && birthdayUsers.length) {
            await Promise.all(birthdayUsers?.map(async (user) => {
                const usersInSquad = await User.findAll({
                    attributes: ['id','squadId'],
                    where: {
                        squadId: user.squadId
                    }
                })

                const notificationRequest = usersInSquad.map((squadMember) => {
                    return {
                        senderId: user.squadId,
                        recipientId: squadMember.id,
                        squadId: user.squadId,
                        title: "NOTIFICATION",
                        message: `Today is ${user.userName}'s birthday`,
                        type: notificationType.INFO,
                        sourceId: user.id,
                        sourceName: notificationSource.BIRTHDAY
                    }
                })
                await Notification.bulkCreate(notificationRequest)
                await sendBirthdayNotification(user.id, user.squadId, io)
                logger.info("Birthday notification sent")
            }))
        }
    }

    catch (err) {
        logger.error("Send birthday notification failed", err.message)
    }

}

const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
};