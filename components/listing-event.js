import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import styled from 'styled-components'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { Card } from 'primereact/card';
import useTranslation from 'next-translate/useTranslation';

import React from 'react';
import FormattedDate from "./date";

const FiltersContainer = styled.section`
      display: flex;
      justify-content: normal;      
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
   const onlyStartDate = startDate.split(" ").splice(0, 4).join(" ");
   const onlyEndDate = endDate.split(" ").splice(0, 4).join(" ");
   return (
      <Card style={{ width: '100%', marginBottom: '1em', borderBottom: '2px solid #780811' }}>

        {/* <div className="grid grid-cols-3">*/}
         <div className="p-grid">
            <div className="p-col-3">
               { event_image ?
                  <img width={'auto'} height={150} style={{ margin: 'auto'}} src={event_image}/> :
                  <img width={'auto'} height={150} style={{ margin: 'auto'}} src="/images/theatralis-sm-white.png"/>}
            </div>

            <div className="p-col-8" style={{lineHeight: '1.5', margin: '0 20px'}}>
               <h3  className="formatted-h3" style={{margin: 0}}>
                  <Link  href={`/events/${id}`}>
                     <a className="brand-red">{title}</a>
                  </Link>
               </h3>
               <div className="p-card-subtitle">{onlyStartDate} - {onlyEndDate}</div>
               <strong>{t('cities')}: {city}</strong>
            </div>

         </div>
      </Card>

   );
};
