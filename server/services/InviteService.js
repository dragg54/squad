import crypto from 'crypto' 
import Invite from '../models/Invite.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import logger from '../logger.js';

function generateInviteToken() {
    return crypto.randomBytes(32).toString('hex');
}

export async function createInvitation(req){
    const token = generateInviteToken();
    const {id, squadId} = req.user
    const inviteLink = `${req.headers.origin}/register?inviteToken=${token}&squad=${squadId}&invitedBy=${req.user.id}`;
    const {email} = req.body
    await deleteExistingInvitation({squadId, userId: req.user.id})
    await Invite.create({
        email,
        token,
        squadId,
        invitedBy: id,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) 
    });
   return inviteLink
}

export async function updateInvitationStatus(id, req){
    const existingInvitation = await Invite.findByPk(id)
    if(!existingInvitation){
        const errMsg = "Invitation not found"
        logger.error(errMsg)
        throw new BadRequestError(errMsg)
    }
    await Invite.update({status: req.status, tokenHasBeenUsed: true}, {where:{id}})
}

export async function getInvitation(req){
    const {token, squadId} = req.body
    return await Invite.findOne({where:{token, squadId}})
}

export async function deleteExistingInvitation(req){
    const existingInvite = getInvites({invitedBy: req.userId, squadId: req.squadId})
    if(existingInvite && existingInvite.length > 0){
        await Invite.destroy({where:{invitedBy: req.userId, squadId: req.squadId}})
    }
}

export async function getInvites(query){
    return await Invite.findAll({where: query})
}