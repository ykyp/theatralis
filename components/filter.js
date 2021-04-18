import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import styled from 'styled-components'

import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

const FiltersContainer = styled.section`
      display: flex;
      justify-content: space-between;      
   `;

export const Filter = (props) => {
   const [selectedCity, setSelectedCity] = useState(null);
   const [selectedPeriod, setSelectedPeriod] = useState(null);

   const cities = [
      { name: 'All', code: 'ALL' },
      { name: 'Nicosia', code: 'NIC' },
      { name: 'Limassol', code: 'LIM' },
      { name: 'Larnaca', code: 'LAR' },
      { name: 'Pafos', code: 'PAF' },
   ];

   const periods = [
      { name: 'This week', code: 'THIS_WEEK' },
      { name: 'Next week', code: 'NEXT_WEEK' },
      { name: 'This month', code: 'THIS_MONTH' },
   ];

   const onCityChange = (e) => {
      setSelectedCity(e.value);
      props.onCityChange(e);
   };

   const onPeriodChange = (e) => {
      setSelectedPeriod(e.value);
      props.onPeriodChange(e);
   };

   return (
      <FiltersContainer>
         <div className="dropdown-demo">
            <div className="card">
               <h5>City</h5>
               <Dropdown id="cityDropdown"
                         value={selectedCity}
                         options={cities}
                         onChange={onCityChange}
                         optionLabel="name"
                         placeholder="Select where" />
            </div>
         </div>
         {/*<div className="dropdown-demo">
            <div className="card">
               <h5>Period</h5>
               <Dropdown id="periodDropdown"
                         value={selectedPeriod}
                         options={periods}
                         onChange={onPeriodChange}
                         optionLabel="name"
                         placeholder="Select when" />
            </div>
         </div>*/}
      </FiltersContainer>
   );
};
