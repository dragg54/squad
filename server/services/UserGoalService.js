import db from "../configs/db.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { BadRequestError } from "../errors/BadRequestError.js";
import GoalPartner from "../models/GoalPartner.js";
import models from "../models/index.js";
import User from "../models/User.js";
import UserGoal from "../models/UserGoal.js";
import { getPagination, getPagingData } from "../utils/pagination.js";
import { createNotification } from "./NotificationService.js";
import { notificationSource, notificationType } from "../constants/NotificationConstants.js";
import { activityPoints } from "../constants/ActivityPoints.js";
import Point from "../models/Point.js";
import { addPoint, getUserPoints, updatePoint } from "./PointService.js";
import { Op, where } from "sequelize";
import { UserGoalCategory } from "../models/UserGoalCategory.js";
import { correctDate, correctDateUpdate, correctHour, isInvalidCustomDate, isPast, isPastMonth, isPastYear } from "../utils/date.js";
import { goalFrequency } from "../constants/GoalFrequency.js";
import { format, subMonths } from "date-fns"
import logger from "../logger.js";
import GoalReminder from "../models/GoalReminder.js";

export const createUserGoal = async (req, transaction) => {
  const goalData = req.body
  goalData.startDate = correctDate(goalData.startDate, goalData.frequency, 'startDate')
  goalData.endDate =   correctDate(goalData.endDate, goalData.frequency, 'endDate')
  const userGoal = await models.UserGoal.create({...goalData, userId: req.user.id}, { transaction });
  if (isInvalidGoalData(goalData))
   {
    const errMsg = "Invalid start date or end date."
    logger.error(errMsg)
    throw new BadRequestError("Invalid start date or end date.")
  }
  const isGroupGoal = await UserGoalCategory.findByPk(req.body.categoryId) == "Group"
  if(isGroupGoal && !goalData.goalPartners.length){
    const errMsg = "Invalid start date or end date."
    logger.error(errMsg)
    throw new BadRequestError(errMsg)
  }
  if (goalData.goalPartners && goalData.goalPartners.length > 0) {
    if(isGroupGoal){
      userGoal.groupGoal = userGoal.id
    }
    goalData.goalPartners.forEach(async (partner) => {
      goalData.userId = partner.userId
      goalData.groupGoalId = userGoal.id
      partner.goalId = userGoal.id
      const notificationRequest = {
        senderId: req.user.id,
        recipientId: partner.userId,
        squadId: req.user.squadId,
        title: "NOTIFICATION",
        message: `${req.user.userName} created a goal`,
        type: notificationType.INFO,
        sourceId: userGoal.id,
        sourceName: notificationSource.GOAL
      }

      await createNotification(notificationRequest, transaction)
    })
    await createUserGoalPartner(goalData?.goalPartners, transaction)
    const addPointRequest = {
      userId: req.user.id,
      squadId: req.user.squadId,
      points: activityPoints.goalCreationPoints
    }

    await addPoint(addPointRequest, transaction)
  }
};

export const createUserGoalPartner = async (goalPartners, transaction) => {
  await GoalPartner.bulkCreate(goalPartners, { transaction })
}

