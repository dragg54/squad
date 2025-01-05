import { sendMail } from "../EmailService.js"

export const scheduleMonthGoalKPI = () =>{
    console.log("sending mail")
    const email = {
        recipientAddress: 'ajibolasadiq@yahoo.com',
        subject: 'Monthly Goal Progress',
        email: 'Click the link to view the summary of your monthly goal progress'
    }
    sendMail(email)
}