import React from 'react';
import {EventMap} from "../google-map/event-google-map";

const TheatreInfo = ({theatreData}) => {
   return (
      <div>
         <h4> {theatreData.city}</h4>
         <p><strong>Venue:</strong> {theatreData.name}</p>
         <p><strong>Address:</strong> {theatreData.address}</p>
         <EventMap theatreData={theatreData} key={theatreData.name}/>
      </div>
   );
};

export { TheatreInfo };
