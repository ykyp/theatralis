import React from "react";
import Layout from '../../components/layout'
import Head from 'next/head'
import useTranslation from "next-translate/useTranslation";

export default function AboutUs() {
   const { t, lang } = useTranslation('common');
   return (
      <Layout>
         <Head>
            <title>About Us</title>
         </Head>

         <div className="w-full flex justify-around">
            <article className="prose prose-purple">
               <h1>{t("aboutUsHd")}</h1>
               <h3> {t("aboutUsSubhd")}</h3>

            </article>
         </div>
      </Layout>
   )
}

