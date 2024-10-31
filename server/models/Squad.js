import { DataTypes } from 'sequelize';
import db from '../configs/db.js'

const Squad = db.define('squad', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  maxMembership: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});

db.sync()
  .then(() => {
    console.log('Squad table has been created.');
  })
  .catch(err => console.log(err));

export default Squad