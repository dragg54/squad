
import { format, eachMonthOfInterval, setMonth, parse, startOfToday, isAfter } from 'date-fns';

//compares date
export const isPast = (startDate = new Date(), endDate) => {
    const dateToCheck = new Date(endDate);
    const today = startOfToday();
  
    if ((!startDate && isAfter(dateToCheck, today)) 
      || (startDate && isAfter(dateToCheck, new Date(startDate)))) {
       return false
    }
    else {
     return true
    }
  }