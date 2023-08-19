import React from 'react';
import useTranslation from "next-translate/useTranslation";
import { InputText } from 'primereact/inputtext';
import {useState, useRef, useEffect} from "react";
import useDebouncedEffect  from 'use-debounced-effect';
import {useRouter} from "next/router";
const name = 'Theatralis';

const Hero = ({onSearchChange, searchBy}) => {
   const {t, lang} = useTranslation('common');
   const [showSearch, setShowSearch] = useState(false);
   const inputEl = useRef(null);
   const [term, setTerm] = useState(searchBy);
   const router = useRouter();

   const toggleSearch = () => {
     setShowSearch(!showSearch);
   };

   const handleSearchChange = (e) => {
      setTerm(e.target.value);
   };

   const clearSearch = () => {
      onSearchChange("");
      setTerm("");
   };

   useDebouncedEffect(()=>{
      onSearchChange(term);
   }, 500 ,[term]);

   useEffect(() => {
      if (showSearch) {
         inputEl.current.focus();
      }
   }, [showSearch]);

   useEffect(() => {
      setTerm(searchBy);
   }, [searchBy]);

   useEffect(() => {
      setTerm(router.query.q);
      if (!router.query.q) {
         setShowSearch(false);
      }
   }, [router.query.q]);

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
         <div className="flex items-center relative">

            <span className="p-input-icon-left w-full">
            <i className="pi pi-search"/>

            <InputText className=" w-full"
                       ref={inputEl}
                       value={term}
                       onChange={handleSearchChange}
                       placeholder={t('search')}/>

               { searchBy &&
               <div className="absolute right-4 top-4 search-close-btn" onClick={() => clearSearch()}>
                  <i className="pi pi-times"/>
               </div>
               }
         </span>
         </div>
      </div>
      }
   </header>
)};

export { Hero };
