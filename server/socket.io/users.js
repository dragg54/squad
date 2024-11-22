export const users = new Map();

export function registerUser(userId, socketId) {
    try{
        users.set(userId, socketId);
    }
    catch(err){
        console.log("User connection failed", err.message)
    }
 }

 export function removeUser(socketId) {
    for (const [userId, id] of users.entries()) {
        if (id === socketId) {
            users.delete(userId);
            break;
        }
    }
}