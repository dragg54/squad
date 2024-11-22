import Point from "../models/Point.js"
import User from "../models/User.js"


export const updatePoint = async(req, trans) =>{
    const {points, userId} = req
    await Point.update({points},{where:{userId}}, {transaction: trans})
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

export const addPoint = async(req) =>{
    await Point.increment('points', {
        by: req.points, 
        where: {
          userId: req.userId,
        },
      });
}