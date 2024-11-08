import { users } from "./users.js";

export function sendPostLikedNotificationToUser(userId, io) {
   try{
    const recipientSocketId = users.get(userId);
    if (recipientSocketId) {
        io.to(recipientSocketId).emit('receiveNotification', "Message delivered");
    } else {
        console.log(`User ${userId} is not connected`);
    }
   }
   catch(err){
    console.log(err.message)
   }
}

export async function sendPostCreatedNotification(userId, squadId, io){
    try{
        const userRequest = {
            user:{
                id: userId,
                squadId: squadId
            }
        }
        
        const usersToRecieveNotification = await getAllUsers(userRequest) 
        console.log(usersToRecieveNotification)
        console.log(users)
        usersToRecieveNotification.forEach((user)=>{
            if( user.id != userId){
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




