import {getSortedEventsData} from '../../lib/events'
import {
   dateFallsInNextWeek,
   dateFallsInThisWeek,
   dateFallsThisMonth,
   isInNextWeek,
   isInTheFuture,
   isInThisMonth,
   isInThisWeek
} from '../../components/date'
import {intersection} from 'lodash';
import greekUtils from 'greek-utils';

const events = process.env.NODE_ENV === 'production' ? require('../../cache/data').events : getSortedEventsData();
const currentlyActiveEvents = events.filter(event => {
    return isInTheFuture(event.endDate);
});

const paginateResults = (results, query) => {
   const currPage = Number(query.page) || 0;
   const numberPerPage = Number(query.rows) || 10;
   const trimStart = (currPage)*numberPerPage;
   const trimEnd = trimStart + numberPerPage;
   return results.slice(trimStart, trimEnd);
};

const matchedSearchAllOtherResults = (query, allOtherResults) => {
   let matchedNames = [];
   if (query.q !== "null" && query.q !== "") {
      matchedNames = currentlyActiveEvents.filter(event => {
         return greekUtils.sanitizeDiacritics(event.title.toLowerCase())
            .indexOf(greekUtils.sanitizeDiacritics(query.q.toLowerCase())) !== -1
      });
      const intersectedResults = intersection(allOtherResults, matchedNames);
      return {
         totalLength: intersectedResults.length,
         results: paginateResults(intersectedResults, query)
      }
   } else {
      return {
         totalLength : allOtherResults.length,
         results: paginateResults(allOtherResults, query)
      };
   }
};

const considerCity = (results, cityProperty, selectedPeriod) => {
   return results.filter(result => {
      const cityDatesString = result[cityProperty];
      const cityDates = cityDatesString ? cityDatesString.split(",") : cityDatesString;
      if (cityDates) {
         switch (selectedPeriod) {
            case 'ALL':
               return true;
            case 'THIS_WEEK':
               return cityDates.some(cityDate => dateFallsInThisWeek(cityDate));
            case 'NEXT_WEEK':
               return cityDates.some(cityDate => dateFallsInNextWeek(cityDate));
            case 'THIS_MONTH':
               return cityDates.some(cityDate => dateFallsThisMonth(cityDate));
            default:
               return false;
         }
      } else {
         // This should only be used if individual city dates don't exist
         switch (selectedPeriod) {
             case 'ALL':
                return true;
             case 'THIS_WEEK':
                return isInThisWeek(result.startDate, result.endDate);
             case 'NEXT_WEEK':
                return isInNextWeek(result.startDate, result.endDate);
             case 'THIS_MONTH':
                return isInThisMonth(result.startDate, result.endDate);
             default:
                return true;
         }
      }
   });
}

const checkCityDates = (selectedCity, selectedPeriod, filteredResults) => {
   const cityResults = filteredResults.filter(event => {
            const cityLowercase = event.city.toLowerCase();
            const formattedCity = cityLowercase === "paphos" ? "pafos" : cityLowercase;
            return formattedCity.includes(selectedCity.toLowerCase())
         })
   const city = selectedCity.toUpperCase();
   switch (city) {
      case "ALL":
         return filteredResults;
      case "NICOSIA": return considerCity(cityResults, 'nicosia_dates', selectedPeriod);
      case "LIMASSOL": return considerCity(cityResults, 'limassol_dates', selectedPeriod);
      case "PAFOS": return considerCity(cityResults, 'paphos_dates', selectedPeriod);
      case "PAPHOS": return considerCity(cityResults, 'paphos_dates', selectedPeriod);
      case "LARNACA": return considerCity(cityResults, 'larnaca_dates', selectedPeriod);
      case "FAMAGUSTA": return considerCity(cityResults, 'famagusta_dates', selectedPeriod);
      default: return cityResults;
   }
}

export default (req, res) => {
   let results;
   let totalLength;
   let filteredResults = {};

   if (req.query.city === 'ALL' && req.query.period === 'ALL'
      && req.query.category === 'ALL') {
      filteredResults = matchedSearchAllOtherResults(req.query, currentlyActiveEvents);
   } else {
      const matchingCityAndPeriod = checkCityDates(req.query.city, req.query.period, currentlyActiveEvents);
      // const matchingCities = req.query.city !== 'ALL' ?
      //    currentlyActiveEvents.filter(event => {
      //       const cityLowercase = event.city.toLowerCase();
      //       const formattedCity = cityLowercase === "paphos" ? "pafos" : cityLowercase;
      //       return formattedCity.includes(req.query.city.toLowerCase())
      //    }) : currentlyActiveEvents;

      // let matchingPeriods = [];
      // switch (req.query.period) {
      //    case 'ALL':
      //       matchingPeriods = currentlyActiveEvents;
      //       break;
      //    case 'THIS_WEEK':
      //       matchingPeriods = currentlyActiveEvents.filter(event =>
      //          isInThisWeek(event.startDate, event.endDate));
      //       break;
      //    case 'NEXT_WEEK':
      //       matchingPeriods = currentlyActiveEvents.filter(event =>
      //          isInNextWeek(event.startDate, event.endDate));
      //       break;
      //    case 'THIS_MONTH':
      //       matchingPeriods = currentlyActiveEvents.filter(event =>
      //          isInThisMonth(event.startDate, event.endDate));
      //       break;
      //    default:
      //       matchingPeriods = currentlyActiveEvents;
      // }

      const matchingAudience = req.query.category !== 'ALL' ?
         currentlyActiveEvents.filter(event => event.category ?
            event.category.toLowerCase().includes(req.query.category.toLowerCase()) : false
         ) : currentlyActiveEvents;

      const intersectedFilters = intersection(matchingCityAndPeriod, matchingAudience);
      filteredResults = matchedSearchAllOtherResults(req.query, intersectedFilters);
   }

   totalLength = filteredResults.totalLength;
   results = filteredResults.results;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results, totalLength }))
}
