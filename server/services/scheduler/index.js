import cron from 'node-cron'
import { scheduleBirthday } from './ScheduleBirthday.js';

export  function scheduleJob(io){
    cron.schedule('1 0 * * *', async() => {
       await scheduleBirthday(io);
    });
    
}
