import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import styled from 'styled-components'

import React from 'react';
import { Dropdown } from 'primereact/dropdown';

const FiltersContainer = styled.section`
      display: flex;
      justify-content: normal;      
   `;

const WithMargin = styled.div`
      margin-left: 25px;      
   `;

export const Filter = (props) => {
   const cities = [
      { name: 'Anywhere', code: 'ALL' },
      { name: 'Nicosia', code: 'NIC' },
      { name: 'Limassol', code: 'LIM' },
      { name: 'Larnaca', code: 'LAR' },
      { name: 'Pafos', code: 'PAF' },
   ];

   const periods = [
      { name: 'Anytime', code: 'ALL' },
      { name: 'This week', code: 'THIS_WEEK' },
      { name: 'Next week', code: 'NEXT_WEEK' },
      { name: 'This month', code: 'THIS_MONTH' },
   ];

   const audiences = [
      { name: 'Everyone', code: 'ALL' },
      { name: 'Adults', code: 'ADULTS' },
      { name: 'Children', code: 'children' },
   ];

   const onCityChange = (e) => {
      props.onCityChange(e);
   };

   const onPeriodChange = (e) => {
      props.onPeriodChange(e);
   };

   const onAudienceChange = (e) => {
      props.onAudienceChange(e);
   };

   return (
      <FiltersContainer>
            <div className="card">
               <h3>Where</h3>
               <Dropdown id="cityDropdown"
                         key="cityDropdown"
                         value={props.selectedCity}
                         options={cities}
                         onChange={onCityChange}
                         optionLabel="name"
                         placeholder="Select where" />
            </div>
            <WithMargin>
               <h3>When</h3>
               <Dropdown id="periodDropdown"
                         key="periodDropdown"
                         value={props.selectedPeriod}
                         options={periods}
                         onChange={onPeriodChange}
                         optionLabel="name"
                         placeholder="Select when" />
            </WithMargin>
         <WithMargin>
            <h3>For</h3>
            <Dropdown id="agesDropdown"
                      key="agesDropdown"
                      value={props.selectedAudience}
                      options={audiences}
                      onChange={onAudienceChange}
                      optionLabel="name"
                      placeholder="Select audience" />
         </WithMargin>
      </FiltersContainer>
   );
};
