import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, '4895u500u0u0u4u0u30gitopjrpjpjpfjppfjf', { expiresIn: '1h' });
  };