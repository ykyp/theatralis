const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');


function finishesSoon(dateString) {
   const asDate = new Date(dateString);
   const today = new Date();
   const todayYear = today.getFullYear();
   const asDateYear = asDate.getFullYear();

   const oneWeekAhead = new Date();
   oneWeekAhead.setDate(today.getDate() + 7);

   return todayYear === asDateYear && oneWeekAhead >= asDate;
}

function eventData() {
   const eventsDirectory = path.join(process.cwd(), 'events');
   const fileNames = fs.readdirSync(eventsDirectory);
   const events = fileNames.map(fileName => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(eventsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      // if (matterResult.data.theatres && matterResult.data.theatres.length > 0) {
      //    const theatres = matterResult.data.theatres.map(theatre => {
      //       const theatrePath = path.join(`${theatre}`);
      //       const theatrePathContents = fs.readFileSync(theatrePath, 'utf8');
      //       const theatrePathMatterResult = matter(theatrePathContents);
      //       return {...theatrePathMatterResult.data};
      //    });
      //    matterResult.data.theatresData = theatres;
      // }
      return {
         id,
         title: matterResult.data.title,
         startDate: matterResult.data.startDate,
         endDate: matterResult.data.endDate,
         city: matterResult.data.city,
         audience: matterResult.data.audience,
         event_image: matterResult.data.event_image,
         cover_image: matterResult.data.cover_image,
         gallery_images: matterResult.data.gallery_images,
         gallery_1: matterResult.data.gallery_1,
         gallery_2: matterResult.data.gallery_2,
         gallery_3: matterResult.data.gallery_3,
         category: matterResult.data.category,
         finishesSoon: finishesSoon(matterResult.data.endDate),
         extended: matterResult.data.extended,
         nicosia_dates: matterResult.data.nicosia_dates,
         limassol_dates: matterResult.data.limassol_dates,
         larnaca_dates: matterResult.data.larnaca_dates,
         famagusta_dates: matterResult.data.famagusta_dates,
         paphos_dates: matterResult.data.paphos_dates,
         // theatresData: matterResult.data.theatresData
      }
   });

   const sortedEvents = events.sort((a, b) => {
      return new Date(a.endDate) - new Date(b.endDate);
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
