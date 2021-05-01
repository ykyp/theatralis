import { getSortedPostsData } from '../../lib/posts'
import { isInThisWeek, isInNextWeek, isInThisMonth } from '../../components/date'
import { intersection } from 'lodash';

const posts = process.env.NODE_ENV === 'production' ? require('../../cache/data').posts : getSortedPostsData();

const paginateResults = (results, query) => {
  const page = query.page || 1;
  const rows = query.rows || 10;
  const offset = (page - 1) * rows;
  const paginatedResults = results.slice(offset).slice(0, rows);
  return paginatedResults;
};

export default (req, res) => {
   let results = [];
   let totalLength = 0;
   if (req.query.city === 'ALL' && req.query.period == 'ALL'
      && req.query.audience == 'ALL') {
      totalLength = posts.length;
      results =  paginateResults(posts, req.query);
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

      const matchingAudience = req.query.audience !== 'ALL' ?
         posts.filter(post =>  req.query.audience.toLowerCase() === "children" ?
            post.audience.toLowerCase() === "children" :
            post.audience.toLowerCase() ===
            req.query.audience.toLowerCase() ||
            post.audience.toLowerCase() === 'all')
         : posts;

      const intersectedResults = intersection(matchingCities, matchingPeriods, matchingAudience);
      totalLength = intersectedResults.length;
      results = paginateResults(intersectedResults, req.query);
   }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results, totalLength }))
}
