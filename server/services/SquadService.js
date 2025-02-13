import model from '../models/index.js'
import {DuplicateError} from '../errors/DuplicateError.js'
import logger from '../logger.js'

export const createSquad = async(req) =>{
    const existingSquad = await getAllSquads({query:{
        name: req.body.name,
        email: req.body.email
    }}) 
    if(existingSquad.length > 0){
        const errMsg = "Squad already exists"
        logger.error(errMsg)
        throw new DuplicateError(errMsg)
    }
    await model.Squad.create(req.body)
}

export const getAllSquads = async(req) =>{
    const {name, email} = req.query
    const queryOpt = {}
    if(name){
        queryOpt["name"] = name
    }
    if(email){
        queryOpt["email"] = email
    }
    return await model.Squad.findAll({where: queryOpt})
}

export const getSquadById = async(id) =>{
    const squad = await model.Squad.findOne({where:{id}})
    return squad
}