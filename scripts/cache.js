const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function eventData() {
   const postsDirectory = path.join(process.cwd(), 'events');
   const fileNames = fs.readdirSync(postsDirectory);
   const events = fileNames.map(fileName => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      return {
         id,
         title: matterResult.data.title,
         startDate: matterResult.data.startDate,
         endDate: matterResult.data.endDate,
         city: matterResult.data.city,
         audience: matterResult.data.audience,
      }
   });
   return `export const events = ${JSON.stringify(events)}`
}

try {
   fs.readdirSync('cache')
} catch (e) {
   fs.mkdirSync('cache')
}

fs.writeFile('cache/data.js', eventData(), function (err) {
   if (err) return console.log(err);
   console.log('Events cached.');
});
