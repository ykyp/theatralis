import styled from 'styled-components'
import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import useTranslation from "next-translate/useTranslation";

const FiltersContainer = styled.section`
      display: flex;
  
    max-width: 100%;
    flex-wrap: wrap;     
   `;

const WithMargin = styled.div`
      margin-left: 25px; 
   `;

export const Filter = (props) => {
   const cities = [
      { name: 'All Cities', code: 'ALL', lang_key: "all-cities" },
      { name: 'Nicosia', code: 'NIC', lang_key: "nicosia"  },
      { name: 'Limassol', code: 'LIM', lang_key: "limassol"  },
      { name: 'Larnaca', code: 'LAR', lang_key: "larnaca"  },
      { name: 'Pafos', code: 'PAF', lang_key: "pafos"  },
   ];

   const periods = [
      { name: 'Anytime', code: 'ALL' },
      { name: 'This week', code: 'THIS_WEEK' },
      { name: 'Next week', code: 'NEXT_WEEK' },
      { name: 'This month', code: 'THIS_MONTH' },
   ];

   const audiences = [
      { name: 'Everyone', code: 'ALL' },
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

   const { t, lang } = useTranslation('common');

   return (
      <FiltersContainer
      style={{maxWidth: '874px',
         'margin': 'auto',
         'display': 'flex',
         'justifyContent': 'space-between'}}>
            <div style={{width: '28%'}}>
               <h3 className="formatted-h3">{t('where')}</h3>
               <Dropdown id="cityDropdown"
                         style={{width: '100%'}}
                         key="cityDropdown"
                         value={props.selectedCity}
                         options={cities}
                         onChange={onCityChange}
                         optionLabel="name"
                         placeholder="Select where" />
            </div>
            <WithMargin style={{width: '28%'}}>
               <h3  className="formatted-h3" >{t('when')}</h3>
               <Dropdown id="periodDropdown"
                         style={{width: '100%'}}
                         key="periodDropdown"
                         value={props.selectedPeriod}
                         options={periods}
                         onChange={onPeriodChange}
                         optionLabel="name"
                         placeholder="Select when" />
            </WithMargin>
         <WithMargin style={{width: '28%'}}>
            <h3  className="formatted-h3">{t('for')}</h3>
            <Dropdown id="agesDropdown"
                      key="agesDropdown"
                      style={{width: '100%'}}
                      value={props.selectedAudience}
                      options={audiences}
                      onChange={onAudienceChange}
                      optionLabel="name"
                      placeholder="Select audience" />
         </WithMargin>
      </FiltersContainer>
   );
};
