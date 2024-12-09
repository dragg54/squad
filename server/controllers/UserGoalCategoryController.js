import * as userGoalCategoryService from '../services/UserGoalCategory.js'

export const getAllUserGoalCategory = async(req, res) =>{
    try{
        const userGoalCategories = await userGoalCategoryService.getUserGoalCategory(req)
        return res.json(userGoalCategories)
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}