import React from "react";
import Layout from '../../components/layout'
import Head from 'next/head'
import useTranslation from "next-translate/useTranslation";
import { BackToHome } from "../../components/navigation/backToHome";

export default function AboutUs() {
   const { t } = useTranslation('common');
   return (
      <Layout description="About Theatralis">
         <Head>
            <title>Theatralis - About Us</title>
         </Head>

         <header className="max-w-screen-xl text-center mx-auto object-center">
            <div className="hero-image-2 px-0 hero-image-small">
            </div>
         </header>

         <div className="w-full flex justify-around">
            <article className="prose p-5">
               <div className="event-title pb-3 sharp-line">
                  {t("aboutUsHd")}
               </div>
               <div className="event-details flex items-center pt-5">
                  <i className="pi pi-arrow-circle-right mr-2 th-24"></i>
                  ️ <div className="th-icon-text font-bold">{t("aboutUsSubhd")}</div>
               </div>
               <div className="md:text-justify lg:text-justify xl:text-justify xxl:text-justify">
                  <div className="flex md:space-x-4 aboutus-section xs:mt-8 xs:pb-8 xs:flex-col-reverse ">
                  ️ <p className="m-auto">{t("aboutUsParagrah1")}</p>

                     <img className="h-full w-72 sm:w-64 xs:w-56 xs:ml-12"
                          src="/images/about1.png"
                          alt="About Us 1"/>
                  </div>
                  <div className="flex md:space-x-4 mb-8 aboutus-section xs:flex-col xs:pb-8">
                     <img className="h-full w-48 sm:w-48 xs:w-48 mr-5 xs:ml-12 "
                          src="/images/about2.png"
                          alt="About Us 2"/>
                  ️ <p className="m-auto">
                        {t("aboutUsParagrah2")}
                        {t("aboutUsParagrah3")}
                    </p>
                  </div>
                  <div className="flex md:space-x-4 xs:flex-col-reverse ">
                     <div className="m-auto">
                        {t("aboutUsParagrah4")}
                        <br/>
                        <br/>
                        {t("aboutUsParagrah5")}
                     </div>
                     <img className="h-full w-48 sm:w-48 xs:w-48 xs:ml-12 ml-8"
                          src="/images/about3.png"
                          alt="About Us 2"/>
                     ️
                  </div>
               </div>
               <BackToHome/>
            </article>
         </div>
      </Layout>
   )
}

