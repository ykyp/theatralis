import React, {useEffect, useState} from 'react';
import {ISSERVER, useStateFromLocalStorage} from "../session-storage-state";

const LikesDropdown = () => {
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const [likedEvents, setLikedEvents] = useState([]);
   const [likes, setLikes] = useStateFromLocalStorage([], 'th.likes');
   const findByEndpoint = (id) => `/api/findBy?id=${id}`;

   useEffect(() => {
      if (likes.length !== likedEvents.length) {
         likes.forEach(event => {
            populateEventData(event);
         })
      }

      window.addEventListener("storage", () => {
         console.log("event received");
         // if (likes.length !== likedEvents.length) {
         if(!ISSERVER) {
            const existingLikes = localStorage.getItem('th.likes');
            console.log(existingLikes);
            const existingLikesArray = existingLikes ? JSON.parse(existingLikes) : [];
            console.log(existingLikesArray);
            setLikes(existingLikesArray);
            setLikedEvents([]);
            existingLikesArray.forEach(event => {
               if (!likedEvents.find(e=> event.id === e.id)){
                  populateEventData(event);
               }
            })
         }

         // }
      });

      return () => {
         // window.removeEventListener("storage");
      };
   }, []);

   // useEffect(() => {
   //
   //    if (likes.length !== likedEvents.length) {
   //       likes.forEach(event => {
   //          populateEventData(event);
   //       })
   //    }
   // }, [likes]);


   const populateEventData = (eventId) => {
      fetch(findByEndpoint(eventId))
         .then(res => res.json())
         .then(res => {
            const newLikes = likedEvents;
            newLikes.push(res);
            setLikedEvents(newLikes);
         });
   };

   return (
      <div className="flex justify-center ">
      <div className="relative ">
      <button onClick={() => setDropdownOpen(!dropdownOpen)} className="relative z-10 block rounded-md bg-white p-2 focus:outline-none">
         My Agenda ({likes.length})  <i className="pi pi-heart"/>
      </button>

         {dropdownOpen && <div onClick={() => setDropdownOpen(false)} className="fixed inset-0 h-full w-full z-10">

         </div>}

         {dropdownOpen &&
         <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20" style={{width: '20rem'}}>
            <div className="py-2">
               {likedEvents.map((event, index) => {
                  return (
                     <a href={`/events/${event.id}`} className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2" key={index}>
                        <img className="h-8 w-8 rounded-full object-cover mx-1" src={event.event_image} alt="avatar"/>
                        <p className="text-gray-600 text-sm mx-2">
                           <span className="font-bold" href="#">{event.title}</span>
                        </p>
                     </a>
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
             {/*<a href="#" className="block bg-gray-800 text-white text-center font-bold py-2">See all notifications</a>*/}
         </div>
         }


            </div>

            </div>
   );
};

export { LikesDropdown };
