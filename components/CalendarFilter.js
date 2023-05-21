import React, {useEffect, useState} from 'react';
import {getDatesInRange, getDayName, getMonthName} from "../utils/utils";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import styles from "./carousel-filter.module.css";
import {useRouter} from "next/router";
import {formatDate, formatDateURL} from "./date";


const generateDayOptions = () => {
    const minDate = new Date();

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate()+14);

    const days = getDatesInRange(minDate, maxDate);
    const dayOptions= days.map((d, i) => {
        return {
            fullDate: d,
            date: d.getDate(),
            formattedDate: formatDateURL(d),
            day: getDayName(d),
            month: getMonthName(d),
            isSelected: false,
            disabled: false,
        };
    });
    return dayOptions;
}

export const CalendarFilter = (props) => {

    const router = useRouter();
    const [daysOptions, setDaysOptions] = useState(generateDayOptions());
    const [selectedDate, setSelectedDate] = useState();
   const handleDateClick = (date) => {
       console.log("selected date ", date);
       console.log("formatted date ", date.formattedDate);
       router.push({
               pathname: '/',
               query: {
                   ...router.query,
                   date:date.formattedDate,
               }
           },
       )
   };

    useEffect(() => {
        if (router.query.date) {
            setSelectedDate(router.query.date);
        }
    }, [router.query]);


    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 10
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 7
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 5
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        }
    };



   return (
       <div className="pt-4 mx-auto px-4 md:px-12 max-w-2xl lg:max-w-6xl md:max-w-3xl  sm:max-w-2xl xs:max-w-l bg-gray-100">
           {/*<h2 lang='el' className="h4-prose text-black text-xl uppercase text-left pt-6"> day filter</h2>*/}
           <div className=" mb-4 text-center lg:text-left text-gray-500 text-sm ">
           <Carousel responsive={responsive}>
              {daysOptions.map((item) => (
                  <div className="my-1 px-1 flex cursor-pointer"
                       onClick={()=>handleDateClick(item)}>
                      <div className={`w-full ${selectedDate === item.formattedDate ? styles.activeDate:''}`}>
                           <div className="my-1 px-1 flex flex-col" key={item}>
                               <div className={styles.dayText}>
                                   {item.day}
                               </div>
                               <div className={styles.dateText}>
                                   {item.date}
                               </div>
                               <div className={styles.monthText}>
                                   {item.month}
                               </div>
                           </div>
                      </div>
                  </div>
                  // <div className="w-full">
                  //     <div className="my-1 px-1 flex flex-col" key={item}>
                  //         <div className={styles.dayText}>
                  //             {item.day}
                  //         </div>
                  //         <div className={styles.dateText}>
                  //             {item.date}
                  //         </div>
                  //         <div className={styles.monthText}>
                  //             {item.month}
                  //         </div>
                  //     </div>
                  // </div>
              ))}
          </Carousel>
           </div>
      </div>
   );
};
