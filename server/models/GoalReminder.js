import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import User from "./User.js";
import GoalPartner from "./GoalPartner.js";
import UserGoal from "./UserGoal.js";

const GoalReminder = db.define('goal_reminder', {
  goalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  goalOwnerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  remindedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isSeen:{
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: true,
});




GoalReminder.belongsTo(UserGoal, {as: "userGoal",
  foreignKey: 'goalId',
});
UserGoal.hasMany(GoalReminder, {as: "reminder",
    foreignKey: 'goalId'})

User.hasMany(GoalReminder, {as: 'goalReminder', foreignKey: 'goalOwnerId' })
GoalReminder.belongsTo(User, {as: 'goalOwner', foreignKey: 'goalOwnerId' })

User.hasMany(GoalReminder, {as: 'reminder', foreignKey: 'remindedBy' })
GoalReminder.belongsTo(User, {as: 'partner', foreignKey: 'remindedBy' })


export default GoalReminder;