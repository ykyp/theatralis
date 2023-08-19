import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedEventsData } from '../lib/events'
import {
    categories,
    cities,
    Filter,
    getCategoryByCode,
    getCityByName,
    getPeriodByCode,
    periods
} from '../components/filter';
import { ListingEvent } from '../components/listing-event';
import {useState, useEffect, useRef} from 'react';
import * as ga from '../lib/ga'
import React from "react";
import useTranslation from "next-translate/useTranslation";
import { ProgressSpinner } from 'primereact/progressspinner';
import { useRouter } from "next/router";
import {Flex, Pagination, Select} from '@mantine/core';
import {CalendarFilter} from "../components/CalendarFilter";

const DEFAULT_PAGE_ITEMS = 10;

export default function Home({ allEventsData }) {
   const {t, lang} = useTranslation('common');
   const router = useRouter();
   const { pathname, query } = router
   const [results, setResults] = useState(allEventsData.slice(0, DEFAULT_PAGE_ITEMS));
   const [searchBy, setSearchBy] = useState(router.query.q || '');
   const [selectedCity, setSelectedCity] = useState(getCityByName(router.query.city) || cities[0]);
   const [selectedPeriod, setSelectedPeriod] = useState(getPeriodByCode(router.query.period) || periods[0]);
   const [selectedCategory, setSelectedCategory] = useState(getCategoryByCode(router.query.category) || categories[0]);
   const [currentTotalCount, setCurrentTotalCount] = useState(allEventsData.length);
   const [isLoading, setLoading] = useState(false);
   const initialLoadRef = useRef(true); // Keep track of initial load
   const [activePaginationHandler, setActivePaginationHandler] = useState(false);
   const searchEndpoint = (city, period, category, date, page, rows, q) => `/api/search?city=${city}&period=${period}&category=${category}&date=${date}&page=${page}&rows=${rows}&q=${q}`;

   if (router.query.source && router.query.source === "flyer") {
      ga.event({
         action: "flyer-visit",
      })
   }

   const clearAll = () => {
      delete router.query.city;
      delete router.query.category;
      delete router.query.q;
      delete router.query.period;
      delete router.query.page;
      delete router.query.rows;
      delete router.query.date;
      router.replace({ pathname, query }, undefined, { shallow: true });
   };

   const clearCity = () => {
      delete router.query.city;
      router.replace({ pathname, query }, undefined, { shallow: true });
   };

   const clearPeriod = () => {
      delete router.query.period;
       delete router.query.date;
      router.replace({ pathname, query }, undefined, { shallow: true });
   };

   const clearCategory = () => {
      delete router.query.category;
      router.replace({ pathname, query }, undefined, { shallow: true });
   };

   const clearSearch = () => {
      delete router.query.q;
      router.replace({ pathname, query }, undefined, { shallow: true });
   };


   const handleCityChange = (e) => {
      router.push({
             pathname: '/',
             query: {
                ...router.query,
                city:e.value.name,
                 page:1
             }
          },
      )
   };

   const handlePeriodChange = (e) => {
       delete router.query.date;
      router.push({
             pathname: '/',
             query: {
                ...router.query,
                period:e.value.code,
                 page:1
             }
          },
      )
   };

   const handleCategoryChange = (e) => {
      router.push({
             pathname: '/',
             query: {
                ...router.query,
                category:e.value.code,
                 page:1
             }
          },
      )
   };

   const onBasicPageChange = (currentPage) => {
      router.push({
             pathname: '/',
             query: {
                ...router.query,
                page:currentPage,
                rows: 10,
             }
             },
      )
   };

   const handleSearchChange = (e) => {
      router.push({
             pathname: '/',
             query: {
                ...router.query,
                 page:1,
                q:e,
             }
          },
      )
   };

    const handleRowsChange = (value) => {
        router.push({
                pathname: '/',
                query: {
                    ...router.query,
                    page:1,
                    rows:value,
                }
            },
        )
    };

   useEffect(() => {
       // Skip execution on first load
       if (initialLoadRef.current) {
           initialLoadRef.current = false;
           return;
       }
       searchEvents();
       setSelectedCategory(getCategoryByCode(router.query.category) || categories[0]);
       setSelectedPeriod(getPeriodByCode(router.query.period) || periods[0]);
       setSelectedCity(getCityByName(router.query.city) || cities[0]);
       setSearchBy(router.query.q);
   }, [router.query]);

   const searchEvents = () => {
      const query = {
         city:  router.query.city || 'ALL',
         period: router.query.period || 'ALL',
         category:  router.query.category || 'ALL',
          date: router.query.date || undefined,
          page:  router.query.page-1 || 0,
          rows:  router.query.rows || DEFAULT_PAGE_ITEMS,
         q: searchBy
      };
      setLoading(true);
      fetch(searchEndpoint(query.city,
         query.period,
         query.category,
          query.date,
          query.page,
          query.rows,
         query.q))
         .then(res => res.json())
         .then(res => {
            setResults(() => res.results);
            if (currentTotalCount !== res.totalLength) {
               setCurrentTotalCount(() => res.totalLength);
            }
            setLoading(false);
         }).catch((error) => {
          console.log("Error fetching events, please refresh", error);
          setLoading(false);
      });

      ga.event({
         action: "search",
         params : {
            search_term: selectedCity.name + "-" + selectedPeriod.name + "-"+ selectedCategory.name + "-"+ searchBy
         }
      })
   };

   const translatedCity = t(""+selectedCity.name);
   const translatedPeriod = t(""+selectedPeriod.name);
   const translatedAudience = t(""+selectedCategory.name);

   return (
    <Layout home onSearchChange={handleSearchChange} searchBy={searchBy}>
       <div className="w-full bg-gray-100">
           <CalendarFilter/>
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

             { !isLoading &&
          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} m-auto `}
            style={{maxWidth: '787px'}}>
             {/*<Card className="pt-2 pb-5 pl-5 pr-5">*/}

              <div className={`xs:text-xs sm:text-xs text-md text-gray-500 xs:ml-2 sm:ml-2`} style={{marginTop: '0.6em'}}>
                 {t('found')} <span className="highlight-green">{currentTotalCount} </span>
                 {t('events-for')}
                 {searchBy && <span className="result-filter-container ">
                  {'\u00A0'} {t("withTitle")} {'\u00A0'}
                    <span className=" text-2xl brand-red bg-white">"{(searchBy)}"</span>

                    <button aria-label="Clear filter" className="clear-button filter_clear" onClick={() => clearSearch()}></button>
               </span>
                 }
                 ,

               {selectedCity && <span className="result-filter-container">
                  {'\u00A0'}{t('at')} {'\u00A0'}
                  <span className={selectedCity.code !== 'ALL' ? 'highlight' : `text-black`}>{(translatedCity)}</span>
                  {selectedCity.code !== 'ALL' &&
                  <button aria-label="Clear filter" className="clear-button filter_clear" onClick={() => clearCity()}></button> }
               </span>
               }
                ,{'\u00A0'}
                 <span className="result-filter-container">
                    <span className={router.query.date || selectedPeriod.code !== 'ALL' ? 'highlight' : `text-black`}> {router.query.date ? router.query.date :" " + translatedPeriod } </span>
                    {(selectedPeriod.code !== 'ALL' || router.query.date) &&
                    <button aria-label="Clear filter" className="clear-button filter_clear" onClick={() => clearPeriod()}></button> }
                 </span>,{'\u00A0'}
                 <span className="result-filter-container">
                    <span  className={selectedCategory.code !== 'ALL' ? 'highlight' : `text-black`}>{translatedAudience}.</span>
                    {selectedCategory.code !== 'ALL' &&
                    <button aria-label="Clear filter" className="clear-button filter_clear" onClick={() => clearCategory()}></button> }
                 </span>
                 {(selectedCategory.code !== 'ALL' || selectedCity.code !== 'ALL' || selectedPeriod.code !== 'ALL') &&
                 <span className="result-filter-container">
                    {'\u00A0'}{t('clearAllFilters')}
                    <button aria-label="Clear filter" className="clear-button clearallfilters" onClick={clearAll}></button>
                 </span>}

              </div>
            {/* </Card>*/}
              {/* { results.length === 0 && <div>{t("noEventsFound")}</div> }*/}
              <div >
                {results.map((event, i) => (
                   <ListingEvent event={event}
                                 key={i}
                   />
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

        <Flex className="mt-4" justify={"center"}>

        <Pagination value={router.query.page? Number(router.query.page):1}
                    defaultValue={1}
                    onChange={onBasicPageChange}
                    position="center"
                    radius="lg"
                    withEdges
                    total={Math.ceil(currentTotalCount / (router.query.rows ? Number(router.query.rows) : DEFAULT_PAGE_ITEMS))} />

            <Select
                placeholder="Rows per page"
                ml={20}
                w={80}
                value={router.query.rows || DEFAULT_PAGE_ITEMS.toString()}
                onChange={handleRowsChange}
                data={[
                    { value: DEFAULT_PAGE_ITEMS.toString(), label: '10' },
                    { value: '20', label: '20' },
                    { value: '30', label: '30' },
                    { value: '40', label: '40' },
                ]}
            />

        </Flex>


    </Layout>
  )
}

export async function getStaticProps() {
  const allEventsData = getSortedEventsData();
  return {
    props: {
      allEventsData: allEventsData,
    },
      revalidate: 120, // In seconds
  }
}
