import { UserGoalCategory } from "../models/UserGoalCategory.js"

export const getUserGoalCategory =async()=>{
    return await UserGoalCategory.findAll({
        attributes: ['id', 'name']
    })
}