import React, { useEffect, useState } from 'react';
import { GMap } from 'primereact/gmap';
import { loadGoogleMaps, removeGoogleMaps } from './google-maps';

const EventMap = ({theatreData}) => {
   const [googleMapsReady, setGoogleMapsReady] = useState(false);
   const [overlays, setOverlays] = useState(null);

   useEffect(() => {
      loadGoogleMaps(() => {
         setGoogleMapsReady(true);
      });

      return () => {
         removeGoogleMaps();
      };
   },[]);

   const contentString =
      '<div id="content">' +
      '<div id="bodyContent">' +
      `<p><b>${theatreData.name}</b>,  ` +
      `${theatreData.id}` +
      "</p>" +
      `<p>Get directions , <a target="_blank" href=${theatreData.address}>` +
      "here</a> " +
      "</p>" +
      "</div>" +
      "</div>";


   const onMapReady = (event) => {

      const marker = new google.maps.Marker({
         position: {lat: 35.1680605, lng: 33.3552834},
         title:"Thoc",
         icon:`//${process.env.BASE_URL}/images/theatralis_pin.png`});

      setOverlays(
         [
            marker,
            //new google.maps.Circle({center: {lat: 35.1856, lng: 33.3823}, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500}),
         ]
      );

      const infowindow = new google.maps.InfoWindow({
         content: contentString,
      });

      const map = document.getElementById("map");

      infowindow.open({
         anchor: marker,
         map,
         shouldFocus: false,
      });

      marker.addListener("click", () => {
         infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
         });
      });
   };

   const options = {
      center: {lat: 35.1680605, lng: 33.3552834},
      zoom: 14,
      zoomControl: true,
      mapId: 'bc03a351bf3a9067',
      disableDefaultUI: true
   };

   return (
      <div>
         {
            googleMapsReady && (
               <div className="card">
                  <GMap overlays={overlays}
                        options={options}
                        style={{width: '100%', minWidth:'500px', minHeight: '320px'}}
                        onMapReady={onMapReady} />
               </div>
            )
         }
      </div>
   );
};

export { EventMap };
