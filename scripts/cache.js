const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const dateutils = require( "date-fns");


function finishesSoon(dateString) {
   const asDate = new Date(dateString);
   const today = new Date();
   const todayYear = today.getFullYear();
   const asDateYear = asDate.getFullYear();

   const weeksBetween = dateutils.getISOWeek(asDate) - dateutils.getISOWeek(today);

   return todayYear === asDateYear && weeksBetween >= 0 && weeksBetween <= 2;
}

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
         cover_image: matterResult.data.cover_image,
         gallery_1: matterResult.data.gallery_1,
         gallery_2: matterResult.data.gallery_2,
         gallery_3: matterResult.data.gallery_3,
         category: matterResult.data.category,
         finishesSoon: finishesSoon(matterResult.data.endDate),
      }
   });

   console.log(events);
   const sortedEvents = events.sort((a, b) => {
      return new Date(b.endDate) - new Date(a.endDate);
   });
   return `export const events = ${JSON.stringify(sortedEvents)}`
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
