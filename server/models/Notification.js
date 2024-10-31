import { DataTypes } from "sequelize";
import User from "./User.js";
import db from "../configs/db.js";

const Notification = db.define('notification', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
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

Notification.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Notification, { foreignKey: 'userId', onDelete: 'CASCADE', });

db.sync()
    .then(() => {
        console.log('Notification table has been created.');
    })
    .catch(err => console.log(err));

export default Notification;
