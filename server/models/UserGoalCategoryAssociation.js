import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import UserGoal from "./UserGoal.js";
import { UserGoalCategory } from "./UserGoalCategory.js";

export const UserGoalCategoryAssociation = db.define("user_goal_category_association", {
})


UserGoalCategoryAssociation.belongsToMany(UserGoal);
UserGoalCategoryAssociation.belongsToMany(UserGoalCategory, {onDelete: "CASCADE"})

db.sync()
  .then(() => {
    console.log('UserGoal category association table has been created.');
  })
  .catch(err => console.log(err));