export const getAllUserGoals = async (req) => {
  const {
    page,
    size,
    groupBy,
    partnerId,
    userId,
    categoryId,
    month
  } = req.query;
  const { limit, offset } = getPagination(page, size);

  const queryOpts = {
  }

  const partnerQryOpts = {

  }

  if (partnerId) {
    partnerQryOpts["userId"] = partnerId
  }

  if (userId) {
    queryOpts["userId"] = Number(userId)
  }

  if(categoryId){
      queryOpts["usergoalcategoryId"] = categoryId
  }

  if(month){
    queryOpts["startDate"] = {
      [Op.between]: [
        new Date(Number(new Date().getFullYear()), month - 1, 1), 
        new Date(Number(new Date().getFullYear()), month, 0, 23, 59, 59, 999),
      ]
    }
  }

  if (groupBy == "month") {
    const currentYear = new Date().getFullYear();
    queryOpts['startDate'] = {
      [Op.gte]: new Date(`${currentYear}-01-01`),
      [Op.lt]: new Date(`${currentYear + 1}-01-01`),
    }
    queryOpts['frequency'] = goalFrequency.monthly
    const goalsGroupedByMonth = await models.UserGoal.findAndCountAll({
      where: queryOpts,
      attributes: [
        'id', 'userId',
        [db.fn('DATE_FORMAT', db.col('user_goal.startDate'), '%m'), 'month'],
        'title', 'description','startDate', 'endDate', 'completed', 'frequency'
      ],
      include: [
        { model: models.UserGoalCategory, attributes: ['id', 'name'] },
        {
          model: GoalPartner, attributes: ["id"],
          include: { model: User, attributes: { exclude: ["userId", "password", "createdAt", "updatedAt"] }, as: "user" }
        }
      ], order: [[db.literal('month'), 'ASC']],
    });
    return groupData(goalsGroupedByMonth.rows, groupBy, goalsGroupedByMonth.count)
  }

  if (groupBy === "year") {
    const goalsGroupedByYear = await models.UserGoal.findAll({
      where: {userId: req.user.id, frequency: goalFrequency.yearly},
      attributes: ['id', 'userId',
        [db.fn('DATE_FORMAT', db.col('user_goal.startDate'), '%Y'), 'year'],
        'title', 'description', 'completed', 'startDate', 'endDate', 'frequency'
      ],
      include: [
        { model: models.UserGoalCategory, attributes: ['id', 'name'] },
        {
          model: GoalPartner, attributes: ["id"],
          include: { model: User, attributes: { exclude: ["userId", "password", "createdAt", "updatedAt"] }, as: "user" }
        }
      ],
      // where: partnerQryOpts,
      order: [[db.literal('year'), 'ASC']],
    });

    return groupData(goalsGroupedByYear, groupBy)
  }

  if (groupBy === "day") {
    queryOpts['frequency'] = {
      [Op.or]: [goalFrequency.daily, goalFrequency.custom]
    };

    const goalsGroupedByDay = await models.UserGoal.findAll({
      where: queryOpts,
      attributes: [
        'id', 'userId', 'title', 'description', 'startDate', 'endDate', 'completed', 'frequency',
        [db.fn('DATE_FORMAT', db.col('user_goal.startDate'), '%Y-%m-%d'), 'sortDate'],
        [db.fn('DATE_FORMAT', db.col('user_goal.startDate'), '%Y-%m-%d'), 'day']
      ],
      include: [
        { model: models.UserGoalCategory, attributes: ['id', 'name'] },
        {
          model: GoalPartner,
          attributes: ["id"],
          include: {
            model: User,
            attributes: { exclude: ["userId", "password", "createdAt", "updatedAt"] },
            as: "user"
          }
        }
      ],
      order: [[db.literal('sortDate'), 'DESC']],
    });
    return groupData(goalsGroupedByDay, groupBy)

  }

  if (groupBy == "today") {
    const today = new Date().toISOString().split('T')[0];
    queryOpts['frequency'] = {
      [Op.or]:[goalFrequency.daily, goalFrequency.custom]
    }
    queryOpts['startDate'] = {
      [Op.gte]: new Date(today + "T00:00:00.000Z"),
      [Op.lt]: new Date(today + "T23:59:59.999Z"),
  };

    const goalsGroupedByDay = await models.UserGoal.findAndCountAll({
      where: queryOpts,
      attributes: ['id',
        [db.fn('DATE_FORMAT', db.col('user_goal.startDate'), '%Y-%m-%d'), 'day'],
        'squadId',
        'userId', 
        'groupGoalId',
        'title', 'description', 'startDate', 'endDate', 'completed', 'frequency'
      ],
      include: [
        { model: models.UserGoalCategory, attributes: ['id', 'name'] },
        {
          model: GoalPartner,
          attributes: ["id"],
          include: {
            model: User,
            attributes: { exclude: ["userId", "password", "createdAt", "updatedAt"] },
            as: "user"
          }
        }
      ],
      order: [[db.literal('day'), 'ASC']],
    });
    return getPagingData(goalsGroupedByDay, page, size)
}
  else{
    const userGoalsData = await models.UserGoal.findAndCountAll(
      {
        attributes: { exclude: 'userGoalCategoryId'},
        include: [
          { model: models.UserGoalCategory, attributes: ['id', 'name'] },
          {
            model: GoalPartner, attributes: ["id"],
            where: partnerId && {userId: req.user.id},
            include: { model: User, attributes: { exclude: ["userId", "password", "createdAt", "updatedAt"] }, as: "user" },
          },
          {
            model: GoalReminder,
            as: 'reminder',
            attributes:["id"]
          }
        ],
        where:{... queryOpts},
        order: [['createdAt', 'DESC']],
        limit, offset
      }
    );
    return getPagingData(userGoalsData, page, size)
  }
};

