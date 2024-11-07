import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js';
import { where } from 'sequelize';
import { BadRequestError } from '../errors/BadRequestError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { InternalServerError } from '../errors/InternalServerError.js';
import { DuplicateError } from '../errors/DuplicateError.js';
import { getSquadById } from './SquadService.js';
import { getInvitation } from './InviteService.js';

export const createUser = async (req) => {
    const existingSquad = await getSquadById(req.query.squadId)
    const existingInvite = await getInvitation(req)
    if(!existingInvite || existingInvite.expiredAt > new Date()){
        throw BadRequestError("User has no invitation or invitation has expired")
    }
    if(!existingSquad){
        throw new BadRequestError("Squad must exist before user can be added")
    }
    const existingUser = await User.findOne({
        where: {
            email: req.body.email,
            squadId: req.query.squadId
        }
    })
    if (existingUser) {
        throw new DuplicateError(`User already exists`)
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashedPassword
    await User.create(req.body)
};

export const getAllUsers = async (req) => {
    return await User.findAll({ attributes: ["id", "firstName", "lastName", "email", "userName"], 
        where: {squadId: req.user.squadId}
    });
};

export const getUserById = async (id) => {
    return await User.findByPk(id, {
        attributes: ["id", "firstName", "lastName", "email", "userName"]
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
    return {
        token, userDetails: {
            id: existingUser.id,
            squadId: existingUser.squadId,
            email: existingUser.email,
            userName: existingUser.userName,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName
        }
    }
}
