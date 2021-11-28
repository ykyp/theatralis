import React, {useEffect, useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
// from: https://betterprogramming.pub/create-a-scroll-to-top-arrow-using-react-hooks-18586890fedc

const ScrollTopArrow = () =>{

   const [showScroll, setShowScroll] = useState(false);
   const OFFEST = 100;
   const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > OFFEST){
         setShowScroll(true)
      } else if (showScroll && window.pageYOffset <= OFFEST){
         setShowScroll(false)
      }
   };

   const scrollTop = () =>{
      window.scrollTo({top: 0, behavior: 'smooth'});
   };

   useEffect(() => {
      window.addEventListener('scroll', checkScrollTop);
   });


   return (
      <FaArrowCircleUp className="scrollTop" onClick={scrollTop} style={{height: 40, display: showScroll ? 'flex' : 'none'}}/>
   );
};

export default ScrollTopArrow;
