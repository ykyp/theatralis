import React from 'react';
const name = 'Theatralis';

const Hero = () => (
   <header className="max-w-screen-xl text-center pt-8 pb-16 px-3 mx-auto object-center">
      <img
         src="/images/theatralis-big.png"
         height={144}
         width={270}
         alt={name}
         className="m-auto"
      />
      <h1 className="text-4xl text-gray-800 font-semibold">{name}</h1>
      <div className="text-2xl text-gray-600 mt-1">Find all theatre events in Cyprus</div>
   </header>
);

export { Hero };
