import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js';
import { where } from 'sequelize';
import { BadRequestError } from '../errors/BadRequestError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { InternalServerError } from '../errors/InternalServerError.js';
import { DuplicateError } from '../errors/DuplicateError.js';

export const createUser = async (userData) => {
    const existingUser = await User.findOne({
        where: {
            email: userData.email
        }
    })
    if (existingUser) {
        throw new DuplicateError(`User already exists`)
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashedPassword
    await User.create(userData)
};

export const getAllUsers = async () => {
    return await User.findAll({attributes: ["id", "firstName", "lastName", "email", "userName"]});
};

export const getUserById = async (id) => {
    return await User.findByPk(id, {
        attributes: ["id", "firstName", "lastName", "email"]
    });
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

export const loginUser = async (userData) => {
    const existingUser = await User.findOne({
        where: {
            email: userData.email
        }
    },
        {
            attributes: ["id", "email", "password"]
        }

    )
    if (!existingUser) {
        throw new NotFoundError(`User does not exist`)
    }
    const isPasswordValid = await bcrypt.compare(userData.password, existingUser.password);
    if (!isPasswordValid) {
        throw new BadRequestError('Invalid email or password');
    }
    const token = generateToken(existingUser)
    return {token, userDetails:{id: existingUser.id, email: existingUser.email, userName: existingUser.userName, firstName: existingUser.firstName, lastName:existingUser.lastName}}
}
