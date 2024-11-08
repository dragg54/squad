// import { getAllUsers } from "../services/UserService.js";

// const users = new Map();
// // notificationUtils.js

// /**
//  * Register a new user with their socket ID.
//  * @param {string} userId - Unique identifier for the user.
//  * @param {string} socketId - The socket ID of the connected user.
//  */
// export function registerUser(userId, socketId) {
//     users.set(userId, socketId);
// }

// /**
//  * Remove a user from the registry when they disconnect.
//  * @param {string} socketId - The socket ID of the disconnected user.
//  */
// export function removeUser(socketId) {
//     for (const [userId, id] of users.entries()) {
//         if (id === socketId) {
//             users.delete(userId);
//             break;
//         }
//     }
// }

// /**
//  * Send a notification to a specific user by their userId.
//  * @param {string} userId - Unique identifier for the recipient user.
//  * @param {string} message - The notification message to send.
//  * @param {object} io - The Socket.IO server instance.
//  */
// export function sendPostLikedNotificationToUser(userId, io) {
//    try{
//     const recipientSocketId = users.get(userId);
//     if (recipientSocketId) {
//         io.to(recipientSocketId).emit('receiveNotification', "Message delivered");
//     } else {
//         console.log(`User ${userId} is not connected`);
//     }
//    }
//    catch(err){
//     console.log(err.message)
//    }
// }

// export async function sendGoalCreatedNotification(userId, squadId, io){
//     try{
//         const userRequest = {
//             user:{
//                 id: userId,
//                 squadId: squadId
//             }
//         }
        
//         const usersToRecieveNotification = await getAllUsers(userRequest) 
//         usersToRecieveNotification.forEach((user)=>{
//             if(user.id != userId){
//                 const recipientSocketId = users.get(user.id)
//                 if (recipientSocketId) {
//                     io.to(recipientSocketId).emit('receiveNotification', "Message delivered");
//                 } else {
//                     console.log(`User ${userId} is not connected`);
//                 }
//             }
//         })
//     }
//     catch(err){
//         console.log(err)
//     }
// }

// export async function sendPostCreatedNotification(userId, squadId, io){
//     try{
//         const userRequest = {
//             user:{
//                 id: userId,
//                 squadId: squadId
//             }
//         }
        
//         const usersToRecieveNotification = await getAllUsers(userRequest) 
//         console.log(usersToRecieveNotification)
//         console.log(users)
//         usersToRecieveNotification.forEach((user)=>{
//             if( user.id != userId){
//                 const recipientSocketId = users.get(user.id)
//                 if (recipientSocketId) {
//                     io.to(recipientSocketId).emit('receiveNotification', "Message delivered");
//                 } else {
//                     console.log(`User ${userId} is not connected`);
//                 }
//             }
//         })
//     }
//     catch(err){
//         console.log(err)
//     }
// }

