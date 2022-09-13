import React, {useEffect, useState} from 'react';
import useTranslation from "next-translate/useTranslation";
import { useRouter } from 'next/router';
import {EventCard} from "../cards/event-card";
import {useStateFromStorage} from "../session-storage-state";

const SuggestedEvents = (props) => {
   const SELECTED_CITY_KEY = 'th.selectedCity';
   const [selectedCity, setSelectedCity] = useStateFromStorage({name: 'AllCities', code: 'ALL'}, SELECTED_CITY_KEY);
   const searchEndpoint = () => `/api/search?city=${selectedCity.code}&period=ALL&category=ALL&page=&rows=4&q=`;
   const [results, setResults] = useState([]);
   const router = useRouter();
   const { t } = useTranslation('common');

   useEffect(() => {
      fetch(searchEndpoint(props.city))
         .then(res => res.json())
         .then(res => {
            setResults(() => res.results.filter(e => e.id !== props.id).slice(0,3));
         });
   }, []);

   return (
      <div className=" mb-4 text-center lg:text-left text-gray-500 text-sm bg-gray-100"> {/*bg-gray-100 text-gray-600*/}
         <div className="container my-12 mx-auto px-4 md:px-12 max-w-2xl lg:max-w-6xl md:max-w-3xl  sm:max-w-2xl xs:max-w-l bg-gray-100">
            <h2 className="h4-prose text-black text-xl uppercase text-left pt-6"> {t('more-events-in')} {t(selectedCity.name)}</h2>
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
               {results.map((event, i) => (
                  <EventCard event={event}/>
               ))}
            </div>
         </div>
      </div>
   );
};

export { SuggestedEvents };
