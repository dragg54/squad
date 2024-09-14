import db from "../configs/db.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { BadRequestError } from "../errors/BadRequestError.js";
import GoalPartner from "../models/GoalPartner.js";
import models from "../models/index.js";
import User from "../models/User.js";
import UserGoal from "../models/UserGoal.js";
import { getPagination, getPagingData } from "../utils/pagination.js";

export const createUserGoal = async (goalData, transaction) => {
  const userGoal = await models.UserGoal.create(goalData, { transaction });
  if(userGoal.startDate < new Date() || userGoal.endDate < new Date() || userGoal.endDate < userGoal.startDate){
    throw new BadRequestError("Invalid start date or end date.")
  }
  if (goalData.goalPartners && goalData.goalPartners.length > 0) {
    goalData.goalPartners.forEach((partner) => {
      partner.goalId = userGoal.id
    })
    await createUserGoalPartner(goalData?.goalPartners, transaction)
  }
};

export const createUserGoalPartner = async (goalPartners, transaction) => {
  await GoalPartner.bulkCreate(goalPartners, { transaction })
}

export const getAllUserGoals = async (req) => {
  const { page, size, groupBy } = req.query;
  const { limit, offset } = getPagination(page, size);

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
      where: { userId: 1 },
      attributes: { exclude: 'userGoalCategoryId' },
      include: [
        { model: models.UserGoalCategory, attributes: ['id', 'name'] },
        {
          model: GoalPartner, attributes: ["id"],
          include: { model: User, attributes: { exclude: ["userId", "password", "createdAt", "updatedAt"] }, as: "user" }
        },
      ],

      limit, offset
    }
  );
  return getPagingData(userGoalsData, page, size)
};

export const getUserGoalById = async (id) => {
  return await models.UserGoal.findByPk(id);
};

export const updateUserGoal = async (req, res) => {
  const { id } = req.params; 
  const { title, description, completed, startDate, endDate, goalPartners, usergoalcategoryId } = req.body;
  if(new Date(startDate) < new Date() || new Date(endDate) < new Date() || new Date(endDate) < startDate){
    throw new BadRequestError("Invalid start date or end date.")
  }
  const trans = await db.transaction();
  const [updated] = await models.UserGoal.update(
    { title, description, completed, startDate, endDate, usergoalcategoryId },
    { where: { id }, transaction: trans }
  );
  if (!updated) {
    throw new NotFoundError("Goal not found")
  }

  if (goalPartners && goalPartners.length > 0) {
    const partners = goalPartners.map(part => ({userId: part.user.id}))
    await GoalPartner.destroy({ where: { goalId: id }, transaction: trans });
    await GoalPartner.bulkCreate(partners.map(partner => ({userId: partner.userId})), { transaction: trans });
  }
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
