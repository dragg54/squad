import { DataTypes } from 'sequelize';
import db from '../configs/db.js'
import User from './User.js';
import UserGoal from './UserGoal.js';

const GoalPartner = db.define('goal_partner', {
 
});

GoalPartner.belongsTo(User, { foreignKey: 'userId'});
User.hasMany(GoalPartner, { foreignKey: 'userId',  onDelete: 'CASCADE'});

GoalPartner.belongsTo(UserGoal, { foreignKey: 'goalId'});
UserGoal.hasMany(GoalPartner, { foreignKey: 'goalId',  onDelete: 'CASCADE', });

db.sync()
  .then(() => {
    console.log('GoalPartner table has been created.');
  })
  .catch(err => console.log(err));

export default GoalPartner