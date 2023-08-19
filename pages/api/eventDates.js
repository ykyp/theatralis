import {getSortedEventsData} from '../../lib/events'
import {
   isInTheFuture,
} from '../../components/date'
import moment from "moment/moment";

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
   const formattedDates = allDates.map(d=> {
      const splittedDate = d.split("-");
      let paddedDate = d;
      if (splittedDate.length > 2) {
         if (splittedDate[1].length === 1)
         {
            paddedDate = splittedDate[0] + "-" + "0" + splittedDate[1] + "-" + splittedDate[2];
         }
         if (splittedDate[2].length === 1)
         {
            paddedDate = splittedDate[0] + "-"  + splittedDate[1] + "-" + "0" + splittedDate[2];
         }
      }
      return paddedDate;
   });
   return [...new Set(formattedDates)];
}

export default (req, res) => {
   const dates = getAllEventsDates();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ dates }))
}
