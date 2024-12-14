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
import { Op } from "sequelize";
import { UserGoalCategory } from "../models/UserGoalCategory.js";
import { isPast } from "../utils/date.js";

export const createUserGoal = async (req, transaction) => {
  const goalData = req.body
  const userGoal = await models.UserGoal.create(goalData, { transaction });
  if (isPast(null,userGoal.startDate)
    || isPast(userGoal.startDate, userGoal.endDate) || isPast(userGoal.startDate, userGoal.endDate))
   {
    throw new BadRequestError("Invalid start date or end date.")
  }
  const isGroupGoal = await UserGoalCategory.findByPk(req.body.categoryId) == "Group"
  if(isGroupGoal && !goalData.goalPartners.length){
    throw new BadRequestError("Invalid goal: Group goals must have at least a partner")
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
    const goalsGroupedByMonth = await models.UserGoal.findAll({
      where: queryOpts,
      attributes: [
        [db.fn('DATE_FORMAT', db.col('user_goal.startDate'), '%m'), 'month'],
        'title', 'description', 'completed'
      ],
      include: [
        { model: models.UserGoalCategory, attributes: ['id', 'name'] },
        {
          model: GoalPartner, attributes: ["id"],
          include: { model: User, attributes: { exclude: ["userId", "password", "createdAt", "updatedAt"] }, as: "user" }
        }
      ], order: [[db.literal('month'), 'ASC']],
    });
    return groupData(goalsGroupedByMonth, groupBy)
  }

  if (groupBy === "year") {
    const goalsGroupedByYear = await models.UserGoal.findAll({
      attributes: [
        [db.fn('DATE_FORMAT', db.col('UserGoal.startDate'), '%Y'), 'year'],
        'title', 'description', 'completed'
      ],
      include: [
        { model: models.UserGoalCategory, attributes: ['id', 'name'] },
        {
          model: GoalPartner, attributes: ["id"],
          include: { model: User, attributes: { exclude: ["userId", "password", "createdAt", "updatedAt"] }, as: "user" }
        }
      ],
      where: partnerQryOpts,
      order: [[db.literal('year'), 'ASC']],
    });

    return groupData(goalsGroupedByYear, groupBy)
  }
  else{
    const userGoalsData = await models.UserGoal.findAndCountAll(
      {
        attributes: { exclude: 'userGoalCategoryId' },
        include: [
          { model: models.UserGoalCategory, attributes: ['id', 'name'] },
          {
            model: GoalPartner, attributes: ["id"],
            include: { model: User, attributes: { exclude: ["userId", "password", "createdAt", "updatedAt"] }, as: "user" },
          },
        ],
        where: queryOpts,
        order: [['createdAt', 'DESC']],
        limit, offset
      }
    );
    return getPagingData(userGoalsData, page, size)
  }
};

export const getUserGoalById = async (id) => {
  return await models.UserGoal.findByPk(id);
};

export const updateUserGoal = async (req, res, trans) => {
  const { id } = req.params;
  const { title, description, completed, startDate, endDate, goalPartners, userGoalCategoryId } = req.body;
  if (!completed && (isPast(null, startDate)
     || isPast(null, endDate)
    || isPast(startDate, endDate))) {
    throw new BadRequestError("Invalid start date or end date.")
  }
  const [updated] = await models.UserGoal.update(
    { title, description, completed, startDate, endDate, userGoalCategoryId },
    { where: { id }, transaction: trans }
  );
  if (!updated) {
    throw new NotFoundError("Goal not found")
  }

  const existingGoal = await UserGoalCategory.findByPk(req.body.userGoalCategoryId)
  const isGroupGoal = existingGoal?.name == "Group"
  if(isGroupGoal && !goalPartners.length){
    throw new BadRequestError("Invalid goal: Group goals must have at least a partner")
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
  // updateGoalPoint(existingGoal, req.body, trans)
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
  const goals = await UserGoal.findAll({
    attributes: [
      [db.fn('DATE_FORMAT', db.col('endDate'), '%m'), 'month'],
      [db.fn('COUNT', db.col('id')), 'goalCount'],
    ],
    group: ['month'],
    order: [[db.literal('month'), 'ASC']],
    where: { userId: req.user.id }
  });
  return goals
};
function groupData(data, groupBy) {
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

async function updateGoalPoint(goal, updatedGoal, trans) {
  if (!goal || !updatedGoal) {
    throw BadRequestError("Invalid goals")
  }
  if ((goal.completed && updatedGoal.completed) || (!goal.completed && !updatedGoal.completed)) {
    return
  }
  const userPoints = getUserPoints(goal.userId)
  if (goal.completed && !updatedGoal.completed) {
    await updatePoint({ points: userPoints - activityPoints.goalCompletionPoints }, { transaction: trans })
  }
  else if (!goal.completed && updatedGoal.completed) {
    await updatePoint({ points: userPoints + activityPoints.goalCompletionPoints }, { transaction: trans })
  }
}
