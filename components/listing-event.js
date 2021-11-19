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
      <Card style={{ width: '100%',
         marginBottom: '1em',
         borderBottom: '2px solid #780811'
      }}>

        {/* <div className="grid grid-cols-3">*/}
         <div className="p-grid flex-nowrap">
            <div className="p-col-3" style={{cursor: 'pointer'}} onClick={() => router.push(`/events/${id}`)}>
               { event_image ?
                  <img width={'auto'} height={150} style={{ margin: 'auto', maxHeight: '134px'}} src={event_image}/> :
                  <img width={'auto'} height={150} style={{ margin: 'auto', maxHeight: '134px'}} src="/images/theatralis-sm-white.png"/>}
            </div>

            <div className="p-col-8" style={{lineHeight: '1.5', margin: '0 20px'}}>
               <h3  className="formatted-h3">
                  <Link  href={`/events/${id}`}>
                     <a className='brand-red'>{title}</a>
                  </Link>
               </h3>
               <div className="p-card-subtitle md:text-sm  sm:text-xs flex items-center">
                  <i className="pi pi-calendar th-icon"></i>
                  <div className="th-icon-text">{formatDate(startDate)} - {formatDate(endDate)}</div>
               </div>
               {category &&
                  <div className="p-card-subtitle md:text-sm  sm:text-xs flex items-center">
                     <i className="pi pi-tag th-icon"></i>
                     <div className="th-icon-text">{translatedKeys(category)}</div>
                  </div>
               }
               <div className="p-card-subtitle md:text-sm  sm:text-xs flex items-center">
                  <i className="pi pi-map-marker th-icon"></i>
                  <div className="th-icon-text">{translatedKeys(city)}</div>
               </div>
            </div>

         </div>
      </Card>

   );
};
