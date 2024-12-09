import { Op } from "sequelize"
import User from "../models/User.js"
import { UserGoalCategory } from "../models/UserGoalCategory.js"

export const getUserGoalCategory = async (req) => {
    const user = req.user
    const existingUser = await User.findByPk(user.id, {attributes:['isAdmin']})
    let queryOpt = {}
    if (!await existingUser.toJSON().isAdmin) {
        if(req.query.showGroupGoal == 'false'){
            queryOpt['where'] = {
                name: {
                    [Op.ne]: "Group"
                }
            }
        }
    }
    return await UserGoalCategory.findAll({
        attributes: ['id', 'name'], ...queryOpt
    })
}