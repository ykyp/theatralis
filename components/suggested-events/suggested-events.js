import React, {useEffect, useState} from 'react';
import useTranslation from "next-translate/useTranslation";
import {EventCard} from "../cards/event-card";
import {useStateFromStorage} from "../session-storage-state";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const SuggestedEvents = (props) => {
   const SELECTED_CITY_KEY = 'th.selectedCity';
   const [selectedCity, setSelectedCity] = useStateFromStorage({name: 'AllCities', code: 'ALL'}, SELECTED_CITY_KEY);
   const searchEndpoint = () => `/api/search?city=${selectedCity.code}&period=ALL&category=ALL&page=&rows=20&q=`;
   const [results, setResults] = useState([]);
   const { t } = useTranslation('common');

   const responsive = {
      superLargeDesktop: {
         // the naming can be any, depends on you.
         breakpoint: { max: 4000, min: 3000 },
         items: 5
      },
      desktop: {
         breakpoint: { max: 3000, min: 1024 },
         items: 3
      },
      tablet: {
         breakpoint: { max: 1024, min: 464 },
         items: 2
      },
      mobile: {
         breakpoint: { max: 464, min: 0 },
         items: 2
      }
   };

   useEffect(() => {
      fetch(searchEndpoint(props.city))
         .then(res => res.json())
         .then(res => {
            setResults(() => res.results.filter(e => e.id !== props.id));
         });
   }, []);

   return (
      <div className="container my-12 mx-auto px-4 md:px-12 max-w-2xl lg:max-w-6xl md:max-w-3xl  sm:max-w-2xl xs:max-w-l bg-gray-100">
         <h2 className="h4-prose text-black text-xl uppercase text-left pt-6"> {t('more-events-in')} {t(selectedCity.name)}</h2>

         <div className=" mb-4 text-center lg:text-left text-gray-500 text-sm "> {/*bg-gray-100 text-gray-600*/}
         <Carousel responsive={responsive}>
            {results.map((event, i) => (
               <EventCard event={event}/>
            ))}
         </Carousel>
         </div>
      </div>
   );
};

export { SuggestedEvents };
