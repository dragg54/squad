import Point from "../models/Point.js"
import User from "../models/User.js"

export const addPoint = async(req, trans) =>{
    const existingPoints = await getUserPoints(req.userId)
    if(!existingPoints){
        await Point.create(req, {transaction: trans})
    }
    else{
        req.points = existingPoints.points + req.points
        await updatePoint(req, trans)
    }
}

export const updatePoint = async(req, trans) =>{
    const {points, userId} = req
    await Point.update({points: points},{where:{userId: userId}}, {transaction: trans})
 }

export const getUserPoints = async(id) =>{
    return await Point.findByPk(id)
}

export const getPoints = async(req) =>{
    return await Point.findAll(
        {where:{squadId: req.user.squadId}, order:[["points", "DESC"]],
        include: {
            model: User,
            attributes: ["firstName", "lastName", "userName", "profileAvatar"] 
        },
    })
}