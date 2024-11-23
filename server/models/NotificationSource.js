import { DataTypes } from "sequelize";
import Notification from "./Notification.js";
import db from "../configs/db.js";
import Squad from "./Squad.js";

const NotificationSource = db.define('notification_source', {
    sourceId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sourceName: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

db.sync()
    .then(() => {
        console.log('NotificationSource table has been created.');
    })
    .catch(err => console.log(err));

export default NotificationSource;
