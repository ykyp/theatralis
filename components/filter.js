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
      margin-left: 20px; 
   `;

export const cities = [
   { name: 'AllCities', code: 'ALL' },
   { name: 'Nicosia', code: 'NIC' },
   { name: 'Limassol', code: 'LIM' },
   { name: 'Larnaca', code: 'LAR' },
   { name: 'Pafos', code: 'PAF' },
   { name: 'Famagusta', code: 'FAM' },
];

export const getCityByCode = (code) => {
   return cities.find(c=>c.code === code);
}

export const getCityByName = (name) => {
   return cities.find(c=>c.name === name);
}


export const periods = [
   { name: 'Anytime', code: 'ALL' },
   { name: 'ThisWeek', code: 'THIS_WEEK' },
   { name: 'NextWeek', code: 'NEXT_WEEK' },
   { name: 'ThisMonth', code: 'THIS_MONTH' },
];

export const getPeriodByCode = (code) => {
   return periods.find(p=>p.code === code);
}

export const categories = [
   { name: 'AllCategories', code: 'ALL' },
   { name: 'Biography', code: 'Biography' },
   { name: 'Drama', code: 'Drama' },
   { name: 'Comedy', code: 'Comedy' },
   { name: 'Standup', code: 'Standup' },
   { name: 'Historical', code: 'Historical' },
   { name: 'Monologue', code: 'Monologue' },
   { name: 'Musical', code: 'Musical' },
   { name: 'Novel', code: 'Novel' },
   { name: 'Amateur', code: 'Amateur' },
   { name: 'Children', code: 'Children' },
   { name: 'Tragedy', code: 'Tragedy' },
   { name: 'Satire', code: 'Satire' },
   { name: 'Opera', code: 'Opera' },
];

export const getCategoryByCode = (code) => {
   return categories.find(cat=>cat.code === code);
}

export const Filter = (props) => {


   const onCityChange = (e) => {
      props.onCityChange(e);
   };

   const onPeriodChange = (e) => {
      props.onPeriodChange(e);
   };

   const onCategoryChange = (e) => {
      props.onCategoryChange(e);
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
      style={{maxWidth: '787px',
         'margin': 'auto',
         'display': 'flex',
         'justifyContent': 'space-between'}}>
         {props.selectedCity && <div style={{width: `${props.filterWidth}%`}} className="xs:ml-2 sm:ml-4">
            <h3 className="formatted-h3">{t('city')}</h3>
            <Dropdown value={props.selectedCity}
                      style={{width: '100%', maxHeight: '350px'}}
                      key="cityDropdown"
                      options={cities}
                      onChange={onCityChange}
                      optionLabel="name"
                      placeholder="Select where"
                      scrollHeight="350px"
                      valueTemplate={selectedTranslatedOptionTemplate}
                      itemTemplate={translatedOptionTemplate}
            />
         </div>
         }
         {!props.selectedCity &&  <div style={{width: `${props.filterWidth}%`}}>
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
            </div>
         }
         {props.selectedCity && <WithMargin style={{width: `${props.filterWidth}%`}}>
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
            </WithMargin>}
         <WithMargin style={{width: `${props.filterWidth}%`}} className="xs:mr-2 sm:mr-4">
            <h3  className="formatted-h3">{t('category')}</h3>

            <Dropdown
               id="categoryDropdown"
               value={props.selectedCategory}
               style={{width: '100%', maxHeight: '410px'}}
               className="show-scroll"
               key="categoryDropdown"
               options={categories}
               onChange={onCategoryChange}
               optionLabel="name"
               placeholder="Select category"
               valueTemplate={selectedTranslatedOptionTemplate}
               itemTemplate={translatedOptionTemplate} />

         </WithMargin>
      </FiltersContainer>
   );
};
