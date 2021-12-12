import React from 'react';
import { FooterIconList } from "./footer-icon-list";

const Footer = () => (
   <footer className="max-w-screen-md px-3 py-4 mx-auto text-gray-500 text-sm grid grid-cols-1 gap-y-3 sm:grid-cols-2">
      <div className="text-center sm:text-left">
         {`© Copyright ${new Date().getFullYear()} Theatralis`}
         <span> - Made with <i className="pi th-icon pi-heart"></i></span>
      </div>

      {/*<FooterIconList />*/}
   </footer>
);

export { Footer };
