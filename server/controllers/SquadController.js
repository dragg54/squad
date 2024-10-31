import * as SquadService from '../services/SquadService.js'

export const createSquad = async (req, res) => {
    try {
        await SquadService.createSquad(req)
        return res.json({ message: "Squad created" })
    }
    catch (error) {
        return res.status(error.statusCode || 500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

export const getAllSquads = async(req, res) =>{
    try{
        const squads = await SquadService.getAllSquads(req)
        return res.json(squads)
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}