import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import styled from 'styled-components'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

import React from 'react';

const FiltersContainer = styled.section`
      display: flex;
      justify-content: normal;      
   `;

const WithMargin = styled.div`
      margin-left: 25px;      
   `;

export const ListingEvent = (props) => {
   const { id, startDate, endDate, title, city, event_image } = props.event;
   return (
      <div className={utilStyles.listItem} key={id}>
         <Link href={`/events/${id}`}>
            <a>{title}</a>
         </Link>
         <br />
         <small className={utilStyles.lightText}>
            {city}, {/*<FormattedDate dateString={startDate} /> - <FormattedDate dateString={endDate} />*/}
         </small>
         { event_image && <img width={35} height={35} src={event_image}/> }
      </div>
   );
};
