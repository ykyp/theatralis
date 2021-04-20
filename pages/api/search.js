import { getSortedPostsData } from '../../lib/posts'
import { parseISO } from 'date-fns'

const posts = process.env.NODE_ENV === 'production' ? require('../../cache/data').posts : getSortedPostsData();

const isBetween = (date, min, max) => (date.getTime() >= min.getTime() && date.getTime() <= max.getTime());

const intersect = (a, b) => {
   return a.filter(Set.prototype.has, new Set(b));
};

export default (req, res) => {
   let results = [];
  console.log("posts", posts);
   if (req.query.city === 'ALL') {
      results = posts;
   } else {
      const matchingCities = req.query.city !== 'ALL' ?
         posts.filter(post => post.city.toLowerCase().includes(req.query.city.toLowerCase())) : posts;

      let matchingPeriods = [];
      switch (req.query.period) {
         case 'ALL':
            matchingPeriods = posts;
            break;
         case 'THIS_WEEK':
            matchingPeriods = posts.filter(post =>
               isBetween(new Date(), parseISO(post.startDate), parseISO(post.endDate)));
            break;
         case 'NEXT_WEEK':
            matchingPeriods = posts;
            break;
         case 'THIS_MONTH':
            matchingPeriods = posts;
            break;
         default:
            matchingPeriods = posts;
      }
      results = intersect(matchingCities, matchingPeriods);
   }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results }))
}
