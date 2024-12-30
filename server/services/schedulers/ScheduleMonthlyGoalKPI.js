import { sendMail } from "../EmailService.js"

export const scheduleMonthGoalKPI = () =>{
    console.log("sending mail")
    sendMail('ajibolasadiq@yahoo.com')
}