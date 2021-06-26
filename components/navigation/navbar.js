import React from 'react';
import Link from 'next/link';

const Navbar = (props) => (
   <div className="max-w-screen-xl flex flex-wrap justify-between items-center py-6 px-3 mx-auto">
      <div className="font-bold text-2xl text-gray-800">
         <Link href="/">
            <a className="flex items-center">
               <img
                  src="/images/theatralis-sm-coloured.png"
                  height={30}
                  width={30}
                  alt={'Theatralis'}
               />
               {/*<svg
                  className="text-primary stroke-current mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               >
                  <path d="M0 0h24v24H0z" stroke="none" />
                  <path d="M12 4L4 8l8 4 8-4-8-4M4 12l8 4 8-4M4 16l8 4 8-4" />
               </svg>
               */}
               Theatralis
            </a>
         </Link>
      </div>

      <nav className="navbar">
         <ul className="flex flex-wrap items-center font-semibold ">
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
);

export { Navbar };
