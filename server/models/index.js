import Notification from "./Notification.js";
import NotificationSource from "./NotificationSource.js";
import Post from "./Post.js";
import Squad from "./Squad.js";
import User from "./User.js";
import UserGoal from "./UserGoal.js";
import { UserGoalCategory } from "./UserGoalCategory.js";

UserGoal.belongsTo(UserGoalCategory, {onDelete: "CASCADE"})
UserGoalCategory.hasMany(UserGoal);

User.belongsTo(Squad , {onDelete: "CASCADE"});
Squad.hasMany(User);

NotificationSource.belongsTo(Notification, { foreignKey: 'notificationId' });
Notification.hasMany(NotificationSource, { foreignKey: 'notificationId', onDelete: 'CASCADE', });


const models = {
    UserGoal,
    UserGoalCategory,
    Post,
    Squad,
    NotificationSource
}

export default models