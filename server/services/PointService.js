import Point from "../models/Point.js"
import User from "../models/User.js"


export const updatePoint = async(req, trans) =>{
    const {points, userId} = req
    await Point.update({points},{where:{userId}}, {transaction: trans})
 }

export const getUserPoints = async(id) =>{
    const point = await Point.findOne({where:{userId: id}})
    return point
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

export const addPoint = async(req, trans) =>{
    let existingPoint = null;
    if(req && req.userId){
       existingPoint = await getUserPoints(req.userId)
    }
    if(!existingPoint){
        await Point.create(req)
        return
    }
    await Point.increment('points', {
        by: req.points, 
        where: {
          userId: req.userId,
        },
      }, {transaction: trans});
}