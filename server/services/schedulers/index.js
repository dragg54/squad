import cron from 'node-cron'
import { scheduleBirthday } from './ScheduleBirthday.js';
import { scheduleGoalExpiration } from './ScheduleGoalExpiration.js';

export  function scheduleJob(io){
    cron.schedule('1 0 * * *', async() => {
       await scheduleBirthday(io);
    });
    cron.schedule('35 7 * * *', async()=>{
        await scheduleGoalExpiration(io)
    })
}
