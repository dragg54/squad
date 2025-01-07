import db from '../configs/db.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import * as userGoalService from '../services/UserGoalService.js'

export const createUserGoal = async (req, res, next) => {
  const transaction = await db.transaction();
  try {
    req.body.userId = req.user.id
    req.body.squadId = req.user.squadId
    const goal = await userGoalService.createUserGoal(req, transaction);
    await transaction.commit()
    return res.status(201).json({message: "User goal created"});
  } catch (error) {
    await transaction.rollback()
     res.status(error.statusCode || 500).send({
        message: error.message || "Internal Server Error"
     })
  }
};

export const getAllUserGoals = async (req, res, next) => {
  try {
    const goals = await userGoalService.getAllUserGoals(req);
    return res.status(200).json(goals);
  } catch (error) {
     res.status(error.statusCode || 500).send({
        message: error.message || "Internal Server Error"
     })
  }
};

export const getUserGoalById = async (req, res, next) => {
  try {
     const goal = await userGoalService.getUserGoalById(req.params.id);
    if (goal) {
      res.status(200).json(goal);
    } else {
      next(new BadRequestError('Goal not found'));
    }
  } catch (error) {
     res.status(error.statusCode || 500).send({
        message: error.message || "Internal Server Error"
     })
  }
};

export const updateUserGoal = async (req, res, next) => {
  const transaction = await db.transaction();
  try {
    await userGoalService.updateUserGoal(req, res, transaction);
    transaction.commit()
    res.json("Goal updated")
  } catch (error) {
    console.log(error.message)
    await transaction.rollback()
     res.status(error.statusCode || 500).send({
        message: error.message || "Internal Server Error"
     })
  }
};


export const deleteUserGoal = async (req, res, next) => {
  try {
    const success = await userGoalService.deleteUserGoal(req.params.id);
    if (success) {
      res.status(204).json();
    } else {
      next(new BadRequestError('Goal not found'));
    }
  } catch (error) {
     res.status(error.statusCode || 500).send({
        message: error.message || "Internal Server Error"
     })
  }
};

export const getUserGoalsByMonth = async (req, res, next) => {
  try {
    const goals = await userGoalService.getGoalsGroupedByMonth(req);
    return res.json(goals)
  } catch (error) {
     res.status(error.statusCode || 500).send({
        message: error.message || "Internal Server Error"
     })
  }
};

export const updateUserGoalStatus = async(req, res) =>{
  const transaction = await db.transaction();
  try {
    await userGoalService.updateGoalStatus(req, transaction);
    return res.json({message: "User goal status updated"})
  } catch (error) {
     res.status(error.statusCode || 500).send({
        message: error.message || "Internal Server Error"
     })
  }
}
