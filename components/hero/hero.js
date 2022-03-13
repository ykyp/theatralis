import React from 'react';
import useTranslation from "next-translate/useTranslation";
import { InputText } from 'primereact/inputtext';
import {useState, useRef, useEffect} from "react";
const name = 'Theatralis';

const Hero = ({onSearchChange, searchBy}) => {
   const {t, lang} = useTranslation('common');
   const [showSearch, setShowSearch] = useState(false);
   const inputEl = useRef(null);

   const toggleSearch = () => {
     setShowSearch(!showSearch);
   };

   useEffect(() => {
      if (showSearch) {
         inputEl.current.focus();
      }
   }, [showSearch]);

return (
   <header className="max-w-screen-l text-center mx-auto object-center">
      <div className="hero-image px-0">
         <img
            src={t('hero-image')}
            height={144}
            width={270}
            alt={name}
            loading="eager"
            className="m-auto"
         />
       {/*  <h1 className="text-4xl text-white font-semibold">{name}</h1>
         <div className="text-2xl text-white mt-1">{t('hero-subtitle')}</div>*/}
      </div>
      <div className="hero-subtitle">
         <div className="text-l text-white mt-1">{t('hero-subtitle')}
         <div className={`inline cursor-pointer search-btn ml-3`} onClick={() => toggleSearch()}>
            <i className={`pi pi-search hover:search-active ${showSearch ?? 'search-active'}`}
               style={{fontSize: '18px'}}></i>
         </div>
         </div>
      </div>
      {showSearch && <div>
         <div className="flex items-center">

            <span className="p-input-icon-left w-full">
            <i className="pi pi-search"/>

            <InputText className=" w-full"
                       ref={inputEl}
                       value={searchBy}
                       onChange={(e) => onSearchChange(e.target.value)}
                       placeholder={t('search')}/>
         </span>
         </div>
      </div>
      }
   </header>
)};

export { Hero };
