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
import {intersection, intersectionBy} from 'lodash';
import greekUtils from 'greek-utils';
import moment from "moment";

const events = process.env.NODE_ENV === 'production' ? require('../../cache/data').events : getSortedEventsData();
const currentlyActiveEvents = events.filter(event => {
    return isInTheFuture(event.endDate);
});


const paginateResults = (results, query) => {
   const currPage = query.page || query.page === "0" ? Number(query.page) : 0;
   const numberPerPage = query.rows || query.rows === "0"  ? Number(query.rows) : 10;
   const trimStart = (currPage)*numberPerPage;
   const trimEnd = trimStart + numberPerPage;
   const x = results.slice(trimStart, trimEnd);
   return x;
};

const matchedSearchAllOtherResults = (query) => {
   let matchedNames = [];
   if (query.q && query.q !== "undefined" && query.q !== "null" && query.q !== "") {
      matchedNames = currentlyActiveEvents.filter(event => {
         return greekUtils.sanitizeDiacritics(event.title.toLowerCase())
            .indexOf(greekUtils.sanitizeDiacritics(query.q.toLowerCase())) !== -1
      });
      return matchedNames;
   } else {
      return currentlyActiveEvents;
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
      case "ALLCITIES":
         return [...considerCity(currentlyActiveEvents, 'nicosia_dates', selectedPeriod),
            ...considerCity(currentlyActiveEvents, 'limassol_dates', selectedPeriod),
            ...considerCity(currentlyActiveEvents, 'paphos_dates', selectedPeriod),
            ...considerCity(currentlyActiveEvents, 'paphos_dates', selectedPeriod),
            ...considerCity(currentlyActiveEvents, 'larnaca_dates', selectedPeriod),
            ...considerCity(currentlyActiveEvents, 'famagusta_dates', selectedPeriod)];
      case "ALL":
         return [...considerCity(currentlyActiveEvents, 'nicosia_dates', selectedPeriod),
            ...considerCity(currentlyActiveEvents, 'limassol_dates', selectedPeriod),
            ...considerCity(currentlyActiveEvents, 'paphos_dates', selectedPeriod),
            ...considerCity(currentlyActiveEvents, 'paphos_dates', selectedPeriod),
            ...considerCity(currentlyActiveEvents, 'larnaca_dates', selectedPeriod),
            ...considerCity(currentlyActiveEvents, 'famagusta_dates', selectedPeriod)];
      case "NICOSIA": return considerCity(cityResults, 'nicosia_dates', selectedPeriod);
      case "LIMASSOL": return considerCity(cityResults, 'limassol_dates', selectedPeriod);
      case "PAFOS": return considerCity(cityResults, 'paphos_dates', selectedPeriod);
      case "PAPHOS": return considerCity(cityResults, 'paphos_dates', selectedPeriod);
      case "LARNACA": return considerCity(cityResults, 'larnaca_dates', selectedPeriod);
      case "FAMAGUSTA": return considerCity(cityResults, 'famagusta_dates', selectedPeriod);
      default: return cityResults;
   }
}

const isSameDate = (eventDates, selectedDate) => {
   if (!eventDates) {
      return false;
   }
   // Convert event dates to 'DD-MM-YYYY' format
   const formattedEventDates = eventDates.map((date) => moment(date).format('DD-MM-YYYY'));

  // Convert selected date to 'DD-MM-YYYY' format
   const formattedSelectedDate = moment(selectedDate, 'DD-MM-YYYY').format('DD-MM-YYYY');

   const isDateIncluded = formattedEventDates.includes(formattedSelectedDate);
   return isDateIncluded;
}

const checkCityDatesForSpecificDate = (selectedCity, selectedDate, filteredResults) => {
   const cityResults = filteredResults.filter(event => {
      const cityLowercase = event.city.toLowerCase();
      const formattedCity = cityLowercase === "paphos" ? "pafos" : cityLowercase;
      return formattedCity.includes(selectedCity.toLowerCase())
   })
   const getEventDates =  (event) => [
      event.nicosia_dates && [...event.nicosia_dates.split(",")],
      event.limassol_dates && [...event.limassol_dates.split(",")],
      event.paphos_dates && [...event.paphos_dates.split(",")],
      event.larnaca_dates && [...event.larnaca_dates.split(",")],
      event.famagusta_dates && [...event.famagusta_dates.split(",")]
   ].flat().filter((value) => value !== undefined);

   const city = selectedCity.toUpperCase();
   switch (city) {
      case "ALL":
         return filteredResults.filter(result => isSameDate(getEventDates(result), selectedDate));
      case "ALLCITIES":
         return filteredResults.filter(result => isSameDate(getEventDates(result), selectedDate));
      case "NICOSIA": return filteredResults.filter(result => isSameDate(result.nicosia_dates ? result.nicosia_dates.split(",") : [], selectedDate));
      case "LIMASSOL": return filteredResults.filter(result => isSameDate(result.limassol_dates ? result.limassol_dates.split(","): [], selectedDate));
      case "PAFOS": return filteredResults.filter(result => isSameDate(result.paphos_dates ? result.paphos_dates.split(","): [], selectedDate));
      case "PAPHOS": return filteredResults.filter(result => isSameDate(result.paphos_dates? result.paphos_dates.split(",") : [], selectedDate));
      case "LARNACA": return filteredResults.filter(result => isSameDate(result.larnaca_dates? result.larnaca_dates.split(","): [], selectedDate));
      case "FAMAGUSTA": return filteredResults.filter(result => isSameDate(result.famagusta_dates ? result.famagusta_dates.split(","): [], selectedDate));
      default: return cityResults;
   }
}

export default (req, res) => {
   let results;
   let totalLength;
   let filteredResults = {};

   if (['ALLCITIES, ALL'].includes(req.query.city.toUpperCase())
       && req.query.period === 'ALL'
       && req.query.category === 'ALL' && !req.query.date) {
      filteredResults = matchedSearchAllOtherResults(req.query);
   } else {
      const matchingCityAndPeriod = checkCityDates(req.query.city, req.query.period, currentlyActiveEvents);

      const matchingCityAndDate = req.query.date && req.query.date !== "undefined" ?
          checkCityDatesForSpecificDate(req.query.city, req.query.date, currentlyActiveEvents):
          currentlyActiveEvents;

      const matchingAudience = req.query.category !== 'ALL' ?
         currentlyActiveEvents.filter(event => event.category ?
            event.category.toLowerCase().includes(req.query.category.toLowerCase()) : false
         ) : currentlyActiveEvents;

      const matchingSearch = matchedSearchAllOtherResults(req.query);

      filteredResults = intersectionBy(matchingCityAndPeriod, matchingAudience, matchingCityAndDate, matchingSearch, 'id');

   }

   const responseData = {
      totalLength: filteredResults.length,
      results: paginateResults(filteredResults, req.query)
   }

   totalLength = responseData.totalLength;
   results = responseData.results;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results, totalLength }))
}
