import React from 'react';
import {EventMap} from "../google-map/event-google-map";
import useTranslation from "next-translate/useTranslation";

const TheatreInfo = ({theatreData}) => {
   const { t } = useTranslation('common');
   return (
      <div>
         <h4>  {t(`${theatreData.city}`)}:</h4>
         <p className={"xs:text-sm sm:text-sm"}><strong>{t("venue")}:</strong> {theatreData.name}</p>
         <p className={"xs:text-sm sm:text-sm"}><strong>{t("address")}:</strong> {theatreData.address}</p>
         <EventMap theatreData={theatreData} key={theatreData.name}/>
      </div>
   );
};

export { TheatreInfo };