export const getUserGoalById = async (id) => {
  return await models.UserGoal.findByPk(id,
  {include: [
    { model: models.UserGoalCategory, attributes: ['id', 'name'] },
    {
      model: GoalPartner, attributes: ["id"],
      include: { model: User, attributes: { exclude: ["userId", "password", "createdAt", "updatedAt"] }, as: "user" },
    },
  ]})
};

export const updateUserGoal = async (req, res, trans) => {
  const { id } = req.params;
  let { title, description, completed, startDate, endDate, goalPartners, userGoalCategoryId, frequency } = req.body;
  if (validateUpdateGoalData(req.body))
    {
      const errMsg = "Invalid start date or end date."
      logger.error(errMsg)
      throw new BadRequestError(errMsg)
   }
   startDate = correctDateUpdate(startDate, frequency, 'startDate')
   endDate =   correctDateUpdate(new Date(endDate).toUTCString(), frequency, 'endDate')
  const [updated] = await models.UserGoal.update(
    { title, description, completed, startDate, endDate, userGoalCategoryId, isExpired: false },
    { where: { id }, transaction: trans }
  );
  if (!updated) {
    const errMsg = "Goal not found"
    logger.error(errMsg)
    throw new NotFoundError(errMsg)
  }

  const existingGoal = await UserGoalCategory.findByPk(req.body.userGoalCategoryId)
  const isGroupGoal = existingGoal?.name == "Group"
  if(isGroupGoal && !goalPartners.length){
    const errMsg = "Invalid goal: Group goals must have at least a partner"
    logger.error(errMsg)
    throw new BadRequestError(errMsg)
  }
  if (goalPartners && goalPartners.length > 0) {
    const partners = goalPartners.map(part => ({ userId: part.user.id }))
    await GoalPartner.destroy({ where: { goalId: id }, transaction: trans });
    await GoalPartner.bulkCreate(partners.map(partner => ({ userId: partner.userId, goalId: id})), { transaction: trans });
    partners.map(async(partner)=>{
      await UserGoal.update({ title, description, completed, startDate, endDate, userGoalCategoryId },
        {where:{userId: partner.userId, groupGoalId: id}})
        const notificationRequest = {
          senderId: req.user.id,
          recipientId: partner.userId,
          squadId: req.user.squadId,
          title: "NOTIFICATION",
          message: `${req.user.userName} updated a group goal`,
          type: notificationType.INFO,
          sourceId: id,
          sourceName: notificationSource.GOAL
        }

        await createNotification(notificationRequest)
    })
  }
  await updateGoalPoint(existingGoal, req.body, trans)
};

export const deleteUserGoal = async (id) => {
  const goal = await UserGoal.findByPk(id);
  if (goal) {
    await goal.destroy();
    return true;
  }
  return false;
};

