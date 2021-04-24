import { parseISO, format, getISOWeek } from 'date-fns';


//TODO: Optimize
const isToday = (someDate) => {
  const today = new Date();
  return someDate.getDate() === today.getDate() &&
     someDate.getMonth() === today.getMonth() &&
     someDate.getFullYear() === today.getFullYear();
};

const isBetween = (date, min, max) => isToday(min) || isToday(max)||
   (date.getTime() >= min.getTime() &&
   date.getTime() <= max.getTime());

const isInWeek = (startDateString, endDateString, addWeeks) => {
  const startDate = parseISO(startDateString);
  const endDate = parseISO(endDateString);
  const today = new Date();
  const todayWeek = getISOWeek(today);
  const weekToCompare =  addWeeks ? todayWeek + addWeeks : todayWeek;
  const fullDayIsBetweenStartEnd = isBetween(today, startDate, endDate);
  const weekIsBetweenStartEnd = weekToCompare >= getISOWeek(startDate) &&
     weekToCompare <= getISOWeek(endDate);
  return fullDayIsBetweenStartEnd && weekIsBetweenStartEnd;
};

export default function FormattedDate({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}

export function isInThisWeek(startDateString, endDateString) {
  return isInWeek(startDateString, endDateString);
}

export function isInNextWeek(startDateString, endDateString) {
  return isInWeek(startDateString, endDateString, 1);
}

export function isInThisMonth(startDateString, endDateString) {
  const startDate = parseISO(startDateString);
  const endDate = parseISO(endDateString);
  return isBetween(new Date(), startDate, endDate);
}
