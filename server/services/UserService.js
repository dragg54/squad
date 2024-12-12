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
import Point from '../models/Point.js';
import { activityPoints } from '../constants/ActivityPoints.js';
import { addPoint, updatePoint } from './PointService.js';
import { getAllFiles } from '../utils/getAllFiles.js';
import path from 'path'
import { createUserRole } from './UserRoleService.js';
import { request } from 'http';

export const createUser = async (req, trans) => {
    const existingSquad = await getSquadById(req.body.squadId)
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
            squadId: req.body.squadId
        }
    })
    if (existingUser) {
        throw new DuplicateError(`User already exists`)
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    request.body.isFirst = true
    req.body.password = hashedPassword
    const newUser = await User.create(req.body, {transaction: trans})

    await addPoint({userId: Number(req.body.invitedBy), 
        squadId: req.body.squadId, points: activityPoints.invitationPoints}, {transaction: trans})
    const createUserRoleRequest = {
        userId: newUser.id
    }

    await createUserRole(createUserRoleRequest, trans)
};

export const getAllUsers = async (req) => {
    const { limit, order } = req.query
    return await User.findAll({ attributes: ["id", "firstName", "lastName", "email",
        "userName", "squadId", "profileAvatar", "isAdmin", "bio", "birthday"],
        where: {squadId: req.user.squadId},
        order: [['createdAt', order || 'DESC']],
        limit: limit && +limit
    });
};

export const getUserById = async (id) => {
    return await User.findByPk(id, {
        attributes: ["id", "firstName", "lastName", "email", "userName", "squadId", "profileAvatar", "isAdmin", "bio", "birthday"],
        include:{
            model: Point,
            attributes: ['points']
        },
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

export const loginUser = async (userData, trans) => {
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
    if (existingUser.isFirst) {
        const addPointRequest = {
            userId: Number(existingUser.id),
            squadId: existingUser.squadId,
            points: activityPoints.registrationPoints
        }
        await addPoint(addPointRequest, { transaction: trans })
        await User.update({isFirst: false},{where: {id: existingUser.id}, transaction: trans})
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
            lastName: existingUser.lastName,
            isAdmin: existingUser.isAdmin,
            profileAvatar: existingUser.profileAvatar
        }
    }
}

export const getUserAvatars = async() =>{
    try{
        const dir = path.join(process.cwd(), 'public/avatars')
        return await getAllFiles(dir)
    }
    catch(err){
        throw new InternalServerError(err)
    }
}
