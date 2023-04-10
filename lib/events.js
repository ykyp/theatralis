import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import {finishesSoon, isInTheFuture} from "../components/date";

const eventsDirectory = path.join(process.cwd(), 'events');

export function getSortedEventsData() {
  // Get file names under /events
  const fileNames = fs.readdirSync(eventsDirectory);
  const allEventsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(eventsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the event metadata section
    const matterResult = matter(fileContents);

    matterResult.data.startDate = matterResult.data.startDate.toString();
    matterResult.data.endDate = matterResult.data.endDate.toString();

    matterResult.data.finishesSoon = finishesSoon(matterResult.data.endDate);
    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  });

  // remove old events

  const currentlyActiveEvents = allEventsData.filter(event => {
    return isInTheFuture(event.endDate);
  });

  // Sort events by date
  return currentlyActiveEvents.sort((a, b) => {
    const dateA = new Date(Date.parse(a.endDate));
    const dateB =  new Date(Date.parse(b.endDate));
    return dateA.getTime() - dateB.getTime();
  })
}

export function getAllEventIds(locales) {
  const fileNames = fs.readdirSync(eventsDirectory);
  return fileNames.flatMap((fileName) => {
    const params = {
      id: fileName.replace(/\.md$/, ""),
    };

    return [
      { params },
      ...locales.map(locale => ({ params, locale })),
    ]
  });
}

export async function getEventData(id) {
  const fullPath = path.join(eventsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the event metadata section
  const matterResult = matter(fileContents);

  // get theatre md
  if (matterResult.data.theatres && matterResult.data.theatres.length > 0) {
    const theatres = matterResult.data.theatres.map(theatre => {
      const theatrePath = path.join(`${theatre.name}`);
      const theatrePathContents = fs.readFileSync(theatrePath, 'utf8');
      const theatrePathMatterResult = matter(theatrePathContents);
      return {...theatrePathMatterResult.data};
    });
    matterResult.data.theatresData = theatres;
  }

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  matterResult.data.startDate = matterResult.data.startDate.toString();
  matterResult.data.endDate = matterResult.data.endDate.toString();
  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
