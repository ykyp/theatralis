import React, { useRef }  from "react";
import Layout from '../../components/layout'
import Head from 'next/head'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useState } from 'react';
import useTranslation from "next-translate/useTranslation";
import { Toast } from 'primereact/toast';
import {Dropdown} from "primereact/dropdown";
import {BackToHome} from "../../components/navigation/backToHome";

export default function ContactUs() {
   const reasons = [
      { name: 'InfoForTheatre', code: 'InfoForTheatre' },
      { name: 'NewTheatre', code: 'NewTheatre' },
      { name: 'Suggestions', code: 'Suggestions' },
      { name: 'Other', code: 'Other' }
   ];

   const toast = useRef(null);
   const [message, setMessage] = useState('');
   const [reason, setReason] = useState('');
   const [email, setEmail] = useState('');
   const [errors, setErrors] = useState({});
   const { t, lang } = useTranslation('common');



   const handleSubmit = e => {
      e.preventDefault();
      const data = {
         reason: t(""+reason.name),
         message,
         email
      };
      fetch('/api/contact', {
         method: 'post',
         body: JSON.stringify(data),
      }).then(() => {
         e.target[0].value = '';
         e.target[1].value = '';
         e.target[2].value = '';
         setReason("");
         setMessage("");
         setEmail("");
         showSuccess();
      });
   };

   const showSuccess = () => {
      toast.current.show({
         severity: 'success',
         summary: 'Success Message',
         detail: t("contactUsSubmit")});
   };

   const selectedTranslatedOptionTemplate = (option, props) => {
      if (option) {
         return (
            <div className="country-item country-item-value">
               <div>{t(""+option.name)}</div>
            </div>
         );
      }

      return (
         <span>
            {props.placeholder}
        </span>
      );
   };

   const translatedOptionTemplate = (option) => {
      return (
         <div className="country-item">
            <div>{t(""+option.name)}</div>
         </div>
      );
   };

   const onReasonChange = (e) => {
      setReason(e.value);
   };

   const onEmailChange = (e) => {
      const value = e.target.value;
      if (!value) {
         setErrors({...errors, email : 'newsletterEmailRequired'});
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
         setErrors({...errors, email : 'newsletterEmailError'});
      } else {
         setErrors({...errors, email : undefined});
      }
      setEmail(value);
   }

   return (
      <Layout description={'Contact Us'}>
         <Head>
            <title>Theatralis - Contact Us</title>
         </Head>

         <header className="max-w-screen-xl text-center mx-auto object-center">
            <div className="hero-image-2 px-0 hero-image-small">
            </div>
         </header>

         <Toast ref={toast} />

         <div className="w-full flex justify-around">
            <article className="prose p-5">
               <div className="event-title pb-3 sharp-line">{t("contactUsHd")}</div>
               <div className="event-details flex items-center pt-5">
                    <i className="pi pi-arrow-circle-right mr-2 th-24"></i>
                  ️ <div className="th-icon-text font-bold">{t("contactUsSubhd")}</div>
               </div>
               <div className="event-details flex items-center pt-3 pb-3">
                  ️ <div className="th-icon-text">
                  {t("contactUsSubhd2")}
                  <a href="mailto:info@theatralis.com.cy">info@theatralis.com.cy</a>
                  {t("contactUsSubhd3")}
               </div>
               </div>
               <form onSubmit={handleSubmit}>
               <div className="p-fluid">

                  <div className="p-field">
                     <label htmlFor="reason">{t("subject")} <span className='brand-red'>*</span></label>
                     <Dropdown value={reason}
                               style={{width: '100%', maxHeight: '310px'}}
                               key="reason"
                               options={reasons}
                               onChange={onReasonChange}
                               optionLabel="name"
                               placeholder={t("selectReason")}
                               scrollHeight="300px"
                               valueTemplate={selectedTranslatedOptionTemplate}
                               itemTemplate={translatedOptionTemplate}
                     />
                  </div>
                  <div className="p-field">
                     <label htmlFor="message">{t("message")} <span className='brand-red'>*</span> </label>
                     <InputTextarea id="address"
                                    type="text"
                                    value={message}
                                    rows="4"
                                    required
                                    onChange={(e) => setMessage(event.target.value)}
                     />
                  </div>
                  <div className="p-field mb-2">
                     <label htmlFor="email">{t("email")}  <span className='brand-red'>*</span></label>
                     <InputText id="email"
                                    type="text"
                                    value={email}
                                    onChange={(e) => onEmailChange(e)}
                     />
                     {errors.email &&  (
                         <span className='brand-red'>{t(errors.email)}</span>
                     )}
                  </div>
               </div>
                  <Button type="submit"
                          disabled={!reason || !message || errors.email}
                          label={t("submit")}/>
               </form>

               <BackToHome/>
            </article>
         </div>
      </Layout>
  )
}

