import crypto from 'crypto' 
import Invite from '../models/Invite.js';

function generateInviteToken() {
    return crypto.randomBytes(32).toString('hex');
}

export async function createInvitation(req){
    const token = generateInviteToken();
    const {id, squadId} = req.user
    const inviteLink = `${req.headers.origin}/register?inviteToken=${token}&squad=${squadId}`;
    const {email} = req.body
    await Invite.create({
        email,
        token,
        squadId,
        inviteBy: id,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) 
    });

   if(req.body.email){
    // await sendEmail(email, `You're invited! Register here: ${inviteLink}`);
   }
   return inviteLink
}

export async function getInvitation(req){
    const {token, squadId} = req.body
    return await Invite.findOne({where:{token, squadId}})
}