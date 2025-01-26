import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js';
import { Op, Sequelize, where } from 'sequelize';
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
import logger from '../logger.js';
import { createNotification } from './NotificationService.js';
import { notificationSource, notificationType } from '../constants/NotificationConstants.js';
import db from '../configs/db.js';

dotenv.config()

export const createUser = async (req, trans) => {
    const existingSquad = await getSquadById(req.body.squadId)
    const existingInvite = await getInvitation(req)
    if (!existingInvite ||
        existingInvite.expiredAt > new Date() ||
        existingInvite.tokenHasBeenUsed
        || existingInvite.status == invitationStatus.ACCEPTED
    ) {
        const errMsg = "Valid invitation required"
        logger.error(errMsg)
        throw new BadRequestError(errMsg)
    }
    if (!existingSquad) {
        const errMsg = "Squad must exist before user can be added"
        logger.error(errMsg)
        throw new BadRequestError("Squad must exist before user can be added")
    }
    const existingUser = await User.findOne({
        where: {
            email: req.body.email,
            squadId: req.body.squadId
        }
    })
    if (existingUser) {
        const errMsg = "User already exists"
        logger.error(errMsg)
        throw new DuplicateError(errMsg)
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

    const squadMembers = await User.findAll({
        where: {
            squadId: req.body.squadId, id: {
                [Op.ne]: newUser.id,
            }
        },
        attributes: ["id"]
    })
    if (squadMembers) {
        for (const mem of squadMembers) {
            const notificationRequest = {
                squadId: req.body.squadId,
                senderId: newUser.id,
                recipientId: mem.dataValues.id,
                sourceId: req.body.squadId,
                notificationSource: notificationSource.NEWUSER,
                sourceName:notificationSource.NEWUSER,
                title: 'NOTIFICATION FOR NEW USER',
                type: notificationType.INFO,
                detailLink: `/member/${newUser.id}`,
                message: `${req.body.userName} has joined the squad`,
            };
        
            await createNotification(notificationRequest, trans);
            logger.info("Notification for new user creation sent");
        }
    }
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
                }/verify?token=${token}&email=${req.body.email}">Verify Email</a>`
        }
        await sendMail(email)
    }
    catch (err) {
        throw new InternalServerError("Failed to send mail")
    }
};

export const getAllUsers = async (req) => {
    const queryOpts = {
        order: [['createdAt', 'DESC']]
    }
    if (req.user && req.user.squadId) {
        queryOpts['where'] = { squadId: req.user.squadId }
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

export const updateUserPassword = async (id, userData) => {
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

export const updateUser = async(req) =>{
    const { id } = req.params
    const existingUser = await getUserById(id)
    if(!existingUser){
        throw new BadRequestError(`Update user failed: User ${id} does not exist`)
    }
    await User.update(req.body, {where: {id}})
}

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
        const errMsg = `User does not exist`
        logger.error(errMsg)
        throw new BadRequestError(errMsg)
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
    if (!existingUser.isVerifiedEmail) {
        const errMsg = 'User email is not yet verified'
        logger.error(errMsg)
        throw new UnauthorizedError(errMsg)
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
    if (!email) {
        const errMsg = 'Invalid token or email'
        logger.error(errMsg)
        throw new BadRequestError(errMsg)
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
        const errMsg = "User must exist before email can be verified"
        logger.error(errMsg)
        throw new BadRequestError(errMsg)
    }
    await User.update({ isVerifiedEmail: true }, { where: { id: user.id } })
}

export const resendVerificationMail = async (req) => {
    const existingUser = await User.findOne({ where: { email: req.body.email } })
    if (!existingUser) {
        const errMsg = "User does not exist"
        logger.error(errMsg)
        throw new BadRequestError(errMsg)
    }
    const updatedNewUser = { id: existingUser.id, email: req.body.email }
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

export const logoutUser = (res) => {
    res.cookie('token', '', {
        sameSite: 'None',
        secure: true,
        httpOnly: true,
    })
}