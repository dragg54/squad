import { goalFrequency } from "../constants/GoalFrequency.js"
import { BadRequestError } from "../errors/BadRequestError.js"
import { NotFoundError } from "../errors/NotFoundError.js"
import logger from "../logger.js"
import GoalPartner from "../models/GoalPartner.js"
import GoalReminder from "../models/GoalReminder.js"
import User from "../models/User.js"
import UserGoal from "../models/UserGoal.js"
import { getUserGoalById } from "./UserGoalService.js"
import { differenceInHours, differenceInMinutes, differenceInWeeks } from 'date-fns'

export async function createGoalReminder(req) {
    const { goalId } = req.body
    let existingGoal = await getUserGoalById(goalId)
    if (!existingGoal) {
        const errMsg = "Goal does not exist"
        logger.error(errMsg)
        throw new BadRequestError(errMsg)
    }
    existingGoal = existingGoal.toJSON()
    if (!existingGoal.goal_partners.some(pat => pat.user.id == req.user.id)) {
        const errMsg = "Request failed: Reminder is not a goal partner"
        logger.error(errMsg)
        throw new BadRequestError(errMsg)
    }
    let existingGoalReminder = await GoalReminder.findOne({
        where: {
            goalId,
            remindedBy: req.user.id
        },
        include: {
            model: UserGoal,
            as: 'userGoal',
            attributes: ["id", "frequency", "endDate"]
        }
    })
    if (existingGoalReminder) {
        existingGoalReminder = existingGoalReminder.toJSON()
        const canRemind = partnerCanRemind(existingGoalReminder)
        if (!canRemind) {
            logger.info("No action because last goal reminder is still active")
            return
        }
        await GoalReminder.update({ ...existingGoalReminder }, { where: { id: existingGoalReminder.id } })
        logger.info("goal reminded updated")
    }
    else {
        await GoalReminder.create({ ...req.body, remindedBy: req.user.id, goalOwnerId: existingGoal.userId, isSeen: false })
    }
}

export async function getGoalReminders(req) {
    const { goalId, remindedBy, isSeen } = req.query
    const queryOpts = {
        where: {}
    }
    if (goalId) {
        queryOpts.where = { ...queryOpts.where, goalId }
    }
    if (remindedBy) {
        queryOpts.where = { ...queryOpts.where, remindedBy }
    }

    if(isSeen != null){
        queryOpts.where = { ...queryOpts.where, isSeen: isSeen == 'true'? true : false } 
    }
    const reminders =  await GoalReminder.findAll({
        where:{...queryOpts.where}, include: [
            {
                model: UserGoal,
                as: 'userGoal',
                attributes: ['title', 'description', 'endDate']
            },
            {
                model: User,
                as: "partner",
                attributes: ['id', 'userName']
            }
        ],
        attributes: ["id"]
    })
    return reminders
}

export async function getGoalReminder(req) {
    const { id } = req.params
    const reminder = await GoalReminder.findByPk(id, {
        include: [
            {
                model: UserGoal,
                as: 'userGoal',
                attributes: ['title', 'description', 'endDate']
            },
            {
                model: User,
                as: "partner",
                attributes: ['id', 'userName']
            }
        ]
    }
    )
    if (!reminder) {
        throw new NotFoundError("reminder does not exist")
    }
    return reminder;
}

export async function updateGoalReminderStatus(req) {
    const { id } = req.params
    const existingReminder = await GoalReminder.findByPk(id)
    if (!existingReminder) {
        const errMsg = "Reminder does not exist"
        logger.error(errMsg)
        throw new BadRequestError(errMsg)
    }
    await GoalReminder.update({ isSeen: true }, {where: {id}})
}

function partnerCanRemind(existingGoalReminder) {
    const userGoal = existingGoalReminder.userGoal
    let timeDiff1
    let timeDiff2
    switch (userGoal.frequency) {
        case goalFrequency.custom:
            timeDiff1 = differenceInHours(new Date(), new Date(existingGoalReminder.updatedAt))
            timeDiff2 = differenceInMinutes(new Date(), new Date(userGoal.endDate))
            return (timeDiff1 > 1) || ((new Date().getDate() == new Date(existingGoalReminder.updatedAt).getDate()) && timeDiff2 > 30)
        case goalFrequency.daily:
            timeDiff1 = differenceInHours(new Date(), new Date(existingGoalReminder.updatedAt))
            timeDiff2 = differenceInMinutes(new Date(), new Date(userGoal.endDate))
            return ((timeDiff1 > 1)) || ((new Date().getDate() == new Date(existingGoalReminder.endDate).getDate()) && timeDiff2 > 30)
        case goalFrequency.monthly:
            timeDiff1 = differenceInHours(new Date(), new Date(existingGoalReminder.updatedAt))
            timeDiff2 = differenceInMinutes(new Date(), new Date(userGoal.endDate))
            return ((timeDiff1 > 24)) || timeDiff2 > 30
        case goalFrequency.yearly:
            timeDiff1 = differenceInWeeks(new Date(), new Date(existingGoalReminder.updatedAt))
            return timeDiff1 > 1
    }
}