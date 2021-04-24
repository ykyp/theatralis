import { getSortedPostsData } from '../../lib/posts'
import { isInThisWeek, isInNextWeek, isInThisMonth } from '../../components/date'

const posts = process.env.NODE_ENV === 'production' ? require('../../cache/data').posts : getSortedPostsData();

const intersect = (a, b) => {
   return a.filter(Set.prototype.has, new Set(b));
};

export default (req, res) => {
   let results = [];
   if (req.query.city === 'ALL' && req.query.period == 'ALL') {
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
               isInThisWeek(post.startDate, post.endDate));
            break;
         case 'NEXT_WEEK':
            matchingPeriods = posts.filter(post =>
               isInNextWeek(post.startDate, post.endDate));
            break;
         case 'THIS_MONTH':
            matchingPeriods = posts.filter(post =>
               isInThisMonth(post.startDate, post.endDate));
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
