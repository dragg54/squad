import { DataTypes } from "sequelize";
import User from "./User.js";
import db from "../configs/db.js";
import Squad from "./Squad.js";
import NotificationSource from "./NotificationSource.js";

const Notification = db.define('notification', {
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    recipientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    squadId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    detailLink:{
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('INFO', 'WARNING', 'ALERT', 'REMINDER'),
        defaultValue: 'INFO',
    },
    status: {
        type: DataTypes.ENUM('UNREAD', 'READ', 'ARCHIVED'),
        defaultValue: 'UNREAD',
    },
    readAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
});

Notification.belongsTo(User, { foreignKey: 'recipientId' });
User.hasMany(Notification, { foreignKey: 'recipientId', onDelete: 'CASCADE', });


Notification.belongsTo(User, { foreignKey: 'senderId' });
User.hasMany(Notification, { foreignKey: 'senderId', onDelete: 'CASCADE', });

Notification.belongsTo(Squad, { foreignKey: 'squadId' });
Squad.hasMany(Notification, { foreignKey: 'squadId', onDelete: 'CASCADE', });




db.sync()
    .then(() => {
        console.log('Notification table has been created.');
    })
    .catch(err => console.log(err));

export default Notification;
