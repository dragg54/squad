import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js';
import { where } from 'sequelize';
import { BadRequestError } from '../errors/BadRequestError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { InternalServerError } from '../errors/InternalServerError.js';
import { DuplicateError } from '../errors/DuplicateError.js';
import { getSquadById } from './SquadService.js';
import { getInvitation, updateInvitationStatus } from './InviteService.js';
import Point from '../models/Point.js';
import { activityPoints } from '../constants/ActivityPoints.js';
import { addPoint, updatePoint } from './PointService.js';
import { getAllFiles } from '../utils/getAllFiles.js';
import path from 'path'
import { createUserRole } from './UserRoleService.js';
import { request } from 'http';
import jwt from 'jsonwebtoken'
import { sendMail } from './EmailService.js';
import dotenv from 'dotenv'
import { UnauthorizedError } from '../errors/UnauthorizedError.js';
import { invitationStatus } from '../constants/InvitationStatus.js';

dotenv.config()

export const createUser = async (req, trans) => {
    const existingSquad = await getSquadById(req.body.squadId)
    const existingInvite = await getInvitation(req)
    if (!existingInvite || 
        existingInvite.expiredAt > new Date() || 
        existingInvite.tokenHasBeenUsed
        || existingInvite.status == invitationStatus.ACCEPTED
    ) {
        throw new BadRequestError("Valid invitation required")
    }
    if (!existingSquad) {
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
    req.body.password = hashedPassword
    const newUser = await User.create({ ...req.body, isFirst: true }, { transaction: trans })

    await addPoint({
        userId: Number(req.body.invitedBy),
        squadId: req.body.squadId, points: activityPoints.invitationPoints
    }, { transaction: trans })
    const createUserRoleRequest = {
        userId: newUser.id
    }

    await createUserRole(createUserRoleRequest, trans)

    await updateInvitationStatus(existingInvite.id, { status: 'ACCEPTED', tokenHasBeenUsed: true }, trans)

    await trans.commit();

    try {
        //send token
        const updatedNewUser = { id: newUser.id, email: req.body.email }
        const token = generateToken(updatedNewUser)
        const email = {
            recipientAddress: req.body.email,
            subject: "Email Verification",
            message: `Click the link to verify your email. <a style="color:red;" href="${process.env.NODE_ENV === 'production'
                ? process.env.PROD_CLIENT_BASE_URL
                : process.env.LOCAL_CLIENT_BASE_URL
                }/verify?token=${token}">Verify Email</a>`
        }
        await sendMail(email)
    }
    catch (err) {
        console.log(err)
    }
};

export const getAllUsers = async (req) => {
    const queryOpts = {
        where: { squadId: req.user.squadId },
        order: [['createdAt', 'DESC']],
    }
    if (req.query) {
        const { limit, order } = req.query
        if (limit) {
            queryOpts['limit'] = +limit
        }
        if (order) {
            queryOpts['order'] = [['createdAt', 'DESC']]
        }
    }
    return await User.findAll({
        attributes: ["id", "firstName", "lastName", "email",
            "userName", "squadId", "profileAvatar", "isAdmin", "bio", "birthday"],
        ...queryOpts
    });
};

export const getUserById = async (id) => {
    return await User.findByPk(id, {
        attributes: ["id", "firstName", "lastName", "email", "userName", "squadId", "profileAvatar", "isAdmin", "bio", "birthday"],
        include: {
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
        await User.update({ isFirst: false }, { where: { id: existingUser.id }, transaction: trans })
    }
    const isPasswordValid = await bcrypt.compare(userData.password, existingUser.password);
    if (!isPasswordValid) {
        throw new BadRequestError('Invalid email or password');
    }
    if(!existingUser.isVerifiedEmail){
        throw new UnauthorizedError('User email is not yet verified')
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

export const getUserAvatars = async () => {
    try {
        const dir = path.join(process.cwd(), 'public/avatars')
        return await getAllFiles(dir)
    }
    catch (err) {
        throw new InternalServerError(err)
    }
}

export const verifyEmail = async (req) => {
    const token = req.query
    const { email } = jwt.verify(token.token, process.env.SECRET_KEY);
    if(!email){
        throw new BadRequestError('Invalid token or email')
    }
    const user = await User.findOne({ email });
    if(!user){
        throw new BadRequestError("User must exist before email can be verified")
    }
    await User.update({ isVerifiedEmail: true }, {where:{id: user.id}})
}

export const resendVerificationMail = async(req) =>{
    const  existingUser = await User.findOne({where: {email: req.body.email}})
    if(!existingUser){
        throw new BadRequestError('User does not exist')
    }
    const updatedNewUser = { id:existingUser.id, email: req.body.email }
        const token = generateToken(updatedNewUser)
        const email = {
            recipientAddress: req.body.email,
            subject: "Email Verification",
            message: `Click the link to verify your email. <a style="color:red;" href="${process.env.NODE_ENV === 'production'
                ? process.env.PROD_CLIENT_BASE_URL
                : process.env.LOCAL_CLIENT_BASE_URL
                }/verify?token=${token}/email=${req.body.email}">Verify Email</a>`
        }
        await sendMail(email)
}