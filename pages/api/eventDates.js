import {getSortedEventsData} from '../../lib/events'
import {
   isInTheFuture,
} from '../../components/date'

const events = process.env.NODE_ENV === 'production' ? require('../../cache/data').events : getSortedEventsData();

const currentlyActiveEvents = events.filter(event => {
   return isInTheFuture(event.endDate);
});

const getAllEventsDates = () => {
   const getEventDates =  (event) => [
      event.nicosia_dates && [...event.nicosia_dates.split(",")],
      event.limassol_dates && [...event.limassol_dates.split(",")],
      event.paphos_dates && [...event.paphos_dates.split(",")],
      event.larnaca_dates && [...event.larnaca_dates.split(",")],
      event.famagusta_dates && [...event.famagusta_dates.split(",")]
   ].flat().filter((value) => value !== undefined && value !== "").map(d=>d.trim());

   const allDates = currentlyActiveEvents.reduce((acc, curr) => {
      acc = [...acc, ...getEventDates(curr)];
      return acc;
   } , []);
   return [...new Set(allDates)].sort();
}

export default (req, res) => {
   const dates = getAllEventsDates();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ dates }))
}
