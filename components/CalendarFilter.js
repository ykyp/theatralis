import React, {useEffect, useState} from 'react';
import {getDatesInRange, getDayName, getMonthName} from "../utils/utils";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import styles from "./carousel-filter.module.css";
import {useRouter} from "next/router";
import {formatDate, formatDateURL} from "./date";
import moment from "moment";


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
    const [availableDates, setAvailableDates] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedDate, setSelectedDate] = useState();
    const eventsDatesEndpoint = `/api/eventDates`;

    useEffect(() => {
        fetch(eventsDatesEndpoint)
            .then(res => res.json())
            .then(res => {
                const formattedDates = res.dates.map(d=> {
                    return moment(d).toDate();
                }).sort(function(a,b){
                    return a - b;
                });

                const asDaysOptions = formattedDates.map((d, i) => {
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

                setAvailableDates(() => asDaysOptions);
                setLoading(false);
            }).catch((error) => {
            console.log("Error fetching events available dates", error);
            setLoading(false);
        });
    }, []);

    const handleDateClick = (date) => {
       router.push({
               pathname: '/',
               query: {
                   ...router.query,
                   date: router.query.date && date.formattedDate === router.query.date ? undefined : date.formattedDate,
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
       <div className="pt-4 mx-auto px-4 md:px-12 max-w-2xl lg:max-w-4xl md:max-w-3xl  sm:max-w-2xl xs:max-w-l bg-gray-100">
           {/*<h2 lang='el' className="h4-prose text-black text-xl uppercase text-left pt-6"> day filter</h2>*/}
           <div className=" mb-4 text-center lg:text-left text-gray-500 text-sm ">
           <Carousel responsive={responsive}>
              {availableDates.map((item, i) => (
                  <div className={`my-1 px-1 flex cursor-pointer `} key={item.date+i}
                       onClick={()=>handleDateClick(item)}>
                      <div className={`w-full ${styles.dateCard} ${router.query.date === item.formattedDate ? styles.activeDate:''}`}>
                           <div className={`my-1 px-1 flex flex-col text-center `} key={item}>
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
              ))}
          </Carousel>
           </div>
      </div>
   );
};
