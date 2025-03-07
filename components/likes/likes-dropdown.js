import React, {useEffect, useState} from 'react';
import {ISSERVER, useStateFromLocalStorage} from "../session-storage-state";
import useTranslation from 'next-translate/useTranslation';
import {formatDate} from "../date";
import {removeFromLikes} from "../../utils/agenda-utils";

const LikesDropdown = () => {
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const [likedEvents, setLikedEvents] = useState([]);
   const [likes, setLikes] = useStateFromLocalStorage([], 'th.likes');
   const findByEndpoint = (id) => `/api/findBy?id=${id}`;
   const { t } = useTranslation('common');

   const onStorageChange = () => {
      if(!ISSERVER) {
         const likesFromLSasString = localStorage.getItem('th.likes');
         const likesFromLS = likesFromLSasString ? JSON.parse(likesFromLSasString) : [];
         setLikes(likesFromLS);
         setLikedEvents([]);
         likesFromLS.forEach(event => {
            if (typeof likedEvents.find(e=> event === e.id) === "undefined"){
               populateEventData(event);
            }
         })
      }
   };

   useEffect(() => {
      if (likes.length !== likedEvents.length) {
         likes.forEach(event => {
            populateEventData(event);
         })
      }

      window.addEventListener("storage", onStorageChange);

      return () => {
         window.removeEventListener("storage", onStorageChange);
      };
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
      <div className="flex justify-center ">
      <div className="relative ">
      <button onClick={() => setDropdownOpen(!dropdownOpen)}
              className="relative z-10 block rounded-md bg-white p-2 focus:outline-none flex">

         <img className="xs:object-cover my-agenda-nav"
              src="/images/remove-agenda.png"
              alt="Added to your agenda"/>  ({likedEvents.length}) {t("my-agenda")}
         {/*<i className="pi pi-heart"/>*/}
      </button>

         {dropdownOpen && <div onClick={() => setDropdownOpen(false)} className="fixed inset-0 h-full w-full z-10">

         </div>}

         {dropdownOpen &&
         <div className="absolute right-0 xs:left-0 xs:mt-1 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20" style={{width: '20rem'}}>
            <div className="py-2">
               {!likedEvents || likedEvents.length === 0 &&
                  <p className="text-gray-600 text-sm mx-2 flex items-center px-4 py-3 hover:bg-gray-100 -mx-2">
                     <span className="p-4" href="#">{t("no-agenda-yet")}</span>
                  </p>
               }

               {likedEvents && likedEvents.length !== 0 && likedEvents.map((event, index) => {
                  return (
                     <>
                     <a href={`/events/${event.id}`} className="flex items-center justify-between px-4 py-3 border-b hover:bg-gray-100 -mx-2" key={index}>
                        <img className="h-8 w-8 rounded-full object-cover mx-1" src={event.event_image} alt="avatar"/>
                        <p className="text-gray-600 text-sm mx-2">
                           <span className="font-bold" href="#">
                              {event.title}
                           </span>
                           <div className="th-icon-text text-xs">
                              {formatDate(event.startDate)} - {formatDate(event.endDate)}
                           </div>
                        </p>

                        <i onClick={(e) => {e.stopPropagation();e.preventDefault();removeFromLikes(event.id)}} className="pi pi-times-circle th-icon no-decoration-important float-right"></i>
                     </a>
                     </>
                  );
               })}
               {/*<a href="#" className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">*/}
                  {/*<img className="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar"/>*/}
                     {/*<p className="text-gray-600 text-sm mx-2">*/}
                        {/*<span className="font-bold" href="#">Sara Salah</span> replied on the <span className="font-bold text-blue-500" href="#">Upload Image</span> artical . 2m*/}
                     {/*</p>*/}
               {/*</a>*/}
               {/*<a href="#" className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">*/}
                  {/*<img className="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="avatar"/>*/}
                     {/*<p className="text-gray-600 text-sm mx-2">*/}
                        {/*<span className="font-bold" href="#">Slick Net</span> start following you . 45m*/}
                     {/*</p>*/}
               {/*</a>*/}

            </div>
            {/*{likedEvents && likedEvents.length > 0 && <a href="/my-agenda" className="block bg-gray-500 text-white text-center font-bold py-2">View My Agenda</a>}*/}

         </div>
         }


            </div>

            </div>
   );
};

export { LikesDropdown };
