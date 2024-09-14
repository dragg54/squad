import UserGoal from "./UserGoal.js";
import { UserGoalCategory } from "./UserGoalCategory.js";

UserGoal.belongsTo(UserGoalCategory, {onDelete: "CASCADE"})
UserGoalCategory.hasMany(UserGoal);

const models = {
    UserGoal,
    UserGoalCategory
}

export default models