import React from "react";
import Layout from '../../components/layout'
import Head from 'next/head'
import useTranslation from "next-translate/useTranslation";
import {BackToHome} from "../../components/navigation/backToHome";
import {getSortedVenuesData} from "../../lib/theatres";
import Link from 'next/link'

export default function Venues({allVenuesData}) {
   const {t} = useTranslation('common');
   return (
      <Layout description="Theatralis - Venues">
         <Head>
            <title>Theatralis - Venues</title>
         </Head>

         <header className="max-w-screen-xl text-center mx-auto object-center mb-3">
            <div className="hero-image-2 px-0 hero-image-small">
            </div>
         </header>

         <div className="w-full flex justify-around">
            <article className="policies prose p-3 xs:m-5  md:text-justify lg:text-justify xl:text-justify xxl:text-justify prose max-w-sm lg:max-w-3xl md:max-w-3xl  sm:max-w-2xl xs:max-w-l ">
               <h2 >Venues</h2>

                  {allVenuesData.map((t, i) =>
                     <p>
                        <Link  href={`/venues/${t.id}`}>
                           <a className='brand-red uppercase xs:text-sm '>{t.name}</a>
                        </Link>
                     </p>
                     // <TheatreInfo theatreData={t} key={i}/>
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


