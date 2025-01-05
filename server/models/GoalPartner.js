import { DataTypes } from 'sequelize';
import db from '../configs/db.js'
import User from './User.js';
import UserGoal from './UserGoal.js';

const GoalPartner = db.define('goal_partner', {
 
});


db.sync()
  .then(() => {
    console.log('GoalPartner table has been created.');
  })
  .catch(err => console.log(err));

export default GoalPartner