import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import {formatDate} from "./date";
import { useRouter } from 'next/router';
import Link from 'next/link'
import { Tag } from 'primereact/tag';
import ReactTooltip from 'react-tooltip';

export const ListingEvent = (props) => {
   const { t } = useTranslation('common');
   const { id, startDate, endDate, title, city, event_image, category, finishesSoon } = props.event;
   const cities = city.split(",");
   const router = useRouter();

   const translatedKey = (keyAsString) => {
      const trimmed = keyAsString.trim();
      const key = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
      return t(""+ key);
   };

   const translatedKeys = (keysAsString) => {
      const keys = keysAsString.split(",");
      const tKeys = keys.map(k => {
         return translatedKey(k);
      });

      return tKeys.join(", ");
   };

   const getCityLink = (city) => {
      const c = city.trim().toLowerCase();
      return c === "pafos" ? "theatro/paphos" : `theatro/${c}`;
   };

   return (
      <>
      <div className="th-card-container md:mx-auto lg:mx-auto xl:mx-auto 2xl:mx-auto bg-white rounded-md shadow-md overflow-hidden border-bottom-red m-4 sm:m-4 xs:m-2">
         <div className="flex relative">
            <div className="flex-shrink-0" style={{cursor: 'pointer'}} onClick={() => router.push(`/events/${id}`)}>
               { event_image ?
                  <img className="h-36 sm:h-36 xs:h-32 object-cover w-48 sm:w-48 xs:w-28"
                    src={event_image}
                    alt={title}/> :
                  <img className=" sm:h-36 xs:h-32 xs:object-cover h-full w-48 sm:w-48 xs:w-28"
                       src="/images/th-200x150.png"
                       alt={title}/> }

            </div>
            <div className="pt-3 sm:pt-3 xs:pt-1 pl-8 sm:pl-8 xs:pl-2 pr-8 sm:pr-8 xs:pr-4 pb-6 sm:pb-6 xs:pb-2">
               <div className="uppercase tracking-wide text-sm xs:text-xs brand-red font-semibold">
                  <h3  className="formatted-h3 xs:text-sm md:text-base lg:text-base">
                     <Link  href={`/events/${id}`}>
                        <a className='brand-red uppercase xs:text-sm '>{title}</a>
                     </Link>
                  </h3>
               </div>
               <div className="mt-2 text-gray-500">
                  <div className="mt-1 xs:text-sm text-sm sm:text-sm  xs:mobile-card-text flex items-center">
                     <i className="pi pi-calendar th-icon"></i>
                     <div className="th-icon-text">
                        {formatDate(startDate)} - {formatDate(endDate)}
                     </div>
                  </div>

                  {category &&
                  <div className="mt-1 xs:text-sm text-sm sm:text-sm xs:mobile-card-text flex items-center">
                     <i className="pi pi-tag th-icon"></i>
                     <div className="xs:line-clamp-1 xs:truncate xs:w-48">
                        {translatedKeys(category)}
                     </div>
                  </div>
                  }
                  <div className="mt-1 xs:text-sm text-sm sm:text-sm xs:mobile-card-text flex items-center">
                     <i className="pi pi-map-marker th-icon"></i>
                     <div className="xs:line-clamp-1 xs:truncate xs:w-48">
                        {
                           cities.map((c, i) => <span key={i}>
                           {i > 0 && ", "}
                              <a href={getCityLink(c)} className="small-link" target="_blank">{translatedKey(c)}</a>
                           </span>)
                        }
                     </div>
                  </div></div>

            </div>
            {/*<p className="read-more">
               <a href={`/events/${id}`}>{t("readMore")}</a>
            </p>*/}
            { finishesSoon &&
               <div className="absolute
                              right-0
                              md:top-0
                              lg:top-0
                              xl:top-0
                              2xl:top-0
                              xs:bottom-0
                              xs:mb-1
                              sm:bottom-0
                              sm:mb-1
                              md:mt-2
                              md:mr-2
                              lg:mt-2
                              lg:mr-2
                              xl:mt-2
                              xl:mr-2
                              2xl:mt-2
                              2xl:mr-2">
                  <div className="relative" data-tip={t("finishSoonTooltip")}>
                     <Tag className="mr-2" value={t("finishSoonTag")} tooltip="Enter your username" placeholder="Right" severity="warning" rounded></Tag>
                  </div>
                  <ReactTooltip />
               </div>
            }
         </div>

      </div>
      </>
   );
};
