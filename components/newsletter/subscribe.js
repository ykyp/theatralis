import React, { useRef, useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import useTranslation from "next-translate/useTranslation";
import { Messages } from 'primereact/messages';

const Subscribe = () =>  {
   const msgs1 = useRef(null);
   const [message, setMessage] = useState('');
   const [showMessage, setShowMessage] = useState(false);
   const [formData, setFormData] = useState({});
   const {t, lang} = useTranslation('common');

   const defaultValues = {
      email: '',
   };

   const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

   useEffect(() => {
      msgs1.current.show([
         { severity: 'success', summary:  t("newsletterSuccessTitle"), detail:  t("newsletterSuccessBody"), sticky: true },
      ]);
   }, []);

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
      setShowMessage(true);

      reset();
   };

   const getFormErrorMessage = (name) => {
      return errors[name] && <small className="p-error">{errors[name].message}</small>
   };

   return (
         <div className="px-4 pt-6 pb-4 ">
            <div className="max-w-xl mx-auto xs:pl-2 xs:pr-2">
               <h2 className="text-xl text-left inline-block font-semibold text-gray-600
               xs:text-sm xs:mb-2">{t("newsletterTitle")}</h2>
               <p className="text-gray-700 text-sm pl-px xs:text-xs ">
                  {t("newsletterMain")}
               </p>
               <Messages ref={msgs1} className={`${showMessage ? "block text-sm" : "hidden text-sm"} text-sm`}/>
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
   );
};


export { Subscribe };
