import db from "../configs/db.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import GoalPartner from "../models/GoalPartner.js";
import User from "../models/User.js";
import UserGoal from "../models/UserGoal.js";
import { UserGoalCategory } from "../models/UserGoalCategory.js";
import { getPagination, getPagingData } from "../utils/pagination.js";

export const createUserGoal = async (goalData, transaction) => {
  const userGoal = await UserGoal.create(goalData, { transaction });
  if (goalData.goalPartners && goalData.goalPartners.length > 0) {
    goalData.goalPartners.forEach((partner) => {
      partner.goalId = userGoal.id
    })
    await createUserGoalPartner(goalData?.goalPartners, transaction)
  }
  return
};

export const createUserGoalPartner = async (goalPartners, transaction) => {
  await GoalPartner.bulkCreate(goalPartners, { transaction })
}

export const getAllUserGoals = async (req) => {
  const { page, size, groupBy } = req.query;
  const { limit, offset } = getPagination(page, size);

  if (groupBy == "month") {
    const goalsGroupedByMonth = await UserGoal.findAll({
      attributes: [
        [db.fn('DATE_FORMAT', db.col('UserGoal.createdAt'), '%m'), 'month'],
        'title', 'description', 'completed'
      ],
      include: [
        { model: UserGoalCategory, attributes: ['id', 'name'] },
        {
          model: GoalPartner, attributes: ["id"],
          include: { model: User, attributes: { exclude: ["userId", "password", "createdAt", "updatedAt"] }, as: "user" }
        }
      ], order: [[db.literal('month'), 'ASC']],
    });
    return groupData(goalsGroupedByMonth, groupBy)
  }

  if (groupBy === "year") {
    const goalsGroupedByYear = await UserGoal.findAll({
      attributes: [
        [db.fn('DATE_FORMAT', db.col('UserGoal.createdAt'), '%Y'), 'year'],
        'title', 'description', 'completed'
      ],
      include: [
        { model: UserGoalCategory, attributes: ['id', 'name'] },
        {
          model: GoalPartner, attributes: ["id"],
          include: { model: User, attributes: { exclude: ["userId", "password", "createdAt", "updatedAt"] }, as: "user" }
        }
      ],
      order: [[db.literal('year'), 'ASC']],
    });

    return groupData(goalsGroupedByYear, groupBy)
  }
  const userGoalsData = await UserGoal.findAndCountAll(
    {
      where: { userId: 1 },
      attributes: { exclude: 'userGoalCategoryId' },
      include: [
        { model: UserGoalCategory, attributes: ['id', 'name'] },
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
  return await UserGoal.findByPk(id);
};

export const updateUserGoal = async (req, res) => {
  const { id } = req.params;  // Goal ID
  const { title, description, completed, start_date, end_date, goalPartners, usergoalcategoryId } = req.body;

  const trans = await db.transaction();
  const [updated] = await UserGoal.update(
    { title, description, completed, start_date, end_date, usergoalcategoryId },
    { where: { id }, transaction: trans }
  );

  if (!updated) {
    throw new NotFoundError("Goal not found")
  }

  if (goalPartners && goalPartners.length > 0) {
    await GoalPartner.destroy({ where: { userGoalId: id }, transaction: trans });
    await GoalPartner.bulkCreate(goalPartners.map(partner => ({
      ...partner, userGoalId: id
    })), { transaction: trans });
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
      [db.fn('DATE_FORMAT', db.col('end_date'), '%m'), 'month'],
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
