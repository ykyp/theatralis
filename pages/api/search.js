import { getSortedPostsData } from '../../lib/posts'

const posts = process.env.NODE_ENV === 'production' ? require('../../cache/data').posts : getSortedPostsData();

export default (req, res) => {
   let results = [];
  console.log("posts", posts);
   if (req.query.q === 'ALL') {
      results = posts;
   } else {
      results = req.query.q ?
         posts.filter(post => post.title.toLowerCase().includes(req.query.q) ||
            post.city.toLowerCase().includes(req.query.q.toLowerCase())) : [];
   }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ results }))
}
