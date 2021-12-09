import styled from 'styled-components'
import Link from 'next/link'
import { Card } from 'primereact/card';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import React from 'react';
import {formatDate} from "./date";
import { useRouter } from 'next/router';

const FiltersContainer = styled.section`
      display: flex;
      justifyContent: normal;      
   `;

const WithMargin = styled.div`
      margin-left: 25px;      
   `;

/*
* {/*<div className={utilStyles.listItem} key={id}>
         <Link href={`/events/${id}`}>
            <a>{title}</a>
         </Link>
         <br />
         <small className={utilStyles.lightText}>
            {city}, <FormattedDate dateString={startDate} /> - <FormattedDate dateString={endDate} />
         </small>
         { event_image && <img width={35} height={35} src={event_image}/> }
      </div>*/
export const ListingEvent = (props) => {
   const { t, lang } = useTranslation('common');
   const { id, startDate, endDate, title, city, event_image, category } = props.event;
   const router = useRouter();

   const translatedKeys = (keysAsString) => {
      const keys = keysAsString.split(",").map(c => c.trim());
      const tKeys = keys.map(city => {
         const key = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
         return t(""+ key);
      });

      return tKeys.join(", ");
   };

   return (
      <>
      <div className="th-card-container md:mx-auto lg:mx-auto xl:mx-auto 2xl:mx-auto bg-white rounded-md shadow-md overflow-hidden border-bottom-red m-4 sm:m-4 xs:m-2">
         <div className="flex">
            <div className="flex-shrink-0" style={{cursor: 'pointer'}} onClick={() => router.push(`/events/${id}`)}>
               { event_image ?
                  <img className="h-36 sm:h-36 xs:h-32 object-cover w-48 sm:w-48 xs:w-28"
                    src={event_image}
                    alt={title}/> :
                  <img className=" sm:h-36 xs:h-32 h-full w-48 sm:w-48 xs:w-28"
                       src="/images/th-200x150.png"
                       alt={title}/> }

            </div>
            <div className="pt-3 sm:pt-3 xs:pt-1 pl-8 sm:pl-8 xs:pl-2 pr-8 sm:pr-8 xs:pr-4 pb-6 sm:pb-6 xs:pb-2">
               <div className="uppercase tracking-wide text-sm xs:text-xs brand-red font-semibold">
                  <h3  className="formatted-h3 xs:text-sm md:text-base lg:text-base">
                     <Link  href={`/events/${id}`}>
                        <a className='brand-red uppercase xs:text-sm '>{title}</a>
                     </Link>
                  </h3>
               </div>
               <div className="mt-2 text-gray-500">
                  <div className="mt-1 xs:text-sm text-sm sm:text-sm  xs:mobile-card-text flex items-center">
                     <i className="pi pi-calendar th-icon"></i>
                     <div className="th-icon-text">{formatDate(startDate)} - {formatDate(endDate)}</div>
                  </div>

                  {category &&
                  <div className="mt-1 xs:text-sm text-sm sm:text-sm xs:mobile-card-text flex items-center">
                     <i className="pi pi-tag th-icon"></i>
                     <div className="xs:th-icon-text">{translatedKeys(category)}</div>
                  </div>
                  }
                  <div className="mt-1 xs:text-sm text-sm sm:text-sm xs:mobile-card-text flex items-center">
                     <i className="pi pi-map-marker th-icon"></i>
                     <div className="xs:th-icon-text">{translatedKeys(city)}</div>
                  </div></div>
            </div>
            {/*<p className="read-more">
               <a href={`/events/${id}`}>{t("readMore")}</a>
            </p>*/}
         </div>

      </div>

      {/*<Card style={{ width: '100%',
         marginBottom: '1em',
         borderBottom: '2px solid #780811'
      }}>

         <div className="grid grid-cols-3">
         <div className="flex flex-nowrap">
            <div style={{cursor: 'pointer'}} onClick={() => router.push(`/events/${id}`)}>
               { event_image ?
                  <img width={200}
                       className="object-cover"
                       height={150}
                       style={{ margin: 'auto'}}
                       src={event_image}/> :
                  <img width={200}
                       height={150}
                       className=""
                       style={{ margin: 'auto'}}
                       src="/images/theatralis-sm-white.png"/>}
            </div>

            <div className="p-col-8 pt-3 pl-8 pr-8 pb-8" style={{lineHeight: '1.5'}}>
               <h3  className="formatted-h3">
                  <Link  href={`/events/${id}`}>
                     <a className='brand-red uppercase'>{title}</a>
                  </Link>
               </h3>
               <div className="p-card-subtitle md:text-sm  sm:mobile-card-text flex items-center">
                  <i className="pi pi-calendar th-icon"></i>
                  <div className="th-icon-text">{formatDate(startDate)} - {formatDate(endDate)}</div>
               </div>
               {category &&
                  <div className="p-card-subtitle md:text-sm  sm:mobile-card-text flex items-center">
                     <i className="pi pi-tag th-icon"></i>
                     <div className="th-icon-text">{translatedKeys(category)}</div>
                  </div>
               }
               <div className="p-card-subtitle md:text-sm  sm:mobile-card-text flex items-center">
                  <i className="pi pi-map-marker th-icon"></i>
                  <div className="th-icon-text">{translatedKeys(city)}</div>
               </div>
            </div>

         </div>
      </Card>*/}
      </>
   );
};
