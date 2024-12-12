import db from "../configs/db.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import Role from "./Role.js";

const UserRole = db.define('user_role', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    references: {
      model: User,
      key: 'id',
    },
  },
  roleId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: 'id',
    },
    defaultValue: 1
  }
});

UserRole.hasMany(User, { foreignKey: 'userRoleId' });
User.belongsTo(UserRole, { foreignKey: 'userRoleId',  onDelete: 'CASCADE', });

UserRole.hasMany(Role, {foreignKey: 'roleId'})
Role.belongsTo(UserRole, {foreignKey: 'roleId', onDelete:' CASCADE'})

db.sync()
  .then(() => {
    console.log('UserRole table has been created.');
  })
  .catch(err => console.log(err));

export default UserRole;
