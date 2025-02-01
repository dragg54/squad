import pkg from 'web-push';
import Notification from '../models/Notification.js'
import { notificationStatus } from '../constants/NotificationConstants.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import db from '../configs/db.js';
import User from '../models/User.js';
import { Op } from 'sequelize';
import NotificationSource from '../models/NotificationSource.js';
const { sendNotification } = pkg;

export const createNotification = async (req, trans) => {
  req.status = notificationStatus.UNREAD
  const newNotification = await Notification.create(req, { transaction: trans })
  await createNotificationSource({notificationId: newNotification.id, ...req})
}

export const getAllNotifications = async (req) => {
  const notifications = await Notification.findAll({
    where: {
      squadId: req.user.squadId,
      recipientId: req.user.id,
      senderId: {
        [Op.ne]: req.user.id
      }
    },
    include:[{
      model: User,
      attributes: ['profileAvatar']
    },
    {
      model: User,
      as: 'sender',
      attributes: ["profileAvatar"]
    },
    {
      model: NotificationSource
    }
  ],
    order: [['createdAt', 'DESC']],
    raw: true,
  });

  const groupedNotifications = notifications.reduce((acc, notification) => {
    const month = new Date(notification.createdAt).toISOString().slice(0, 7);
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(notification);
    return acc;
  }, {});

  const result = Object.keys(groupedNotifications).map((month) => ({
    month,
    notifications: groupedNotifications[month],
  }));

  return result;
}

export async function getNotificationSummary(req) {
  const notifications = await Notification.findAll({
        where: { recipientId: req.user.id, squadId: req.user.squadId, senderId: {
          [Op.ne]: req.user.id
        } },
    attributes: [
      [db.fn('COUNT', db.col('id')), 'total'],
      [
        db.fn('SUM', db.literal("CASE WHEN status = 'READ' THEN 1 ELSE 0 END")),
        'readCount'
      ],
      [
        db.fn('SUM', db.literal("CASE WHEN status = 'UNREAD' THEN 1 ELSE 0 END")),
        'unreadCount'
      ]
    ],
  });

  return notifications.map((notification) => ({
    total: notification.dataValues.total,
    readCount: notification.dataValues.readCount,
    unreadCount: notification.dataValues.unreadCount
  }));
}


export const getNotification = async (req) => {
  return await Notification.findOne({ where: { id: req.params.id } })
}

export const readAllNotifications = async (req) => {
  const queryOPt = {
    // id: req.params.id

  }
  queryOPt['recipientId'] = req.user.id
  await Notification.update({ status: notificationStatus.READ }, {
    where: queryOPt
  })
}

export const createNotificationSource = async(req) =>{
    await NotificationSource.create(req)
}