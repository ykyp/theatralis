import React from 'react';
import Link from 'next/link';
import useTranslation from "next-translate/useTranslation";

const Navbar = (props) =>  {
   const {t, lang} = useTranslation('common');

   return (
   <div className="max-w-screen-xl flex flex-wrap justify-between items-center py-4 px-3 mx-auto">
      <div className="font-bold text-2xl text-gray-800">
         <Link href="/">
               <img
                  src={t('nav-image')}
                  height={"auto"}
                  width={170}
                  alt={'Theatralis'}
               />
         </Link>
      </div>

      <nav className="navbar">
         <ul className="flex flex-wrap items-center">
            {props.children}
         </ul>
      </nav>

      <style jsx>
         {`
        .navbar :global(li:not(:last-child)) {
          @apply mr-3;
        }

        .navbar :global(a) {
          @apply text-gray-800;
        }

        .navbar :global(a:hover) {
          @apply border-b-2 border-primary;
        }
      `}
      </style>
   </div>
   )};

export { Navbar };
