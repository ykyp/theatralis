const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function eventData() {
   const eventsDirectory = path.join(process.cwd(), 'events');
   const fileNames = fs.readdirSync(eventsDirectory);
   const events = fileNames.map(fileName => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(eventsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      return {
         id,
         title: matterResult.data.title,
         startDate: matterResult.data.startDate,
         endDate: matterResult.data.endDate,
         city: matterResult.data.city,
         audience: matterResult.data.audience,
         event_image: matterResult.data.event_image,
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
