import jwt from 'jsonwebtoken'

export const verifyToken = (token) => {
  try {
    const user = jwt.verify(token,);

  } catch (error) {
    return null;
  }
};
