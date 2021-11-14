import React, { useEffect, useState, useRef } from 'react';
import { GMap } from 'primereact/gmap';
import { loadGoogleMaps, removeGoogleMaps } from './google-maps';

export default function EventMap () {
   const [googleMapsReady, setGoogleMapsReady] = useState(false);
   const [dialogVisible, setDialogVisible] = useState(false);
   const [markerTitle, setMarkerTitle] = useState('');
   const [draggableMarker, setDraggableMarker] = useState(false);
   const [overlays, setOverlays] = useState(null);
   const [selectedPosition, setSelectedPosition] = useState(null);

   const infoWindow = useRef(null);

   useEffect(() => {
      loadGoogleMaps(() => {
         setGoogleMapsReady(true);
      });

      return () => {
         removeGoogleMaps();
      };
   },[]);

   const onMapClick = (event) => {
      setDialogVisible(true);
      setSelectedPosition(event.latLng)
   };

   const onOverlayClick = (event) => {
      let isMarker = event.overlay.getTitle !== undefined;

      if(isMarker) {
         let title = event.overlay.getTitle();
         infoWindow.current = infoWindow.current||new google.maps.InfoWindow();
         infoWindow.setContent('<div>' + title + '</div>');
         infoWindow.open(event.map, event.overlay);
         event.map.setCenter(event.overlay.getPosition());
      }
   };

   const addMarker = () => {
      let newMarker = new google.maps.Marker({
         position: {
            lat: selectedPosition.lat(),
            lng: selectedPosition.lng()
         },
         title: markerTitle,
         draggable: draggableMarker
      });

      setOverlays([...overlays, newMarker]);
      setDialogVisible(false);
      setDraggableMarker(false);
      setMarkerTitle('');
   };

   const onMapReady = (event) => {
      setOverlays(
         [
            new google.maps.Marker({position: {lat: 35.1856, lng: 35.1856}, title:"Thoc"}),
            new google.maps.Circle({center: {lat: 35.1856, lng: 33.3823}, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500}),
         ]
      );
   };

   const options = {
      center: {lat: 35.1856, lng: 33.3823},
      zoom: 12
   };

   return (
      <div>
         {
            googleMapsReady && (
               <div className="card">
                  <GMap overlays={overlays} options={options} style={{width: '100%', minWidth:'500px', minHeight: '320px'}} onMapReady={onMapReady}
                        onMapClick={onMapClick} onOverlayClick={onOverlayClick}/>
               </div>
            )
         }
      </div>
   );
};
