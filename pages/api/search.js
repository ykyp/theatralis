import { getSortedEventsData } from '../../lib/events'
import { isInThisWeek, isInNextWeek, isInThisMonth, isInTheFuture } from '../../components/date'
import { intersection } from 'lodash';

const events = process.env.NODE_ENV === 'production' ? require('../../cache/data').events : getSortedEventsData();
const currentlyActiveEvents = events.filter(event => {
    return isInTheFuture(event.endDate);
});

const paginateResults = (results, query) => {
   const currPage = Number(query.page) || 0;
   const numberPerPage = Number(query.rows) || 10;
   const trimStart = (currPage)*numberPerPage;
   const trimEnd = trimStart + numberPerPage;
   const paginatedResults = results.slice(trimStart, trimEnd);
   return paginatedResults;
};

export default (req, res) => {
   let results = [];
   let totalLength = 0;
   if (req.query.city === 'ALL' && req.query.period == 'ALL'
      && req.query.category == 'ALL') {
      totalLength = currentlyActiveEvents.length;
      results =  paginateResults(currentlyActiveEvents, req.query);
   } else {
      const matchingCities = req.query.city !== 'ALL' ?
         currentlyActiveEvents.filter(event => {
            const cityLowercase = event.city.toLowerCase();
            const formattedCity = cityLowercase === "paphos" ? "pafos" : cityLowercase;
            return formattedCity.includes(req.query.city.toLowerCase())
         }) : currentlyActiveEvents;

      let matchingPeriods = [];
      switch (req.query.period) {
         case 'ALL':
            matchingPeriods = currentlyActiveEvents;
            break;
         case 'THIS_WEEK':
            matchingPeriods = currentlyActiveEvents.filter(event =>
               isInThisWeek(event.startDate, event.endDate));
            break;
         case 'NEXT_WEEK':
            matchingPeriods = currentlyActiveEvents.filter(event =>
               isInNextWeek(event.startDate, event.endDate));
            break;
         case 'THIS_MONTH':
            matchingPeriods = currentlyActiveEvents.filter(event =>
               isInThisMonth(event.startDate, event.endDate));
            break;
         default:
            matchingPeriods = currentlyActiveEvents;
      }

      const matchingAudience = req.query.category !== 'ALL' ?
         currentlyActiveEvents.filter(event => event.category ?
            event.category.toLowerCase().includes(req.query.category.toLowerCase()) : false
         ) : currentlyActiveEvents;

      const intersectedResults = intersection(matchingCities, matchingPeriods, matchingAudience);
      totalLength = intersectedResults.length;
      results = paginateResults(intersectedResults, req.query);
   }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results, totalLength }))
}
