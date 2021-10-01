import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

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

    // Combine the data with the id
    matterResult.data.startDate = matterResult.data.startDate.toString();
    matterResult.data.endDate = matterResult.data.endDate.toString();

    return {
      id,
      ...matterResult.data
    }
  });
  // Sort events by date
  return allEventsData.sort((a, b) => {
    return new Date(b.startDate) - new Date(a.startDate);
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
