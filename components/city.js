import React, {useEffect, useState} from "react";
import Layout from './layout'
import useTranslation from "next-translate/useTranslation";
import Head from 'next/head'
import {Filter} from "./filter";
import * as ga from "../lib/ga";
import utilStyles from "../styles/utils.module.css";
import {ListingEvent} from "./listing-event";
import {ProgressSpinner} from "primereact/progressspinner";
import {Paginator} from "primereact/paginator";
import {BackToHome} from "./navigation/backToHome";


export const City = (props) => {
   const { t } = useTranslation('common');

   const [results, setResults] = useState([]);

   const [selectedCity] = useState({name: props.name, code: props.code});
   const [selectedPeriod, setSelectedPeriod] = useState({name: 'Anytime', code: 'ALL'});
   const [selectedCategory, setSelectedCategory] = useState({name: 'AllCategories', code: 'ALL'});
   const [pageFirst, setPageFirst] = useState(0);
   const [currentPage, setCurrentPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [currentTotalCount, setCurrentTotalCount] = useState(0);
   const [isLoading, setLoading] = useState(true);

   const searchEndpoint = (city, period, category, page, rows, q) => `/api/search?city=${city}&period=${period}&category=${category}&page=${page}&rows=${rows}&q=${q || ''}`;

   const handlePeriodChange = (e) => {
      setLoading(true);
      setSelectedPeriod(e.value);
   };

   const handleCategoryChange = (e) => {
      setLoading(true);
      setSelectedCategory(e.value);
   };

   const onBasicPageChange = (event) => {
      setCurrentPage(event.page);
      setPageFirst(event.first);
      setRowsPerPage(event.rows);
   };

   useEffect(() => {
      searchEvents();
   }, [selectedPeriod, selectedCity, selectedCategory, currentPage, rowsPerPage]);

   const searchEvents = () => {
      const query = {
         city:  selectedCity?.name,
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

   return (
      <Layout description="About Theatralis">
         <Head>
            <title>Theatralis - Theatro {props.name}</title>
         </Head>

         <header className="max-w-screen-xl text-center mx-auto object-center">
            <div className="hero-image-2 px-0 hero-image-small">
            </div>
         </header>

         <section className="th-hero ">
            <div className="th-hero-inner">
               <h1>{t("cityTitle")} - {t(props.name)}</h1>
               <h2>{t("citySubtitle")}  {t(props.name)}</h2>
               <div  className="pb-2 pt-2 filter-container">
                  <Filter filterWidth={40}
                          onPeriodChange={handlePeriodChange}
                          selectedPeriod={selectedPeriod}
                          onCategoryChange={handleCategoryChange}
                          selectedCategory={selectedCategory}
                  />
               </div>
            </div>
         </section>

         <div className="w-full bg-gray-100">
            <div className="max-w-screen-xl pb-6 mx-auto ">
               { !isLoading &&
               <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} m-auto `}
                        style={{maxWidth: '787px'}}>
                  <h3 className={`${utilStyles.headingLg} formatted-h3`} style={{marginTop: '0.6em'}}>
                     {/*
                 {" " + translatedPeriod.toLowerCase()} {t('for-m')} {translatedAudience.toLowerCase()}*/}</h3>
                  { results.length === 0 && <div>{t("noEventsFound")}</div> }
                  <div className={utilStyles.list}>
                     {results.map((event) => (
                        <ListingEvent event={event} key={event.title} />
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



               <Paginator className="bg-gray-100"
                          first={pageFirst}
                          rows={rowsPerPage}
                          totalRecords={currentTotalCount}
                          rowsPerPageOptions={[10, 20, 30]}
                          onPageChange={onBasicPageChange}>
               </Paginator>
            </div>
         </div>
      </Layout>
   );
};
