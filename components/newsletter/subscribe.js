import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import useTranslation from "next-translate/useTranslation";

const Subscribe = () =>  {
   // 1. Create a reference to the input so we can fetch/clear it's value.
   const inputEl = useRef(null);
   // 2. Hold a message in state to handle the response from our API.
   const [message, setMessage] = useState('');
   const [showMessage, setShowMessage] = useState(false);
   const [formData, setFormData] = useState({});
   const {t, lang} = useTranslation('common');

   {/*<form onSubmit={subscribe}>
         <label htmlFor="email-input">{'Email Address'}</label>
         <input
            id="email-input"
            name="email"
            placeholder="you@awesome.com"
            ref={inputEl}
            required
            type="email"
         />
         <div>
            {message
               ? message
               : `I'll only send emails when new content is posted. No spam.`}
         </div>
         <button type="submit">{'✨ Subscribe 💌'}</button>
      </form>*/}

   const defaultValues = {
      email: '',
   };

   const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

   const onSubmit = async (data) => {
      setFormData(data);

      const res = await fetch('/api/subscribe', {
         body: JSON.stringify({
            email: data.email
         }),
         headers: {
            'Content-Type': 'application/json'
         },
         method: 'POST'
      });

      const { error } = await res.json();

      if (error) {
         // 4. If there was an error, update the message in state.
         setMessage(error);

         return;
      }

      /*// 5. Clear the input value and show a success message.
      inputEl.current.value = '';
      setMessage('Success! 🎉 You are now subscribed to the newsletter.');
      */
      setShowMessage(true);

      reset();
   };

   const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
   const getFormErrorMessage = (name) => {
      return errors[name] && <small className="p-error">{errors[name].message}</small>
   };

   return (
      <div className="form-demo">
         <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
            <div className="flex justify-content-center flex-column pt-6 px-3">
               <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
               <h5>{t("newsletterSuccessTitle")}</h5>
               <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                  {t("newsletterSuccessBody")}
               </p>
            </div>
         </Dialog>
         <div className="px-4 pt-6 pb-4  -mx-4 ">
            <div className="max-w-xl mx-auto">
               <h2 className="text-xl text-left inline-block font-semibold text-gray-600">{t("newsletterTitle")}</h2>
               <p className="text-gray-700 text-xs pl-px">
                  {t("newsletterMain")}
               </p>
               <form onSubmit={handleSubmit(onSubmit)}  className="mt-2">
                  <div className="flex items-center">

                     <Controller name="email" control={control}
                                 rules={{ required: t("newsletterEmailRequired"), pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: t("newsletterEmailError") }}}
                                 render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} placeholder="Email" className={`${classNames({ 'p-invalid': fieldState.invalid })} w-full px-2 py-4 mr-2  bg-gray-100 shadow-inner rounded-md border border-gray-400 focus:outline-none`} />
                                 )} />


                     <Button type="submit" label={t("newsletterEmailSubmit")}
                             className=" text-gray-200 px-5 py-2 rounded shadow "
                             style={{marginLeft: "-7.8rem"}} />
                  </div>
                  {getFormErrorMessage('email')}
               </form>
            </div>
         </div>
      </div>
   );
};


export { Subscribe };
