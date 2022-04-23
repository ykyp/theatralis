import React, { useState } from 'react';
import { GMap } from 'primereact/gmap';

const EventMap = ({theatreData}) => {
   const latlong = theatreData.latlong.split(",");
   const lat = Number(latlong[0]);
   const long = Number(latlong[1]);
   const [overlays, setOverlays] = useState(null);

   const contentString =
      '<div id="content">' +
      '<div id="bodyContent">' +
      `<p><b>${theatreData.name}</b>` +
      "</p>" +
      `<p>Get directions , <a target="_blank" href=${theatreData.google_maps_link}>` +
      "here</a> " +
      "</p>" +
      "</div>" +
      "</div>";


   const onMapReady = (event) => {

      const marker = new google.maps.Marker({
         position: {lat: lat, lng: long},
         title:theatreData.name,
         icon:`${process.env.BASE_URL}/images/theatralis_pin.png`});

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
      center: {lat: lat, lng: long},
      zoom: 14,
      zoomControl: true,
      mapId: 'bc03a351bf3a9067',
      disableDefaultUI: true
   };

   return (
      <div>
         <div className="card">
            <GMap overlays={overlays}
                  options={options}
                  style={{width: '100%', minWidth:'100%', minHeight: '320px'}}
                  onMapReady={onMapReady} />
         </div>
      </div>
   );
};

export { EventMap };
