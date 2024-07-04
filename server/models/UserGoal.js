import db from "../configs/db.js";
import { DataTypes } from "sequelize";
import User from "./User.js";

const UserGoal = db.define('UserGoal', {
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
}, {
  timestamps: true,
});

UserGoal.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(UserGoal, { foreignKey: 'userId' });

db.sync()
  .then(() => {
    console.log('UserGoal table has been created.');
  })
  .catch(err => console.log(err));

export default UserGoal;
