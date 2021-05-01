import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedEventsData } from '../lib/events'
import Link from 'next/link'
import FormattedDate from '../components/date'
import { Filter } from '../components/filter';
import { useState, useEffect } from 'react';
import { Paginator } from 'primereact/paginator';

export default function Home({ allEventsData }) {
   const [results, setResults] = useState([]);
   const [selectedCity, setSelectedCity] = useState({ name: 'Anywhere', code: 'ALL' });
   const [selectedPeriod, setSelectedPeriod] = useState({ name: 'Anytime', code: 'ALL' });
   const [selectedAudience, setSelectedAudience] = useState({ name: 'Everyone', code: 'ALL' });
   const [pageFirst, setPageFirst] = useState(0);
   const [currentPage, setCurrentPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [currentTotalCount, setCurrentTotalCount] = useState(allEventsData.length);

   const searchEndpoint = (city, period, audience, page, rows) => `/api/search?city=${city}&period=${period}&audience=${audience}&page=${page}&rows=${rows}`;

   const handleCityChange = (e) => {
      setSelectedCity(e.value);
   };

   const handlePeriodChange = (e) => {
      setSelectedPeriod(e.value);
   };

   const handleAudienceChange = (e) => {
      setSelectedAudience(e.value);
   };

   const onBasicPageChange = (event) => {
      setCurrentPage(event.page); 
      setPageFirst(event.first); 
      setRowsPerPage(event.rows);
   };

   useEffect(() => {
      searchEvents();
   }, [selectedPeriod, selectedCity, selectedAudience, currentPage]);

   const searchEvents = () => {
      const query = {
         city:  selectedCity.code === 'ALL'? 'ALL' : selectedCity.name,
         period: selectedPeriod.code,
         audience:  selectedAudience.code === 'ALL'? 'ALL' : selectedAudience.name,
         page: currentPage,
         rows: rowsPerPage,
      };
      fetch(searchEndpoint(query.city,
         query.period,
         query.audience,
         query.page,
         query.rows))
         .then(res => res.json())
         .then(res => {
            setResults(res.results);
            setCurrentTotalCount(res.totalLength);
         });
   };

   return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.textAlignCenter}`}>
        <h2>Find all theatre events in Cyprus</h2>
      </section>

       <Filter onCityChange={handleCityChange}
               selectedCity={selectedCity}
               onPeriodChange={handlePeriodChange}
               selectedPeriod={selectedPeriod}
               onAudienceChange={handleAudienceChange}
               selectedAudience={selectedAudience}
       />


       {/*<h2 className={utilStyles.headingLg}>Search</h2>
       <Search />*/}

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Events {selectedCity && `in ${selectedCity.name}`}</h2>
         { results.length === 0 && <div>No Events found.</div> }
        <ul className={utilStyles.list}>
          {results.map(({ id, startDate, endDate, title, city, event_image }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/events/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                 {city}, {/*<FormattedDate dateString={startDate} /> - <FormattedDate dateString={endDate} />*/}
              </small>
               { event_image && <img width={35} height={35} src={event_image}/> }
            </li>
          ))}
        </ul>
      </section>

       <Paginator first={pageFirst}
                  rows={rowsPerPage}
                  totalRecords={currentTotalCount}
                  rowsPerPageOptions={[10, 20, 30]}
                  onPageChange={onBasicPageChange}>
       </Paginator>
    </Layout>
  )
}

export async function getStaticProps() {
  const allEventsData = getSortedEventsData();
  return {
    props: {
      allEventsData: allEventsData,
    }
  }
}
