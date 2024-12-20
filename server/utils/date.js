
import { format, eachMonthOfInterval, setMonth, parse, startOfToday, isAfter } from 'date-fns';

//compares date
export const isPast = (startDate, endDate) => {
  if(!startDate){
    startDate = new Date()
  }
  const dateToCheck = new Date(endDate);
  const today = startOfToday();

  if ((isAfter(today, startDate))
    || (isAfter(startDate, dateToCheck))) {
    return true
  }
  else {
    return false
  }
}

export const isPastMonth = (startDate, endDate) => {
  const startMonth = new Date(startDate).getMonth()
  const currentMonth = new Date().getMonth()

  const endMonth = new Date(endDate).getMonth()

  return startMonth < currentMonth || endMonth < currentMonth
}

export const isPastYear = (startDate, endDate) =>{
  const startYear = new Date(startDate).getFullYear()
  const currentYear = new Date().getFullYear()
  const endYear = new Date(endDate).getFullYear()
  return startYear < currentYear || endYear < currentYear
}