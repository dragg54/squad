import { format, eachMonthOfInterval, setMonth, parse, startOfToday, isAfter } from 'date-fns';

//for getting month name from january to december
export const getMonthNames = () => {
  const startOfYear = new Date(2024, 0, 1);
  const endOfYear = new Date(2024, 11, 31);

  const months = eachMonthOfInterval({
    start: startOfYear,
    end: endOfYear,
  }).map(monthDate => format(monthDate, 'MMMM'));

  return months;
};


//for getting month index from date string
export const getMonthIndex = (monthName) => {
  const date = parse(monthName, 'MMMM', new Date());
  const dateIndex = format(date, 'M');
  if (Number(dateIndex) < 10) {
    return "0" + dateIndex.toString()
  }
  return dateIndex.toString()
};

//for getting month from Date string
export const getMonthName = (monthIndex) => {
  const date = setMonth(new Date(), monthIndex);
  return format(date, 'MMMM');
};

//Formats date string to Month and Year
export const formatDate = (dateString) => {
  if (dateString) {
    return format(new Date(dateString), "do MMMM, yyyy");
  }
}

//dd/MM/YYYY
export const formatDate2 = (dateString) => {
  if (dateString) {
    return format(new Date(dateString), "dd/MM/yyyy");
  }
}


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