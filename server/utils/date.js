
import { format, eachMonthOfInterval, setMonth, parse, startOfToday, isAfter } from 'date-fns';

//compares date
export const isPast = (startDate, endDate) => {
  if(!startDate){
    startDate = new Date()
  }
  const dateToCheck = new Date(endDate);
  const today = startOfToday();

  if (isAfter(today, new Date(startDate))
    || isAfter(dateToCheck, new Date(endDate))) {
    return true
  }
  else {
    return false
  }
}

export const isPastMonth = (startDate, endDate) => {
  const startMonth = new Date(startDate).getMonth()
  const currentMonth = new Date().setMonth(new Date().getMonth() + 1)
  const endMonth = new Date(endDate).getMonth()

  return startMonth < new Date(currentMonth).getMonth() || endMonth < new Date(currentMonth).getMonth()
}

export const isPastYear = (startDate, endDate) =>{
  const startYear = new Date(startDate).getFullYear()
  const currentYear = new Date().getFullYear()
  const endYear = new Date(endDate).getFullYear()
  return startYear < currentYear || endYear < currentYear
}

export const correctHour = (date) =>{
  return new Date(new Date(date).setHours(new Date(date).getHours() + 1))
}