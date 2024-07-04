import User from "../models/User.js";
import jwt from 'jsonwebtoken'

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, "4895u500u0u0u4u0u30gitopjrpjpjpfjppfjf");
    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'firstName', 'lastName', 'email']
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

