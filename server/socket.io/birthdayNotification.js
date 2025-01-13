import logger from "../logger.js";
import { getAllUsers } from "../services/UserService.js";
import { users } from "./users.js";

export async function sendBirthdayNotification(userId, squadId, io){
    try{
        const userRequest = {
            user:{
                id: userId,
                squadId: squadId,
                limit: null,
                order: null
            }
        }
        const usersToRecieveNotification = await getAllUsers(userRequest) 
        usersToRecieveNotification.forEach((user)=>{
            if(user.id != userId){
                const recipientSocketId = users.get(user.id)
                if (recipientSocketId) {
                    io.to(recipientSocketId).emit('receiveNotification', "Message delivered");
                } else {
                    logger.error(`User ${userId} is not connected`);
                }
            }
        })
    }
    catch(err){
        logger.error(err)
    }
}