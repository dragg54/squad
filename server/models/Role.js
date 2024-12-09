import db from "../configs/db.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import Squad from "./Squad.js";

const Role = db.define('role', {
  roleName: {
    type: DataTypes.ENUM('MEMBER', 'ADMIN'),
    allowNull: false,
    defaultValue: 'MEMBER'
  },
});


db.sync()
  .then(() => {
    console.log('Role table has been created.');
  })
  .catch(err => console.log(err));

export default Role;
