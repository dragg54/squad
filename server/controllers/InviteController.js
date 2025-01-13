import logger from '../logger.js'
import * as InviteService from '../services/InviteService.js'

export const createInvite = async (req, res) => {
    try {
        const invite = await InviteService.createInvitation(req)
        logger.info("Invite created")
        return res.json(invite)
    }
    catch (error) {
        return res.status(error.statusCode || 500).send({
            message: error.message || "Internal Server Error"
        })
    }
}

export const getAllInvite = async(req, res) =>{
    try{
        const Invites = await InviteService.getInvitation(req)
        return res.json(Invites)
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}