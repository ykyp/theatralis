import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedEventsData } from '../lib/events'
import Link from 'next/link'
import FormattedDate from '../components/date'
import { Filter } from '../components/filter';
import { ListingEvent } from '../components/listing-event';
import { useState, useEffect } from 'react';
import { Paginator } from 'primereact/paginator';
import * as ga from '../lib/ga'
import React from "react";

const SELECTED_CITY_KEY = 'th.selectedCity';
const SELECTED_AUDIENCE_KEY = 'th.selectedAudience';
const SELECTED_PERIOD_KEY = 'th.selectedPeriod';

function useStickyState(defaultValue, key) {
   const [value, setValue] = useState(defaultValue);

   useEffect(() => {
      const stickyValue = window.localStorage.getItem(key);

      if (stickyValue !== null) {
         setValue(JSON.parse(stickyValue));
      }
   }, [key]);

   useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
   }, [key, value]);

   return [value, setValue];
}

export default function Home({ allEventsData }) {
   const [results, setResults] = useState([]);
   const [selectedCity, setSelectedCity] = useStickyState({ name: 'All Cities', code: 'ALL' }, SELECTED_CITY_KEY);
   const [selectedPeriod, setSelectedPeriod] = useStickyState( { name: 'Anytime', code: 'ALL' }, SELECTED_PERIOD_KEY);
   const [selectedAudience, setSelectedAudience] =  useStickyState( { name: 'Everyone', code: 'ALL' }, SELECTED_AUDIENCE_KEY);
   const [pageFirst, setPageFirst] = useState(0);
   const [currentPage, setCurrentPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [currentTotalCount, setCurrentTotalCount] = useState(allEventsData.length);

   const searchEndpoint = (city, period, audience, page, rows) => `/api/search?city=${city}&period=${period}&audience=${audience}&page=${page}&rows=${rows}`;

   const handleCityChange = (e) => {
      localStorage.setItem(SELECTED_CITY_KEY, JSON.stringify(e.value));
      setSelectedCity(e.value);
   };

   const handlePeriodChange = (e) => {
      localStorage.setItem(SELECTED_PERIOD_KEY, JSON.stringify(e.value));
      setSelectedPeriod(e.value);
   };

   const handleAudienceChange = (e) => {
      localStorage.setItem(SELECTED_AUDIENCE_KEY, JSON.stringify(e.value));
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

      ga.event({
         action: "search",
         params : {
            search_term: selectedCity.code
         }
      })
   };

   return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

       <div className="w-full bg-gray-100">
          <div className="max-w-screen-xl pb-6 mx-auto ">


             <div  className="brand-yellow-bck pb-4">
       <Filter onCityChange={handleCityChange}
               selectedCity={selectedCity}
               onPeriodChange={handlePeriodChange}
               selectedPeriod={selectedPeriod}
               onAudienceChange={handleAudienceChange}
               selectedAudience={selectedAudience}
       />
             </div>

       {/*<h2 className={utilStyles.headingLg}>Search</h2>
       <Search />*/}

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} m-auto `}
               style={{'max-width': '874px'}}>
        <h3 className={`${utilStyles.headingLg} formatted-h3`} style={{marginTop: '0.6em'}}>
           Events {selectedCity && `in ${selectedCity.name}`}, {selectedPeriod.name.toLowerCase()} for {selectedAudience.name.toLowerCase()}</h3>
         { results.length === 0 && <div>No Events found.</div> }
        <div className={utilStyles.list}>
          {results.map((event) => (
             <ListingEvent event={event} />
          ))}
        </div>
      </section>


          </div>
          </div>
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
