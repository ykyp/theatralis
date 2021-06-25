import React from 'react';
import useTranslation from "next-translate/useTranslation";
const name = 'Theatralis';

const Hero = () => {
   const {t, lang} = useTranslation('home');

return (

   <header className="max-w-screen-xl text-center mx-auto object-center">
      <div className="hero-image px-0">
         <img
            src="/images/theatralis-big.png"
            height={144}
            width={270}
            alt={name}
            className="m-auto"
         />
         <h1 className="text-4xl text-white font-semibold">{name}</h1>
         <div className="text-2xl text-white mt-1">{t('hero-subtitle')}</div>
      </div>
   </header>
)};

export { Hero };
