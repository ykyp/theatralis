import { format, getISOWeek } from 'date-fns';


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

const weekIsBetweenStartEnd = (today, weekToCompare, startDate, endDate) => {
  const todayYear = today.getFullYear();
  const startDateYear = startDate.getFullYear();
  const endDateYear = endDate.getFullYear();

  const startDateComplies = weekToCompare >= getISOWeek(startDate) || startDateYear < todayYear;
  const endDateComplies = weekToCompare <= getISOWeek(endDate) || endDateYear > todayYear;
  const inFuture = todayYear < startDateYear && todayYear < endDateYear;
  return startDateComplies && endDateComplies && !inFuture;
};

const weekIsSameAs = (today, weekToCompare, dateToCheck) => {
  console.log("event date ", dateToCheck);
  const todayYear = today.getFullYear();
  const dateToCheckYear = dateToCheck.getFullYear();
  console.log("event week ", getISOWeek(dateToCheck));
  const dateComplies = weekToCompare === getISOWeek(dateToCheck) ;
  console.log("dateComplies", dateComplies);
  const inFuture = todayYear < dateToCheckYear;
  return dateComplies && !inFuture;
};

const monthIsBetweenStartEnd = (day, startDate, endDate) => {
  const monthToCompare = day.getMonth();
  const todayYear = day.getFullYear();
  const startDateYear = startDate.getFullYear();
  const endDateYear = endDate.getFullYear();

  const startDateComplies = monthToCompare >= startDate.getMonth() || startDateYear < todayYear;
  const endDateComplies = monthToCompare <= endDate.getMonth() || endDateYear > todayYear;
  const inFuture = todayYear < startDateYear && todayYear < endDateYear;
  return startDateComplies && endDateComplies && !inFuture;
};


const monthIsSameAs = (day, dateString) => {
  const monthToCompare = day.getMonth();
  const todayYear = day.getFullYear();
  const dateToCheckYear = dateString.getFullYear();

  const startDateComplies = monthToCompare >= dateString.getMonth() || dateToCheckYear < todayYear;
  const inFuture = todayYear < dateToCheckYear;
  return startDateComplies && !inFuture;
};

const dateIsInWeek = (dateString, addWeeks) => {
  const dateToCheck = new Date(dateString.trim());
  const today = new Date();
  const todayWeek = getISOWeek(today);
  console.log("today's week ", todayWeek);
  const weekToCompare =  addWeeks ? todayWeek + addWeeks : todayWeek;
  console.log("week to compare", weekToCompare);
  return weekIsSameAs(today, weekToCompare, dateToCheck);
};

const isInWeek = (startDateString, endDateString, addWeeks) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  const today = new Date();
  const todayWeek = getISOWeek(today);

  const weekToCompare =  addWeeks ? todayWeek + addWeeks : todayWeek;

  const isBetweenStartEnd = weekIsBetweenStartEnd(today, weekToCompare, startDate, endDate);
  return isBetweenStartEnd;
};

export default function FormattedDate({ dateString }) {
  const date = new Date(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}

export function isInThisWeek(startDateString, endDateString) {
  return isInWeek(startDateString, endDateString);
}

export function isInNextWeek(startDateString, endDateString) {
  return isInWeek(startDateString, endDateString, 1);
}

export function isInThisMonth(startDateString, endDateString) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  return monthIsBetweenStartEnd(new Date(), startDate, endDate);
}

export function dateFallsInThisWeek(dateString) {
  const isIt = dateIsInWeek(dateString);
  return isIt;
}

export function dateFallsInNextWeek(dateString) {
  console.log("dateFallsInNextWeek", dateString);
  return dateIsInWeek(dateString, 1);
}

export function dateFallsThisMonth(dateString) {
  const dateToCheck = new Date(dateString);

  return monthIsSameAs(new Date(), dateToCheck);
}

export function finishesSoon(dateString) {
  const asDate = new Date(dateString);
  const today = new Date();
  const todayYear = today.getFullYear();
  const asDateYear = asDate.getFullYear();

  const oneWeekAhead = new Date();
  oneWeekAhead.setDate(today.getDate() + 7);


  return todayYear === asDateYear && oneWeekAhead >= asDate;
}

export function isInTheFuture(dateString) {
  const asDate = new Date(dateString);
  const today = new Date();
  return asDate > today || isToday(asDate);
}

export function formatDate(dateString) {
  const date = Date.parse(dateString);
  return format(date, 'dd/MM/yyyy');
}
