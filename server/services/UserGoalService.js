import db from "../configs/db.js";
import GoalPartner from "../models/GoalPartner.js";
import UserGoal from "../models/UserGoal.js";
import { getPagination, getPagingData } from "../utils/pagination.js";

export const createUserGoal = async (goalData, transaction) => {
  const userGoal = await UserGoal.create(goalData, {transaction});
  if(goalData.goalPartners && goalData.goalPartners.length > 0){
    goalData.goalPartners.forEach((partner)=>{
      partner.goalId = userGoal.id
    })
    await createUserGoalPartner(goalData?.goalPartners, transaction)
  }
  return
};

export const createUserGoalPartner = async(goalPartners, transaction) =>{
  await GoalPartner.bulkCreate(goalPartners, {transaction})
}

export const getAllUserGoals = async (req) => {
  const { page, size, groupBy } = req.query;
  const { limit, offset } = getPagination(page, size);
  
  if(groupBy == "month"){
    const goalsGroupedByMonth = await UserGoal.findAll({
      attributes: [
        [db.fn('DATE_FORMAT', db.col('createdAt'), '%m'), 'month'],
        'title', 'description'
      ],
      order: [[db.literal('month'), 'ASC']],
    });
    return groupData(goalsGroupedByMonth, groupBy)
  }

  if (groupBy === "year") {
    const goalsGroupedByYear = await UserGoal.findAll({
      attributes: [
        [db.fn('DATE_FORMAT', db.col('createdAt'), '%Y'), 'year'],
        'title', 'description'
      ],
      order: [[db.literal('year'), 'ASC']],
    });

    return groupData(goalsGroupedByYear, groupBy)
  }
  const userGoalsData = await UserGoal.findAndCountAll({ where: { userId: 1 }, limit, offset });
  return getPagingData(userGoalsData, page, size)
};

export const getUserGoalById = async (id) => {
  return await UserGoal.findByPk(id);
};

export const updateUserGoal = async (id, goalData) => {
  const goal = await UserGoal.findByPk(id);
  if (goal) {
    await goal.update(goalData);
    return goal;
  }
  return null;
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
      where: {userId: req.user.id}
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
