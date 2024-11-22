import db from "../configs/db.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import { UserGoalCategory } from "./UserGoalCategory.js";

const UserGoal = db.define('user_goal', {
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
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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

db.sync()
  .then(() => {
    console.log('UserGoal table has been created.');
  })
  .catch(err => console.log(err));

export default UserGoal;
