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
  parentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'comments',
      key: 'id',
    },
    allowNull: true,
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
Comment.belongsTo(User, { foreignKey: 'userId' })

Comment.belongsTo(Comment, { foreignKey: 'parentId', as: 'parent' });
Comment.hasMany(Comment, { foreignKey: 'parentId', as: 'children' });


export default Comment;