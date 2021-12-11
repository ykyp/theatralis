import React, {useEffect, useState} from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import {ISSERVER, useStateFromStorage} from "../session-storage-state";
import useTranslation from "next-translate/useTranslation";

const WelcomeDialog = () => {
   const HAVE_SEEN_IT_KEY = 'th.welcomeMessageSeen';
   const [displayResponsive, setDisplayResponsive] = useState(false);
   const [haveSeenIt, setHaveSeenIt] = useStateFromStorage(false, HAVE_SEEN_IT_KEY);
   const { t, lang } = useTranslation('common');

   useEffect(() => {
      setDisplayResponsive(true);
   }, []);

   const onHide = () => {
      setDisplayResponsive(false);
      if(!ISSERVER) {
         sessionStorage.setItem(HAVE_SEEN_IT_KEY, "true");
      }
      setHaveSeenIt(true);
   };

   const renderFooter = () => {
      return (
         <div>
            <Button label= {t("welcomeMessageButton")} onClick={() => onHide()} autoFocus />
         </div>
      );
   };

   return (
      <div className="dialog-demo">
         <div className="card">
            <Dialog header={t("welcomeMessageTitle")}
                    visible={displayResponsive && !haveSeenIt}
                    onHide={() => onHide()}
                    breakpoints={{'960px': '75vw'}}
                    style={{width: '50vw'}}
                    footer={renderFooter()}>
               <p>
                  {t("welcomeMessage")}
               </p>
            </Dialog>
         </div>
      </div>
   )
};

export { WelcomeDialog };
