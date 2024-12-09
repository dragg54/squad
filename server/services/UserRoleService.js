import UserRole from "../models/UserRoles.js"

export const getUserRoles = async(user) =>{
    return await UserRole.findAll({where:{userId: user.id}})
}

export const createUserRole = async(req, trans) =>{
    await UserRole.create(req.body, {transaction: trans})
}

export const removeUserRole = async(req) =>{
    await UserRole.destroy({where:{id: req.params.id}})
}