import { BadRequestError } from '../errors/BadRequestError.js';
import * as userGoalService from '../services/UserGoalService.js'

export const createUserGoal = async (req, res, next) => {
  try {
    req.body.userId = req.user.id
    const goal = await userGoalService.createUserGoal(req.body);
    res.status(201).json(goal);
  } catch (error) {
     res.statusCode(error.statusCode || 500).send({
        message: error.message || "Internal Server Error"
     })
  }
};

export const getAllUserGoals = async (req, res, next) => {
  try {
    const goals = await userGoalService.getAllUserGoals(req.user.id);
    res.status(200).json(goals);
  } catch (error) {
     res.statusCode(error.statusCode || 500).send({
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
     res.statusCode(error.statusCode || 500).send({
        message: error.message || "Internal Server Error"
     })
  }
};

export const updateUserGoal = async (req, res, next) => {
  try {
    const goal = await userGoalService.updateUserGoal(req.params.id, req.body);
    if (goal) {
      res.status(200).json(goal);
    } else {
      next(new BadRequestError('Goal not found'));
    }
  } catch (error) {
     res.statusCode(error.statusCode || 500).send({
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
     res.statusCode(error.statusCode || 500).send({
        message: error.message || "Internal Server Error"
     })
  }
};
