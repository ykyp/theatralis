import React, { useRef }  from "react";
import Layout from '../../components/layout'
import Head from 'next/head'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useState } from 'react';
import useTranslation from "next-translate/useTranslation";
import { Toast } from 'primereact/toast';

export default function ContactUs() {
   const toast = useRef(null);
   const [subject, setSubject] = useState('');
   const [message, setMessage] = useState('');
   const { t, lang } = useTranslation('common');
   const handleSubmit = e => {
      e.preventDefault();
      const data = {
         subject,
         message,
      };
      fetch('/api/contact', {
         method: 'post',
         body: JSON.stringify(data),
      }).then(() => {
         e.target[0].value = '';
         e.target[1].value = '';
         setSubject("");
         setMessage("");
         showSuccess();
      });
   };

   const showSuccess = () => {
      toast.current.show({
         severity: 'success',
         summary: 'Success Message',
         detail: t("contactUsSubmit")});
   };

   return (
      <Layout>
         <Head>
            <title>Contact Us</title>
         </Head>

         <Toast ref={toast} />

         <div className="w-full flex justify-around">

            <article className="prose prose-purple">
               <h1>{t("contactUsHd")}</h1>
               <h3> ✍️ {t("contactUsSubhd")}</h3>
               <form onSubmit={handleSubmit}>
               <div className="p-fluid">

                  <div className="p-field">
                     <label htmlFor="firstname1">{t("subject")}</label>
                     <InputText id="firstname1" type="text"
                                onChange={(e) => setSubject(e.target.value)}/>
                  </div>
                  <div className="p-field">
                     <label htmlFor="message">{t("message")}</label>
                     <InputTextarea id="address"
                                    type="text"
                                    rows="4"
                                    onChange={(e) => setMessage(event.target.value)}
                     />
                  </div>
               </div>
                  <Button type="submit" label={t("submit")}/>
               </form>

            </article>
         </div>
      </Layout>
  )
}

