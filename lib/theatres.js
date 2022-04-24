import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const theatresDirectories = path.join(process.cwd(), 'theatres');

export function getSortedVenuesData() {
  // Get file names under /events
  const fileNames = fs.readdirSync(theatresDirectories);
  const allVenues = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(theatresDirectories, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the event metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  });

  return allVenues;
}

export function getAllVenuesIds(locales) {
  const fileNames = fs.readdirSync(theatresDirectories);
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

export async function getVenueData(id) {
  const fullPath = path.join(theatresDirectories, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the event metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
