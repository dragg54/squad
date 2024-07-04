import * as User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js';
import { where } from 'sequelize';
import { BadRequestError } from '../errors/BadRequestError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { InternalServerError } from '../errors/InternalServerError.js';
import { DuplicateError } from '../errors/DuplicateError.js';

export const createUser = async (userData) => {
    const existingUser = await User.findOne({
        where:{
            email: userData.email
        }
    })
    if(existingUser){
        throw new DuplicateError(`User already exists`)
    }
    const encryptedPassword = bcrypt.genSalt(10, (err, salt)=>{
        if(err){
            throw new InternalServerError(err.message)
        }
        return salt
    })
    userData.password = encryptedPassword
    User.create(userData)
};

export const getAllUsers = async () => {
  return await User.findAll();
};

export const getUserById = async (id) => {
  return await User.findByPk(id);
};

export const updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (user) {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    await user.update(userData);
    return user;
  }
  return null;
};

export const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    return true;
  }
  return false;
};

export const loginUser = async (userData) =>{
    const existingUser = await User.findOne({
        where:{
            email: userData.email
        }
    },
    {
        attributes: ["id", "email", "password"]
    }
   
)
    if(!existingUser){
        throw new NotFoundError(`User does not exist`)
    }
    const isPasswordValid = await bcrypt.compare(existingUser.password, userData.password);
  if (!isPasswordValid) {
    throw new BadRequestError('Invalid email or password');
  }
  const token = generateToken(existingUser)
  return {token}
}
