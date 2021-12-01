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
      <div className="th-card-container mx-auto bg-white rounded-md shadow-md overflow-hidden border-bottom-red m-4">
         <div className="md:flex">
            <div className="md:flex-shrink-0" style={{cursor: 'pointer'}} onClick={() => router.push(`/events/${id}`)}>
               { event_image ?
                  <img className="h-48 w-full object-cover md:h-full md:w-48"
                    src={event_image}
                    alt={title}/> :
                  <img className="h-48 w-full md:h-full "
                       src="/images/th-200x150.png"
                       alt={title}/> }

            </div>
            <div className="pt-3 pl-8 pr-8 pb-8">
               <div className="uppercase tracking-wide text-sm brand-red font-semibold">
                  <h3  className="formatted-h3">
                     <Link  href={`/events/${id}`}>
                        <a className='brand-red uppercase'>{title}</a>
                     </Link>
                  </h3>
               </div>
               <div className="mt-2 text-gray-500">
                  <div className="md:text-sm  sm:mobile-card-text flex items-center">
                  <i className="pi pi-calendar th-icon"></i>
                  <div className="th-icon-text">{formatDate(startDate)} - {formatDate(endDate)}</div>
               </div>
                  {category &&
                  <div className=" md:text-sm  sm:mobile-card-text flex items-center">
                     <i className="pi pi-tag th-icon"></i>
                     <div className="th-icon-text">{translatedKeys(category)}</div>
                  </div>
                  }
                  <div className=" md:text-sm  sm:mobile-card-text flex items-center">
                     <i className="pi pi-map-marker th-icon"></i>
                     <div className="th-icon-text">{translatedKeys(city)}</div>
                  </div></div>
            </div>
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
