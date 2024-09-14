import { format, eachMonthOfInterval, setMonth, parse} from 'date-fns';

export const getMonthNames = () => {
  const startOfYear = new Date(2024, 0, 1); 
  const endOfYear = new Date(2024, 11, 31); 

  const months = eachMonthOfInterval({
    start: startOfYear,
    end: endOfYear,
  }).map(monthDate => format(monthDate, 'MMMM'));

  return months;
};

export const getMonthIndex = (monthName) => {
  const date = parse(monthName, 'MMMM', new Date());
  const dateIndex = format(date, 'M');
  if(Number(dateIndex) < 10){
    return "0" + dateIndex.toString()
  }
  return dateIndex.toString()
};

export const getMonthName = (monthIndex) => {
  const date = setMonth(new Date(), monthIndex);
  return format(date, 'MMMM');
};

export const formatDate = (dateString) =>{
  if(dateString){
    return format(new Date(dateString), "do MMMM, yyyy");
  }
}

