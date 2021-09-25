import styled from 'styled-components'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { Card } from 'primereact/card';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import React from 'react';
import FormattedDate from "./date";
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
   const { id, startDate, endDate, title, city, event_image } = props.event;
   const onlyStartDate = startDate.split("T")[0].replaceAll("-", "/");
   const onlyEndDate = endDate.split("T")[0].replaceAll("-", "/");
   const [hover, setHover] = useState(false);
   const router = useRouter();

   const translatedCities = (citiesAsString) => {
     const cities = citiesAsString.split(",").map(c => c.trim());
     const tCities = cities.map(city => {
        const key = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
        return t(""+ key);
     });

     return tCities.join(", ");
   };
   return (
      <Card style={{ width: '100%',
         marginBottom: '1em',
         ...(hover ? { cursor: 'pointer',  borderBottom: '2px solid #fcbc18'} : { borderBottom: '2px solid #780811'})
      }}
            >

        {/* <div className="grid grid-cols-3">*/}
         <div className="p-grid"
              onClick={() => router.push(`/events/${id}`)}
              onMouseEnter={()=>{
                 setHover(true);
              }}
              onMouseLeave={()=>{
                 setHover(false);
              }}>
            <div className="p-col-3">
               { event_image ?
                  <img width={'auto'} height={150} style={{ margin: 'auto'}} src={event_image}/> :
                  <img width={'auto'} height={150} style={{ margin: 'auto'}} src="/images/theatralis-sm-white.png"/>}
            </div>

            <div className="p-col-8" style={{lineHeight: '1.5', margin: '0 20px'}}
                 onMouseEnter={()=>{
                    setHover(true);
                 }}>
               <h3  className="formatted-h3" style={{margin: 0}}>
                  <Link  href={`/events/${id}`}>
                     <a className={hover ? 'brand-yellow' : 'brand-red'}
                        >{title}</a>
                  </Link>
               </h3>
               <div className="p-card-subtitle">{onlyStartDate} - {onlyEndDate}</div>
               <strong>{t('cities')}: {translatedCities(city)}</strong>
            </div>

         </div>
      </Card>

   );
};
