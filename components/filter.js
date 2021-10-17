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
      { name: 'AllCities', code: 'ALL' },
      { name: 'Nicosia', code: 'NIC' },
      { name: 'Limassol', code: 'LIM' },
      { name: 'Larnaca', code: 'LAR' },
      { name: 'Pafos', code: 'PAF' },
   ];

   const periods = [
      { name: 'Anytime', code: 'ALL' },
      { name: 'ThisWeek', code: 'THIS_WEEK' },
      { name: 'NextWeek', code: 'NEXT_WEEK' },
      { name: 'ThisMonth', code: 'THIS_MONTH' },
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

   const selectedTranslatedOptionTemplate = (option, props) => {
      if (option) {
         return (
            <div className="country-item country-item-value">
               <div>{t(""+option.name)}</div>
            </div>
         );
      }

      return (
         <span>
            {props.placeholder}
        </span>
      );
   };

   const translatedOptionTemplate = (option) => {
      return (
         <div className="country-item">
            <div>{t(""+option.name)}</div>
         </div>
      );
   };

   return (
      <FiltersContainer
      style={{maxWidth: '874px',
         'margin': 'auto',
         'display': 'flex',
         'justifyContent': 'space-between'}}>
            <div style={{width: '28%'}}>
               <h3 className="formatted-h3">{t('where')}</h3>
               <Dropdown value={props.selectedCity}
                         style={{width: '100%', maxHeight: '290px'}}
                         key="cityDropdown"
                         options={cities}
                         onChange={onCityChange}
                         optionLabel="name"
                         placeholder="Select where"
                         scrollHeight="300px"
                         valueTemplate={selectedTranslatedOptionTemplate}
                         itemTemplate={translatedOptionTemplate}
               />
            </div>
            <WithMargin style={{width: '28%'}}>
               <h3  className="formatted-h3" >{t('when')}</h3>
               <Dropdown
                         id="periodDropdown"
                         value={props.selectedPeriod}
                         style={{width: '100%'}}
                         key="periodDropdown"
                         options={periods}
                         onChange={onPeriodChange}
                         optionLabel="name"
                         placeholder="Select when"
                         valueTemplate={selectedTranslatedOptionTemplate}
                         itemTemplate={translatedOptionTemplate} />
            </WithMargin>
         <WithMargin style={{width: '28%'}}>
            <h3  className="formatted-h3">{t('for')}</h3>

            <Dropdown
               id="agesDropdown"
               value={props.selectedAudience}
               style={{width: '100%'}}
               key="agesDropdown"
               options={audiences}
               onChange={onAudienceChange}
               optionLabel="name"
               placeholder="Select audience"
               valueTemplate={selectedTranslatedOptionTemplate}
               itemTemplate={translatedOptionTemplate} />

         </WithMargin>
      </FiltersContainer>
   );
};
