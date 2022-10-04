import React, {useEffect, useState} from "react";
import Layout from '../../components/layout'
import Head from 'next/head'
import useTranslation from "next-translate/useTranslation";
import { BackToHome } from "../../components/navigation/backToHome";
import {useStateFromLocalStorage} from "../../components/session-storage-state";
import {ListingEvent} from "../../components/listing-event";

export default function MyAgenda() {
   const [likedEvents, setLikedEvents] = useState([]);
   const [likes, setLikes] = useStateFromLocalStorage([], 'th.likes');
   const findByEndpoint = (id) => `/api/findBy?id=${id}`;
   const { t } = useTranslation('common');

   useEffect(() => {
      if (likes.length !== likedEvents.length) {
         likes.forEach(event => {
            populateEventData(event);
         })
      }
   }, []);

   const populateEventData = (eventId) => {
      fetch(findByEndpoint(eventId))
          .then(res => res.json())
          .then(res => {
             setLikedEvents(likedEvents => [...likedEvents, res]);
          }).catch((error) => {
         console.log('error occurred fetching liked event', error);
      });
   };

   return (
      <Layout description="Theatralis - My Agenda">
         <Head>
            <title>Theatralis - My Agenda</title>
         </Head>

         <header className="max-w-screen-xl text-center mx-auto object-center">
            <div className="hero-image-2 px-0 hero-image-small">
            </div>
         </header>


          <div className="w-full flex justify-around bg-gray-100">
              <div className="prose p-5">
                  <div className="event-title pb-3 sharp-line">
                      {t("my-agenda")}
                  </div>
                     {!likedEvents || likedEvents.length === 0 &&
                         <p className="text-gray-600 text-sm mx-2 flex items-center px-4 py-3 hover:bg-gray-100 -mx-2">
                            <span className="font-bold" href="#">{t("no-agenda-yet")}</span>
                         </p>
                     }

                     {likedEvents && likedEvents.length !== 0 && likedEvents.map((event, index) => {
                        return (
                           <>
                               <ListingEvent event={event}
                                             key={index}></ListingEvent>
                            {/*<a href={`/events/${event.id}`} className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-100 -mx-2" key={index}>*/}


                               {/*<i onClick={() => removeFromLikes(event.id)} className="pi pi-times-circle th-icon no-decoration-important float-right"></i>*/}
                            {/*</a>*/}
                            </>

                        );
                     })}

               <BackToHome/>
              </div>
          </div>
      </Layout>
   )
}

