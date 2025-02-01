import { Router } from "express";
import { createGoalReminder, getGoalReminders, getGoalReminder, updateGoalReminderStatus } from "../controllers/GoalReminderController.js";
import { authMiddleware } from "../middlewares/authMiddleWare.js";

export const goalReminderRoute = Router()

goalReminderRoute.post("/", authMiddleware, createGoalReminder)
goalReminderRoute.get("/", authMiddleware, getGoalReminders)
goalReminderRoute.get("/:id", authMiddleware, getGoalReminder)
goalReminderRoute.patch("/:id", authMiddleware, updateGoalReminderStatus)