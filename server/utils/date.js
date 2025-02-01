
import { format, eachMonthOfInterval, setMonth, parse, startOfToday, isAfter, setHours } from 'date-fns';
import { goalFrequency } from '../constants/GoalFrequency.js';

//compares date
export const isPast = (startDate, endDate) => {
  if (!startDate) {
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

export const isInvalidCustomDate = (startDate, endDate) => {
  const today = startOfToday()
  if (isAfter(startDate, new Date(endDate)) || isAfter(today, endDate)) {
    return true
  }
  else {
    return false
  }
}

export const isPastMonth = (startDate, endDate) => {
  const startMonth = new Date(startDate).getMonth()
  const currentMonth = new Date()
  const endMonth = new Date(endDate).getMonth()

  return startMonth < new Date(currentMonth).getMonth() || endMonth < new Date(currentMonth).getMonth()
}

export const isPastYear = (startDate, endDate) => {
  const startYear = new Date(startDate).getFullYear()
  const currentYear = new Date().getFullYear()
  const endYear = new Date(endDate).getFullYear()
  return startYear < currentYear || endYear < currentYear
}

export const correctHour = (date) => {
  return new Date(new Date(date).setHours(new Date(date).getHours() + 1))
}

export const correctMonth = (date) => {
  return new Date(new Date(date).setDate(new Date(date).getDate() - 1))
}

export const correctDate = (date, frequency, dateType = null) => {
  const currentDate = new Date(date)
  switch (frequency) {
    case goalFrequency.daily:
      return new Date(new Date(date).setHours(new Date(date).getHours() + 1))
      
    case goalFrequency.monthly:
      if (dateType == 'startDate') {
        currentDate.setDate(1)
        currentDate.setMonth(new Date(currentDate).getMonth() - 1)
        currentDate.setHours(1, 1, 0, 0)
      }
      else {
        currentDate.setHours(0, 59, 59, 999);
      }
      return currentDate
    case goalFrequency.yearly:
      if (dateType == 'startDate') {
        currentDate.setDate(1)
        currentDate.setHours(1, 1, 0, 0)
      }
      else{
        currentDate.setUTCHours(23, 59, 59, 999)
        currentDate.setUTCMonth(11)
      }
      return currentDate
    case goalFrequency.custom:
      if (dateType == 'startDate') {
        currentDate.setHours(1, 1, 0, 0)
      }
      else{
        currentDate.setUTCDate(new Date(currentDate).getUTCDate() + 1)
        currentDate.setUTCHours(23, 59, 59, 999)
      }
      return currentDate
    default:
      return date
  }
}

  export const correctDateUpdate = (date, frequency, dateType = null) => {
    const currentDate = new Date(date)
    switch (frequency) {
      case goalFrequency.daily:
        return new Date(new Date(date).setHours(new Date(date).getHours() + 1))
        
      case goalFrequency.monthly:
        if (dateType == 'startDate') {
          currentDate.setUTCDate(1)
          currentDate.setUTCHours(1, 1, 0, 0)
        }
        else {
          currentDate.setHours(0, 59, 59, 999);
        }
        return currentDate
      case goalFrequency.yearly:
        if (dateType == 'startDate') {
          currentDate.setDate(1)
          currentDate.setHours(1, 1, 0, 0)
        }
        else{
          currentDate.setUTCHours(23, 59, 59, 999)
          currentDate.setUTCMonth(11)
        }
        return currentDate
        
      case goalFrequency.custom:
        if (dateType == 'startDate') {
          currentDate.setHours(1, 1, 0, 0)
        }
        else{
          currentDate.setUTCHours(23, 59, 59, 999)
        }
        return currentDate
      default:
        return date
    }
}

export const getMonthName = (monthIndex) => {
  const date = setMonth(new Date(), monthIndex);
  return format(date, 'MMMM');
};
