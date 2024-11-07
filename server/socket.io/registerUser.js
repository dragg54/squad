
export function registerUser(userId, socketId) {
   users.set(userId, socketId);
}