import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

export const Filter = (props) => {
   const [selectedCity, setSelectedCity] = useState(null);

   const cities = [
      { name: 'Nicosia', code: 'NIC' },
      { name: 'Limassol', code: 'LIM' },
      { name: 'Larnaca', code: 'LAR' },
      { name: 'Pafos', code: 'PAF' },
   ];

   const onCityChange = (e) => {
      setSelectedCity(e.value);
      props.onCityChange(e);
   };

   return (
      <div className="dropdown-demo">
         <div className="card">
            <h5>City</h5>
            <Dropdown id="cityDropdown"
                      value={selectedCity}
                      options={cities}
                      onChange={onCityChange}
                      optionLabel="name"
                      placeholder="Select a City" />
         </div>
      </div>
   );
};
