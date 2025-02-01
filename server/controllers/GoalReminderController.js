import logger from '../logger.js'
import * as goalReminderService from '../services/GoalReminderService.js'

export async function createGoalReminder(req, res){
    try{
        await goalReminderService.createGoalReminder(req)
        res.json("Reminder created")
        logger.info("Reminder created")
    }
    catch(err){
        logger.error(err.message || "Request failed")
        res.status(err.statusCode || 500).json(err.message || "Internal Server Error")
    }
}

export async function getGoalReminders(req, res){
    try{
        const goalReminders = await goalReminderService.getGoalReminders(req)
        return res.json(goalReminders)
    }
    catch(err){
        logger.error(err.message || "Request failed")
        res.status(err.statusCode || 500).json(err.message || "Internal Server Error")
    }
}

export async function getGoalReminder(req, res){
    try{
        const goalReminder = await goalReminderService.getGoalReminder(req)
        return res.json(goalReminder)
    }
    catch(err){
        logger.error(err.message || "Request failed")
        res.status(err.statusCode || 500).json(err.message || "Internal Server Error")
    }
}

export async function updateGoalReminderStatus(req, res){
    try{
        await goalReminderService.updateGoalReminderStatus(req)
        return res.json("Goal reminder status updated")
    }
    catch(err){
        logger.error(err.message || "Request failed")
        res.status(err.statusCode || 500).json(err.message || "Internal Server Error")
    }
}