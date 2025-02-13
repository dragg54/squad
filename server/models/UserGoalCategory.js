import { DataTypes } from "sequelize";
import db from "../configs/db.js";
import UserGoal from "./UserGoal.js";

export const UserGoalCategory = db.define("user_goal_category", {
    name: {
        type: DataTypes.STRING
    }
})

db.sync()
  .then(() => {
    console.log('UserGoal category table has been created.');
  })
  .catch(err => console.log(err));