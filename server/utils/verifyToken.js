import jwt from 'jsonwebtoken'

export const verifyToken = (token) => {
    try {
      const user = jwt.verify(token, 'your_jwt_secret');
      
    } catch (error) {
      return null;
    }
  };
  