export const getGoalsGroupedByMonth = async (req) => {
  const { month } = req.query
  let maxMonth;
  if(month){
    maxMonth = parseInt(month || new Date().getMonth() + 1, 10);
  }
  const currentYear = new Date().getFullYear(); 

  const staticMonths = Array.from({ length: 6 }, (_, index) => {
    const month = index + 1; 
    return {
      month: month.toString().padStart(2, '0'), 
      monthName: format(new Date(currentYear, month - 1), 'MMMM'), 
    };
  });

  const goals = await UserGoal.findAll({
    attributes: [
      [db.fn('DATE_FORMAT', db.col('endDate'), '%m'), 'month'],
      [db.fn('COUNT', db.col('id')), 'goalCount'],
      [
        db.fn('SUM', db.literal("CASE WHEN completed = 1 THEN 1 ELSE 0 END")),
        'completedGoals',
      ], 
      [
        db.fn('SUM', db.literal("CASE WHEN completed = 0 THEN 1 ELSE 0 END")),
        'uncompletedGoals',
      ], 
    ],
    group: ['month'],
    order: [[db.literal('month'), 'ASC']],
    where: {userId: req.user.id,
      [db.Sequelize.Op.and]: [
        db.where(db.fn('YEAR', db.col('endDate')), currentYear), 
        { frequency: { [db.Sequelize.Op.ne]: 'yearly' } },
        (month &&  db.where(db.fn('month', db.col('endDate')), month)),
      ],
  }});

  const goalsMap = goals.reduce((acc, goal) => {
    const { dataValues } = goal; 
    acc[dataValues.month] = {
      goalCount: parseInt(dataValues.goalCount, 10) || 0,
      completedGoals: parseInt(dataValues.completedGoals, 10) || 0,
      uncompletedGoals: parseInt(dataValues.uncompletedGoals, 10) || 0,
    };
    return acc;
  }, {});
  
  const completeGoalsData = staticMonths.map(({ month, monthName }) => ({
    month,
    monthName,
    goalCount: goalsMap[month]?.goalCount || 0,
    completedGoals: goalsMap[month]?.completedGoals || 0,
    uncompletedGoals: goalsMap[month]?.uncompletedGoals || 0,
  }));

  return month ? goals : completeGoalsData
};

function groupData(data, groupBy, count=0) {
  const groupedGoals = data.reduce((acc, goal) => {
    const period = goal.dataValues[groupBy];

    if (!acc[period]) {
      acc[period] = [];
    }

    acc[period].push(goal);
    return acc;
  }, {});

  return groupedGoals;
}

export const updateGoalStatus = async(req, trans) =>{
  const existingGoal = await getUserGoalById(req.params.id)
  if(!existingGoal){
    const errMsg = "user goal not found"
    logger.error(errMsg)
    throw new BadRequestError(errMsg)
  }
  if(!existingGoal.isExpired){
    const errMsg = "Expired goal status cannot be updated without updating end date"
    logger.error(errMsg)
    throw new BadRequestError(errMsg)
  }
  await UserGoal.update({completed: req.body.completed}, {where:{
    id: req.params.id
  }})

  await updateGoalPoint(existingGoal, req.body, trans)
}

async function updateGoalPoint(goal, updatedGoal, trans) {
  if (!goal || !updatedGoal) {
    const errMsg = "Invalid goals"
    logger.error(errMsg)
    throw BadRequestError(errMsg)
  }
  if ((goal.completed && updatedGoal.completed) || (!goal.completed && !updatedGoal.completed)) {
    return
  }
  const userPoints = await getUserPoints(goal.userId)
  if (goal.completed && !updatedGoal.completed) {
    await updatePoint({ points: userPoints.points - activityPoints.goalCompletionPoints, userId: goal.userId }, { transaction: trans })
  }
  else if (!goal.completed && updatedGoal.completed) {
    await updatePoint({ points: userPoints.points + activityPoints.goalCompletionPoints, userId: goal.userId }, { transaction: trans })
  }
}

function isInvalidGoalData(goalData){
  if(!Object.keys(goalFrequency).some(frequency => frequency != goalData.frequency)){
    return true
  }
  switch(goalData.frequency){
    case goalFrequency.custom:
      return isPast(null, goalData.startDate)
        || isPast(goalData.startDate, goalData.endDate)
    case goalFrequency.daily:
      return isPast(goalData.startDate, goalData.endDate)
    case goalFrequency.monthly:
      return isPastMonth(goalData.startDate, goalData.endDate)
    case goalFrequency.yearly:
      return isPastYear(goalData.startDate, goalData.endDate)
  }
}

function validateUpdateGoalData(goalData){
  if(!Object.keys(goalFrequency).some(frequency => frequency != goalData.frequency)){
    return true
  }
  switch(goalData.frequency){
    case goalFrequency.custom:
      return isInvalidCustomDate(goalData.startDate, goalData.endDate)
    case goalFrequency.daily:
      return isPast(goalData.startDate, goalData.endDate)
    case goalFrequency.monthly:
      return isPastMonth(goalData.startDate, goalData.endDate)
    case goalFrequency.yearly:
      return isPastYear(goalData.startDate, goalData.endDate)
  }
}
