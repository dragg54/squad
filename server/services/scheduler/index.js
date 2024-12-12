import cron from 'node-cron'
import { scheduleBirthday } from './ScheduleBirthday.js';

export  function scheduleJob(){
    cron.schedule('* * * * * *', async() => {
       await scheduleBirthday();
    });
    
}
