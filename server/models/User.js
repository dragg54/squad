import { DataTypes } from 'sequelize';
import db from '../configs/db.js'

const User = db.define('user', {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  userName: {
    type: DataTypes.STRING,
  },
  bio:{
    type: DataTypes.STRING,
  },
  isAdmin:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  profileAvatar:{
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

db.sync()
  .then(() => {
    console.log('User table has been created.');
  })
  .catch(err => console.log(err));

export default User