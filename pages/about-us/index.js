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
            <title>About Us</title>
         </Head>

         <div className="w-full flex justify-around">
            <article className="prose p-5">
               <div className="event-title pb-3 sharp-line">{t("aboutUsHd")}</div>
               <div className="event-details flex items-center pt-5">
                  <i className="pi pi-arrow-circle-right mr-2 th-24"></i>
                  ️ <div className="th-icon-text font-bold">{t("aboutUsSubhd")}</div>
               </div>
               <div className="">
                  <div className="flex space-x-8 aboutus-section">
                  ️ <p className="m-auto">{t("aboutUsParagrah1")}</p>

                     <img className="h-36  xs:h-32 h-full w-48 sm:w-48 xs:w-28"
                          src="/images/aboutus3.png"
                          alt="About Us 1"/>
                  </div>
                  <div className="flex space-x-8 mb-8 aboutus-section">
                     <img className="h-36  xs:h-32 h-full w-48 sm:w-48 xs:w-28 mr-5"
                          src="/images/aboutus2.png"
                          alt="About Us 2"/>
                  ️ <div className="m-auto">
                        {t("aboutUsParagrah2")}
                        {t("aboutUsParagrah3")}
                    </div>
                  </div>
                  <div className="flex space-x-8 ">
                     <div className="m-auto">
                        {t("aboutUsParagrah4")}
                        {t("aboutUsParagrah5")}
                     </div>
                     <img className="h-36  xs:h-32 h-full w-48 sm:w-48 xs:w-28"
                          src="/images/aboutus1.png"
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

