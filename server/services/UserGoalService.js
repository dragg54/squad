import UserGoal from "../models/UserGoal.js";

export const createUserGoal = async (goalData) => {
  return await UserGoal.create(goalData);
};

export const getAllUserGoals = async (userId) => {
  return await UserGoal.findAll({ where: { userId } });
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
