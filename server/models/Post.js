import db from "../configs/db.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import Squad from "./Squad.js";

const Post = db.define('post', {
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
  parentPostId: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
  }
});

Post.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Post, { foreignKey: 'userId',  onDelete: 'CASCADE', });

db.sync()
  .then(() => {
    console.log('Post table has been created.');
  })
  .catch(err => console.log(err));

export default Post;
