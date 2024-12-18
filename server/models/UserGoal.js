import db from "../configs/db.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import { UserGoalCategory } from "./UserGoalCategory.js";
import Squad from "./Squad.js";

const UserGoal = db.define('user_goal', {
  userId: {
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
      model: Squad,
      key: 'id',
    },
  },
  groupGoalId:{
    type: DataTypes.INTEGER,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  frequency:{
    type: DataTypes.ENUM('custom', 'daily', 'monthly', 'yearly'),
    defaultValue: 'daily'
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isExpired:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  startDate: {
    type: DataTypes.DATE
  },
  endDate: {
    type: DataTypes.DATE
  },
});

UserGoal.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(UserGoal, { foreignKey: 'userId',  onDelete: 'CASCADE', });

UserGoal.belongsTo(Squad, {foreignKey: 'squadId'})
Squad.hasMany(UserGoal, {foreignKey: 'squadId', onDelete: 'CASCADE'})

db.sync()
  .then(() => {
    console.log('UserGoal table has been created.');
  })
  .catch(err => console.log(err));

export default UserGoal;
