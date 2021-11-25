import {isInNextWeek, isInThisMonth, isInThisWeek} from "./date";
import {intersection} from "lodash";

const paginateResults = (results, query) => {
   const currPage = Number(query.page) || 0;
   const numberPerPage = Number(query.rows) || 10;
   const trimStart = (currPage)*numberPerPage;
   const trimEnd = trimStart + numberPerPage;
   const paginatedResults = results.slice(trimStart, trimEnd);
   return paginatedResults;
};

export const searchAll = (allEventsData, query) => {
   if (query.city === 'ALL' && query.period == 'ALL'
      && query.category == 'ALL') {
      return paginateResults(allEventsData, query);
   } else {
      const matchingCities = query.city !== 'ALL' ?
         allEventsData.filter(event => {
            const cityLowercase = event.city.toLowerCase();
            const formattedCity = cityLowercase === "paphos" ? "pafos" : cityLowercase;
            return formattedCity.includes(query.city.toLowerCase())
         }) : allEventsData;

      let matchingPeriods = [];
      switch (query.period) {
         case 'ALL':
            matchingPeriods = allEventsData;
            break;
         case 'THIS_WEEK':
            matchingPeriods = allEventsData.filter(event =>
               isInThisWeek(event.startDate, event.endDate));
            break;
         case 'NEXT_WEEK':
            matchingPeriods = allEventsData.filter(event =>
               isInNextWeek(event.startDate, event.endDate));
            break;
         case 'THIS_MONTH':
            matchingPeriods = allEventsData.filter(event =>
               isInThisMonth(event.startDate, event.endDate));
            break;
         default:
            matchingPeriods = allEventsData;
      }

      const matchingAudience = query.category !== 'ALL' ?
         allEventsData.filter(event => event.category ?
            event.category.toLowerCase().includes(query.category.toLowerCase()) : false
         ) : allEventsData;

      const intersectedResults = intersection(matchingCities, matchingPeriods, matchingAudience);
      return paginateResults(intersectedResults, query);
   }
};
