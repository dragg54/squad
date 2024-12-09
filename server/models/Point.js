import db from "../configs/db.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import Squad from "./Squad.js";

const Point = db.define('point', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  squadId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Squad,
      key: 'id',
    },
  },
  points:{
    type: DataTypes.INTEGER
  },
});

Point.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Point, { foreignKey: 'userId',  onDelete: 'CASCADE', });

db.sync()
  .then(() => {
    console.log('Point table has been created.');
  })
  .catch(err => console.log(err));

export default Point;
