import db from "../configs/db.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import Post from "./Post.js";

const PostLike = db.define('like', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Post,
      key: 'id',
    },
  }
});

PostLike.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(PostLike, { foreignKey: 'userId',  onDelete: 'CASCADE', });

db.sync()
  .then(() => {
    console.log('Post table has been created.');
  })
  .catch(err => console.log(err));

export default PostLike;
