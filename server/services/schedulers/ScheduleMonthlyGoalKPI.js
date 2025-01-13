import logger from "../../logger.js"
import { getMonthName } from "../../utils/date.js"
import { sendMail } from "../EmailService.js"
import { getGoalsGroupedByMonth } from "../UserGoalService.js"
import { getAllUsers } from "../UserService.js"

export const scheduleMonthGoalKPI = async () => {
    const getAllUserRequest = {
        user: null
    }
    var users = await getAllUsers(getAllUserRequest)
    Promise.all(users.map(async (user) => {
        const month = new Date().getMonth() - 1
        const email = {
            recipientAddress: user.email,
            subject: 'Monthly Goal Progress',
            message: `Click the link to view your ${getMonthName(month)}. <a style="color:red;" href="${process.env.NODE_ENV === 'production'
                ? process.env.PROD_CLIENT_BASE_URL
                : process.env.LOCAL_CLIENT_BASE_URL
                }/monthlyProgress?month=${month}&userId=${user.id}">View</a>`
        }
        sendMail(email)
        logger.info("Monthly goal KPI notification sent")
    }))

}