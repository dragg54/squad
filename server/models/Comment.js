import { DataTypes } from "sequelize";
import Post from "./Post.js";
import db from "../configs/db.js";
import User from "./User.js";

const Comment = db.define('comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: 'id',
        },
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    timestamps: true,
  });
  

  Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE',
  });
  Comment.belongsTo(Post, {
    foreignKey: 'postId',
  });

  User.hasMany(Comment)
  Comment.belongsTo(User, { foreignKey: 'userId'})

  export default Comment;