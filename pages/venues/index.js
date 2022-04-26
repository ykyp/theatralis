import React, {useState} from "react";
import Layout from '../../components/layout'
import Head from 'next/head'
import useTranslation from "next-translate/useTranslation";
import {BackToHome} from "../../components/navigation/backToHome";
import {getSortedVenuesData} from "../../lib/theatres";
import Link from 'next/link'
import {GMap} from "primereact/gmap";
import _ from 'lodash';

export default function Venues({allVenuesData}) {
   const {t} = useTranslation('common');
   const [overlays, setOverlays] = useState(null);
   const CYPRUS_LAT = 35.1264;
   const CYPRUS_LONG = 33.4299;

   const byCity = _.groupBy(allVenuesData, 'city' );
   console.log(byCity);

   const contentString = (t) => {
      return '<div id="content">' +
      '<div id="bodyContent">' +
      `<p><b>
            <a className='brand-red uppercase xs:text-sm ' target="_blank" href='/venues/${t.id}'>${t.name}</a>
         </b>` +
      "</p>" +
      `<p>View on, <a target="_blank" href=${t.google_maps_link}>` +
      "Google Maps</a> " +
      "</p>" +
      "</div>" +
      "</div>"
   };

   const onMapReady = () => {
      const markers = allVenuesData.map((t, i) => {

         const latlong = t.latlong.split(",");
         const lat = Number(latlong[0]);
         const long = Number(latlong[1]);
         const marker = new google.maps.Marker({
            position: {lat: lat, lng: long},
            title: t.name,
            icon: `http://www.theatralis.com.cy/images/theatralis_pin.png`
         });

         const infowindow = new google.maps.InfoWindow({
            content: contentString(t),
         });

         const map = document.getElementById("map");

         marker.addListener("click", () => {
            infowindow.open({
               anchor: marker,
               map,
               shouldFocus: false,
            });
         });

         return marker;
      });

      setOverlays(
            markers,
      );

   };

   const options = {
      center: {lat: CYPRUS_LAT, lng: CYPRUS_LONG},
      zoom: 9,
      zoomControl: true,
      mapId: 'bc03a351bf3a9067',
      disableDefaultUI: true
   };

   return (
      <Layout description="Theatralis - Venues">
         <Head>
            <title>Theatralis - Venues</title>
         </Head>

         <header className="max-w-screen-xl text-center mx-auto object-center mb-3">
            <div className="hero-image-2 px-0 hero-image-small">
            </div>
         </header>

         <GMap overlays={overlays}
               options={options}
               style={{width: '100%', minWidth:'100%', minHeight: '550px'}}
               onMapReady={onMapReady} />

         <div className="w-full flex justify-around">
            <article className="policies  p-3 xs:m-5  md:text-justify lg:text-justify xl:text-justify xxl:text-justify  max-w-sm lg:max-w-3xl md:max-w-3xl  sm:max-w-2xl xs:max-w-l ">
               <h4>Venues By City</h4>
                  {Object.keys(byCity).map((city, i) =>
                     <>
                       <h4>{city}</h4>
                        {byCity[city].map((t, i) =>
                              <p>
                                 <Link  href={`/venues/${t.id}`}>
                                    <a className='brand-red uppercase xs:text-sm '>{t.name}</a>
                                 </Link>
                              </p>
                           // <TheatreInfo theatreData={t} key={i}/>
                        )}
                        </>
                  )}

               <BackToHome/>

            </article>
         </div>
      </Layout>
   )
}

export async function getStaticProps() {
   const allVenuesData = getSortedVenuesData();
   return {
      props: {
         allVenuesData: allVenuesData,
      }
   }
}


