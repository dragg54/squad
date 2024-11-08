import { users } from "./users.js";

export async function sendGoalCreatedNotification(userId, squadId, io){
    try{
        const userRequest = {
            user:{
                id: userId,
                squadId: squadId
            }
        }
        
        const usersToRecieveNotification = await getAllUsers(userRequest) 
        usersToRecieveNotification.forEach((user)=>{
            if(user.id != userId){
                const recipientSocketId = users.get(user.id)
                if (recipientSocketId) {
                    io.to(recipientSocketId).emit('receiveNotification', "Message delivered");
                } else {
                    console.log(`User ${userId} is not connected`);
                }
            }
        })
    }
    catch(err){
        console.log(err)
    }
}