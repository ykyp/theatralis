import React from "react";
import Layout from '../../components/layout'
import Head from 'next/head'
import useTranslation from "next-translate/useTranslation";
import { BackToHome } from "../../components/navigation/backToHome";

export default function AboutUs() {
   const { t } = useTranslation('common');
   return (
      <Layout description="Comment Policy - Theatralis">
         <Head>
            <title>{t("commentsPolicyTitle2")}</title>
         </Head>

         <header className="max-w-screen-xl text-center mx-auto object-center">
            <div className="hero-image-2 px-0 hero-image-small">
            </div>
         </header>

         <div className="w-full flex justify-around">
            <article className="prose p-5">
               <div className="event-title pb-5 pt-3 sharp-line">
                  {t("commentsPolicyTitle2")}
               </div>
               <div className="mt-3 md:text-justify lg:text-justify xl:text-justify xxl:text-justify text-md">
                  <div className="flex md:space-x-4  xs:mt-8 xs:pb-8 xs:flex-col-reverse ">
                     ️ <p className="m-auto">{t("commentsPolicySmallFullBody")}</p>
                  </div>
               </div>
               <BackToHome/>
            </article>
         </div>
      </Layout>
   )
}

