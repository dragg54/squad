import db from "../configs/db.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import Comment from "./Comment.js";

const CommentLike = db.define('commentLike', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  commentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Comment,
      key: 'id',
    },
  }
});

CommentLike.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(CommentLike, { foreignKey: 'userId',  onDelete: 'CASCADE', });

db.sync()
  .then(() => {
    console.log('Comment table has been created.');
  })
  .catch(err => console.log(err));

export default CommentLike;
