import * as PointService from '../services/PointService.js'

export const getAllPoints= async(req, res) =>{
    try{
        const points = await PointService.getPoints(req)
        return res.json(points)
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}

export const getUserPoints = async(req, res) =>{
    try{
        const userPoints = await PointService.getUserPoints(req.params.id)
        return res.json(userPoints)
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}