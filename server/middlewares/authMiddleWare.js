import User from "../models/User.js";
import jwt from 'jsonwebtoken'

export const authMiddleware = async (req, res, next) => {
  let token = req.cookies.token;
  if(!token){
    const authHeader = req.headers['authorization'];
    token = authHeader && authHeader.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'squadId', 'firstName', 'lastName', 'userName', 'email']
    });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

