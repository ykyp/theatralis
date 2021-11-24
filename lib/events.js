import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import {format} from "date-fns";

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

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  });
  // Sort events by date
  return allEventsData.sort((a, b) => {
    //console.log("B unformatted date ", b.startDate);
    //console.log("A unformatted date ", a.startDate);
    const dateA = new Date(Date.parse(a.startDate));
    const dateB =  new Date(Date.parse(b.startDate));
    //console.log("dateB", dateB);
    //console.log("dateA", dateA);
    const fomattedA = format(dateA, 'MM/dd/yyyy');
    const fomattedB = format(dateB, 'MM/dd/yyyy');
    /*console.log("B getDate", dateB.getDate());
    console.log("A getDate", dateA.getDate());
    console.log("DB", new Date(dateB.getFullYear(),  dateB.getMonth(), dateB.getDate()));
    console.log("DA", new Date(dateA.getFullYear(),  dateA.getMonth(), dateA.getDate()));

    console.log("B TIME", dateB.getTime());
    console.log("A TIME", dateA.getTime());
    console.log("COMPARE", dateB.getTime() - dateA.getTime());*/

    return dateB.getTime() - dateA.getTime();
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
