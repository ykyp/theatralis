import {useState} from "react";

export const ISSERVER = typeof window === "undefined";

export const useStateFromStorage = (defaultValue, key) => {
   return useState(() => {
      try {
         if(!ISSERVER) {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
         }
         return defaultValue;
      } catch (error) {
         // If error also return initialValue
         console.log(error);
         return defaultValue;
      }
   });
};

export const useStateFromLocalStorage = (defaultValue, key) => {
   return useState(() => {
      try {
         if(!ISSERVER) {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
         }
         return defaultValue;
      } catch (error) {
         // If error also return initialValue
         console.log(error);
         return defaultValue;
      }
   });
};
