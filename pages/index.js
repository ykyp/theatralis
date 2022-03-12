import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedEventsData } from '../lib/events'
import { Filter } from '../components/filter';
import { ListingEvent } from '../components/listing-event';
import { useState, useEffect, useRef } from 'react';
import { Paginator } from 'primereact/paginator';
import * as ga from '../lib/ga'
import React from "react";
import useTranslation from "next-translate/useTranslation";
import { ProgressSpinner } from 'primereact/progressspinner';
import {ISSERVER, useStateFromStorage} from "../components/session-storage-state";
import { Messages } from 'primereact/messages';

const SELECTED_CITY_KEY = 'th.selectedCity';
const SELECTED_CATEGORY_KEY = 'th.selectedCategory';
const SELECTED_PERIOD_KEY = 'th.selectedPeriod';
const SELECTED_FIRST_PAGE = 'th.firstPage';
const SELECTED_CURRENT_PAGE = 'th.currentPage';
const SELECTED_ITEMS_PER_PAGE = 'th.itemsPerPage';

export default function Home({ allEventsData }) {
   const covidMessage = useRef(null);
   const { t, lang } = useTranslation('common');
   const [results, setResults] = useState([]);
   const [selectedCity, setSelectedCity] = useStateFromStorage({name: 'AllCities', code: 'ALL'}, SELECTED_CITY_KEY);
   const [selectedPeriod, setSelectedPeriod] = useStateFromStorage({name: 'Anytime', code: 'ALL'}, SELECTED_PERIOD_KEY);
   const [selectedCategory, setSelectedCategory] = useStateFromStorage({name: 'AllCategories', code: 'ALL'}, SELECTED_CATEGORY_KEY);
   const [pageFirst, setPageFirst] = useStateFromStorage(0, SELECTED_FIRST_PAGE);
   const [currentPage, setCurrentPage] = useStateFromStorage(0, SELECTED_CURRENT_PAGE);
   const [rowsPerPage, setRowsPerPage] = useStateFromStorage(10, SELECTED_ITEMS_PER_PAGE);
   const [currentTotalCount, setCurrentTotalCount] = useState(allEventsData.length);
   const [isLoading, setLoading] = useState(true);

   const searchEndpoint = (city, period, category, page, rows) => `/api/search?city=${city}&period=${period}&category=${category}&page=${page}&rows=${rows}`;

   const clearAll = () => {
      setSelectedCity({name: 'AllCities', code: 'ALL'});
      setSelectedPeriod({name: 'Anytime', code: 'ALL'});
      setSelectedCategory({name: 'AllCategories', code: 'ALL'});
   };

   const handleCityChange = (e) => {
      setLoading(true);
      if(!ISSERVER) {
         sessionStorage.setItem(SELECTED_CITY_KEY, JSON.stringify(e.value));
      }
      setSelectedCity(e.value);
   };

   const handlePeriodChange = (e) => {
      setLoading(true);
      if(!ISSERVER) {
         sessionStorage.setItem(SELECTED_PERIOD_KEY, JSON.stringify(e.value));
      }
      setSelectedPeriod(e.value);
   };

   const handleCategoryChange = (e) => {
      setLoading(true);
      if(!ISSERVER) {
         sessionStorage.setItem(SELECTED_CATEGORY_KEY, JSON.stringify(e.value));
      }
      setSelectedCategory(e.value);
   };

   const onBasicPageChange = (event) => {
      setLoading(true);
      setCurrentPage(event.page); 
      setPageFirst(event.first);
      setRowsPerPage(event.rows);
      if(!ISSERVER) {
         sessionStorage.setItem(SELECTED_FIRST_PAGE, event.first);
         sessionStorage.setItem(SELECTED_CURRENT_PAGE, event.page);
         sessionStorage.setItem(SELECTED_ITEMS_PER_PAGE, event.rows);
      }
   };

   useEffect(() => {
      searchEvents();
   }, [selectedPeriod, selectedCity, selectedCategory, currentPage, rowsPerPage]);

   useEffect(() => {
         covidMessage.current.show([
            { severity: 'warn', summary: '', detail: t("covidNote"), sticky: true },
         ]);
   }, []);

   const searchEvents = () => {
      const query = {
         city:  selectedCity.code === 'ALL'? 'ALL' : selectedCity?.name,
         period: selectedPeriod.code,
         category:  selectedCategory.code === 'ALL'? 'ALL' : selectedCategory?.name,
         page: currentPage,
         rows: rowsPerPage,
      };
      fetch(searchEndpoint(query.city,
         query.period,
         query.category,
         query.page,
         query.rows))
         .then(res => res.json())
         .then(res => {
            setResults(() => res.results);
            setCurrentTotalCount(() => res.totalLength);
            setLoading(false);
         });

      ga.event({
         action: "search",
         params : {
            search_term: selectedCity.name + "-" + selectedPeriod.name + "-"+ selectedCategory.name
         }
      })
   };

   const translatedCity = t(""+selectedCity.name);
   const translatedPeriod = t(""+selectedPeriod.name);
   const translatedAudience = t(""+selectedCategory.name);


   return (
    <Layout home>
       <div className="w-full bg-gray-100">
          <div className="max-w-screen-xl pb-6 mx-auto ">
             <div  className="pb-2 pt-2">
                <Filter filterWidth={28}
                        onCityChange={handleCityChange}
                        selectedCity={selectedCity}
                        onPeriodChange={handlePeriodChange}
                        selectedPeriod={selectedPeriod}
                        onCategoryChange={handleCategoryChange}
                        selectedCategory={selectedCategory}
                />
             </div>

       {/*<h2 className={utilStyles.headingLg}>Search</h2>
       <Search />*/}

       <Messages style={{maxWidth: '787px'}} className="max-w-screen-xl mx-auto xs:text-xs sm:text-xs" ref={covidMessage}></Messages>

             { !isLoading &&
          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} m-auto `}
            style={{maxWidth: '787px'}}>
             {/*<Card className="pt-2 pb-5 pl-5 pr-5">*/}

              <div className={`xs:text-xs sm:text-xs text-md text-gray-500 xs:ml-2 sm:ml-2`} style={{marginTop: '0.6em'}}>
                 {t('found')} <span className="text-black">{currentTotalCount} </span>
                 {t('events-for')}

               {selectedCity && <span className="result-filter-container">
                  {'\u00A0'}{t('for-m')} {'\u00A0'}
                  <span className="text-black">{(translatedCity)}</span>
                  {selectedCity.code !== 'ALL' &&
                  <button aria-label="Clear filter" className="clear-button filter_clear" onClick={() => setSelectedCity({name: 'AllCities', code: 'ALL'})}></button> }
               </span>
               }
                ,{'\u00A0'}
                 <span className="result-filter-container">
                    <span className="text-black"> {" " + translatedPeriod} </span>
                    {selectedPeriod.code !== 'ALL' &&
                    <button aria-label="Clear filter" className="clear-button filter_clear" onClick={() => setSelectedPeriod({name: 'Anytime', code: 'ALL'})}></button> }
                 </span>,{'\u00A0'}
                 <span className="result-filter-container">
                    <span className="text-black">{translatedAudience}.</span>
                    {selectedCategory.code !== 'ALL' &&
                    <button aria-label="Clear filter" className="clear-button filter_clear" onClick={() => setSelectedCategory({name: 'AllCategories', code: 'ALL'})}></button> }
                 </span>
                 {(selectedCategory.code !== 'ALL' || selectedCity.code !== 'ALL' || selectedPeriod.code !== 'ALL') &&
                 <span className="result-filter-container">
                    {'\u00A0'}{t('clearAllFilters')}
                    <button aria-label="Clear filter" className="clear-button clearallfilters" onClick={clearAll}></button>
                 </span>}

              </div>
            {/* </Card>*/}
              {/* { results.length === 0 && <div>{t("noEventsFound")}</div> }*/}
              <div className={utilStyles.list}>
                {results.map((event, i) => (
                   <ListingEvent event={event} key={i} />
                ))}
              </div>
         </section>
       }

          { isLoading  &&
          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} m-auto flex `}
                                   style={{maxWidth: '787px'}}>
             <ProgressSpinner
                style={{width: '50px', height: '50px'}}
                strokeWidth="4"
                animationDuration="1s"/>
          </section>
          }

          </div>
          </div>
       <Paginator first={pageFirst}
                  rows={rowsPerPage}
                  totalRecords={currentTotalCount}
                  rowsPerPageOptions={[10, 20, 30]}
                  onPageChange={onBasicPageChange}>
       </Paginator>
       {/*<WelcomeDialog/>*/}
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
