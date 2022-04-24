import React  from 'react';
import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import useTranslation from "next-translate/useTranslation";
import {BackToHome} from "../../components/navigation/backToHome";
import ScrollTopArrow from "../../components/scroll-top-arrow/scroll-top-arrow";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import {getAllVenuesIds, getVenueData} from "../../lib/theatres";
import {EventMap} from "../../components/google-map/event-google-map";

export default function Venue({ venueData }) {
  const { t } = useTranslation('common');

  return (
    <Layout description={venueData.name}
            fbSiteName={venueData.name}
            fbTitle={venueData.name.toUpperCase()}
            previewImage={venueData.logo}
    >

      <header className="max-w-screen-xl text-center mx-auto object-center mb-2">
        <div className="hero-image-2 px-0 hero-image-small">
        </div>
      </header>


      <Head>
        <title>{venueData.name.toUpperCase()}</title>
      </Head>
      <div className="w-full flex justify-around">

        <article className="prose max-w-sm lg:max-w-3xl md:max-w-3xl  sm:max-w-2xl xs:max-w-l ">
          <div className="flex justify-between  xs:flex-col sm:flex-col">


            <div className="pt-4 pl-4 pr-4 pb-0">
              <div className={`event-title m-0 uppercase`}>{venueData.name} </div>
              <div className={utilStyles.lightText}></div>


                  <div className="flex justify-between">
              <div className="justify-start">
                <div className="event-details flex items-center mt-2 mb-1">
                  <i className="pi pi-calendar th-icon"></i>
                  <div className="th-icon-text">{venueData.address}</div>
                </div>

                <div className="event-details flex items-center mb-2">
                  <i className="pi pi-map-marker th-icon "></i>
                  <div className="th-icon-text">{venueData.city}</div>
                </div>

              </div>
                  </div>
            </div>


            {/* we want to hide id if there's a cover photo and on small devices */}
            {venueData.logo &&
              <div className="xs:m-auto sm:m-auto md:m-auto">
              <Zoom>
                <img className="xs:max-h-80
                                sm:max-h-80
                                md:ml-5
                                md:mr-10
                                md:max-h-48
                                md:max-w-xs
                                lg:ml-5
                                lg:mr-5
                                lg:max-h-48
                                lg:max-w-xs
                                xl:ml-5
                                xl:mr-10
                                xl:max-h-48
                                xl:max-w-xs
                                2xl:ml-5
                                2xl:mr-10
                                2xl:max-h-48
                                2xl:max-w-xs
                                event-main-photo"
                     src={venueData.logo}
                     alt={venueData.name}/>
              </Zoom>
            </div>
            }

             </div>


          <div>
            <EventMap theatreData={venueData}/>
          </div>

          <BackToHome/>

        </article>
      </div>
      <ScrollTopArrow/>
    </Layout>
  )
}

export async function getStaticPaths({ locales }) {
  const paths = getAllVenuesIds(locales);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const venueData = await getVenueData(params.id);
  return {
    props: {
      venueData
    }
  }
}
