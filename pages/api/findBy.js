import { getSortedEventsData } from '../../lib/events'
import { isInTheFuture } from '../../components/date'
const events = process.env.NODE_ENV === 'production' ? require('../../cache/data').events : getSortedEventsData();
const currentlyActiveEvents = events.filter(event => {
    return isInTheFuture(event.endDate);
});

const findEvent = (query) => {
   return currentlyActiveEvents.find(event => {
      return event.id === query.id
   });
};

export default (req, res) => {
   let matchedEvent = {};

   if (req.query.id) {
      matchedEvent = findEvent(req.query, currentlyActiveEvents);
   }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(matchedEvent))
}
