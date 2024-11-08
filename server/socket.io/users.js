export const users = new Map();

export function registerUser(userId, socketId) {
    users.set(userId, socketId);
 }

 export function removeUser(socketId) {
    for (const [userId, id] of users.entries()) {
        if (id === socketId) {
            users.delete(userId);
            break;
        }
    }
}