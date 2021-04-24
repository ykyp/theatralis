import { getSortedPostsData } from '../../lib/posts'
import { isInThisWeek, isInNextWeek, isInThisMonth } from '../../components/date'
import { intersection } from 'lodash';

const posts = process.env.NODE_ENV === 'production' ? require('../../cache/data').posts : getSortedPostsData();


export default (req, res) => {
   let results = [];
   if (req.query.city === 'ALL' && req.query.period == 'ALL'
      && req.query.audience == 'ALL') {
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

      const matchingAudience = req.query.audience !== 'ALL' ?
         posts.filter(post =>  req.query.audience.toLowerCase() === "children" ?
            post.audience.toLowerCase() === "children" :
            post.audience.toLowerCase() ===
            req.query.audience.toLowerCase() ||
            post.audience.toLowerCase() === 'all')
         : posts;

      results = intersection(matchingCities, matchingPeriods, matchingAudience);
   }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results }))
}
