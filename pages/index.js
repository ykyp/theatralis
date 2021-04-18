import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { Filter } from '../components/filter';
import {useState} from "react";

export default function Home({ allPostsData }) {
   const [results, setResults] = useState(allPostsData);

   const searchEndpoint = (query) => `/api/search?q=${query}`;

   const handleCityChange = (e) => {
      fetch(searchEndpoint(e.value.name))
         .then(res => res.json())
         .then(res => {
            setResults(res.results);
         })

   };

   return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Browse all theatre events in Cyprus</p>
      </section>

       <Filter onCityChange={handleCityChange} />


       {/*<h2 className={utilStyles.headingLg}>Search</h2>
       <Search />*/}

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Events</h2>
         { results.length === 0 && <div>No Events found.</div> }
        <ul className={utilStyles.list}>
          {results.map(({ id, date, title, city }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
               {city}
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}
