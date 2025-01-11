import cron from 'node-cron'
import { scheduleBirthday } from './ScheduleBirthday.js';
import { scheduleGoalExpiration } from './ScheduleGoalExpiration.js';
import { scheduleMonthGoalKPI } from './ScheduleMonthlyGoalKPI.js';

export  function scheduleJob(io){
    cron.schedule('1 0 * * *', async() => {
       await scheduleBirthday(io);
    });
    cron.schedule('29 13 * * *', async()=>{
        await scheduleGoalExpiration(io)
    })
    cron.schedule('0 7 1 * *', async()=>{
       scheduleMonthGoalKPI()
    })
}
