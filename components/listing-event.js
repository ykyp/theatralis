import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import styled from 'styled-components'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { Card } from 'primereact/card';

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
   const { id, startDate, endDate, title, city, event_image } = props.event;
   const onlyStartDate = startDate.split(" ").splice(0, 4).join(" ");
   const onlyEndDate = endDate.split(" ").splice(0, 4).join(" ");
   return (
      <Card title={ <Link href={`/events/${id}`}>
         <a>{title}</a>
      </Link>} subTitle={`${onlyStartDate} - ${onlyEndDate}`} style={{ width: '100%', marginBottom: '2em' }}>

        {/* <div className="grid grid-cols-3">*/}
         <div className="p-grid">
            <div class="p-col-4">
               { event_image ?
                  <img width={270} height={'auto'} style={{ margin: '0'}} src={event_image}/> :
                  <img width={270} height={'auto'} style={{ margin: '0'}} src="/images/theatralis-sm-coloured.png"/>}
            </div>

            <p className="p-col-7" style={{lineHeight: '1.5', margin: '0 20px'}}>
               <strong>Cities: {city}</strong> <br/>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
               quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
            </p>

         </div>
      </Card>

   );
};
