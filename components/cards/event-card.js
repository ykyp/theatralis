import React, {useEffect, useState} from 'react';
import useTranslation from "next-translate/useTranslation";
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import {formatDate} from "../date";
import {TheatreInfo} from "../theatre/theatre-info";

const EventCard = (props) => {
   const router = useRouter();

   const { id, startDate, endDate, title, city, event_image, category, theatresData, finishesSoon, extended } = props.event;
   const cities = city.split(",");
   console.log("title cities", title, cities)
   const { t } = useTranslation('common');
   const getCityLink = (city) => {
      const c = city.trim().toLowerCase();
      return c === "pafos" ? "theatro/paphos" : `theatro/${c}`;
   };
   const translatedKey = (keyAsString) => {
      const trimmed = keyAsString.trim();
      const key = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
      return t(""+ key);
   };

   const translatedKeys = (keysAsString) => {
      const keys = keysAsString.split(",");
      const tKeys = keys.map(k => {
         return translatedKey(k);
      });

      return tKeys.join(", ");
   };

   return (
      <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
         <article className="overflow-hidden rounded-lg shadow-lg">
            <a href={`/events/${id}`} target="_blank">
               <img alt={title} className="h-80 object-cover w-96 "
                    src={event_image}/>
            </a>

            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
               <h1 className="text-lg">
                  <a className="no-underline hover:underline text-black"
                     href={`/events/${id}`} target="_blank">
                     {title}
                  </a>
               </h1>
               <p className="text-grey-darker text-sm">
                  {formatDate(startDate)} - {formatDate(endDate)}
               </p>
            </header>

            <footer className="flex items-center flex-col justify-between leading-none p-2 md:p-4">
               {theatresData && theatresData.map((t, i) =>
                  <a className="flex items-center no-underline hover:underline text-black" href="#">
                     {t.logo && <img alt={t.name} className="block rounded-full w-8 h-8"
                          src={t.logo}/>}
                     {!t.logo && <img alt={t.name} className="block rounded-full w-16 h-12"
                                     src={"/images/th-200x150.png"}/>}
                     <p className="ml-2 text-sm">
                        {t.name}
                     </p>
                  </a>
               )}

               <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                  <span className="hidden">Like</span>
                  <i className="fa fa-heart"></i>
               </a>

            </footer>
            <div className="px-6 pt-4 pb-2">
               {
                  cities.map((c, i) =>
                     <span
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                     <a href={getCityLink(c)} className="small-link" target="_blank">#{c}</a>
                  </span>)
               }
               <span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{category}
               </span>
            </div>

         </article>

      </div>
   );
};

export { EventCard };
