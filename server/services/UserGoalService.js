import db from "../configs/db.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { BadRequestError } from "../errors/BadRequestError.js";
import GoalPartner from "../models/GoalPartner.js";
import models from "../models/index.js";
import User from "../models/User.js";
import UserGoal from "../models/UserGoal.js";
import { getPagination, getPagingData } from "../utils/pagination.js";
import { createNotification } from "./NotificationService.js";
import { notificationType } from "../constants/NotificationConstants.js";
import { activityPoints } from "../constants/ActivityPoints.js";
import Point from "../models/Point.js";
import { addPoint, getUserPoints, updatePoint } from "./PointService.js";

export const createUserGoal = async (req, transaction) => {
  const goalData = req.body
  const userGoal = await models.UserGoal.create(goalData, { transaction });
  if (userGoal.startDate < new Date() || userGoal.endDate < new Date() || userGoal.endDate < userGoal.startDate) {
    throw new BadRequestError("Invalid start date or end date.")
  }
  if (goalData.goalPartners && goalData.goalPartners.length > 0) {
    goalData.goalPartners.forEach(async (partner) => {
      partner.goalId = userGoal.id

      const notificationRequest = {
        userId: partner.userId,
        squadId: req.user.squadId,
        title: "NOTIFICATION",
        message: `${req.user.userName} created a goal`,
        type: notificationType.INFO
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
  const { page, size, groupBy, partnerId, userId } = req.query;
  const { limit, offset } = getPagination(page, size);

  const queryOpts = {
  }

  const partnerQryOpts = {

  }

  if (partnerId) {
    partnerQryOpts["userId"] = partnerId
  }

  if (userId) {
    queryOpts["userId"] = userId
  }

  if (groupBy == "month") {
    const goalsGroupedByMonth = await models.UserGoal.findAll({
      attributes: [
        [db.fn('DATE_FORMAT', db.col('UserGoal.createdAt'), '%m'), 'month'],
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
        [db.fn('DATE_FORMAT', db.col('UserGoal.createdAt'), '%Y'), 'year'],
        'title', 'description', 'completed'
      ],
      include: [
        { model: models.UserGoalCategory, attributes: ['id', 'name'] },
        {
          model: GoalPartner, attributes: ["id"],
          include: { model: User, attributes: { exclude: ["userId", "password", "createdAt", "updatedAt"] }, as: "user" }
        }
      ],
      order: [[db.literal('year'), 'ASC']],
    });

    return groupData(goalsGroupedByYear, groupBy)
  }
  const userGoalsData = await models.UserGoal.findAndCountAll(
    {
      where: queryOpts,
      attributes: { exclude: 'userGoalCategoryId' },
      include: [
        { model: models.UserGoalCategory, attributes: ['id', 'name'] },
        {
          model: GoalPartner, attributes: ["id"],
          include: { model: User, attributes: { exclude: ["userId", "password", "createdAt", "updatedAt"] }, as: "user" },
          where: partnerQryOpts,
        },
      ],
      order: [['createdAt', 'DESC']],
      limit, offset
    }
  );
  return getPagingData(userGoalsData, page, size)
};

export const getUserGoalById = async (id) => {
  return await models.UserGoal.findByPk(id);
};

export const updateUserGoal = async (req, res, trans) => {
  const { id } = req.params;
  const { title, description, completed, startDate, endDate, goalPartners, userGoalCategoryId } = req.body;
  const existingGoal = await getUserGoalById(id)
  if (new Date(startDate) < new Date() || new Date(endDate) < new Date() || new Date(endDate) < startDate) {
    throw new BadRequestError("Invalid start date or end date.")
  }
  const [updated] = await models.UserGoal.update(
    { title, description, completed, startDate, endDate, userGoalCategoryId },
    { where: { id }, transaction: trans }
  );
  if (!updated) {
    throw new NotFoundError("Goal not found")
  }

  if (goalPartners && goalPartners.length > 0) {
    const partners = goalPartners.map(part => ({ userId: part.user.id }))
    await GoalPartner.destroy({ where: { goalId: id }, transaction: trans });
    await GoalPartner.bulkCreate(partners.map(partner => ({ userId: partner.userId })), { transaction: trans });
  }

  updateGoalPoint(existingGoal, req.body, trans)

  await trans.commit();
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
