import React, {useEffect, useState} from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import {ISSERVER, useStateFromStorage} from "../session-storage-state";

const WelcomeDialog = () => {
   const HAVE_SEEN_IT_KEY = 'th.welcomeMessageSeen';
   const [displayResponsive, setDisplayResponsive] = useState(false);
   const [haveSeenIt, setHaveSeenIt] = useStateFromStorage(false, HAVE_SEEN_IT_KEY);

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
            <Button label="Ok" onClick={() => onHide()} autoFocus />
         </div>
      );
   };

   return (
      <div className="dialog-demo">
         <div className="card">
            <Dialog header="Welcome to Theatralis (beta)"
                    visible={displayResponsive && !haveSeenIt}
                    onHide={() => onHide()}
                    breakpoints={{'960px': '75vw'}}
                    style={{width: '50vw'}}
                    footer={renderFooter()}>
               <p>
                  We are a new website with the aim of bringing all theatre events in Cyprus closer to the audience.
                  We are in Beta mode which means we are testing the product and we need your collaboration either by providing
                  us with invaluable feedback or if you a theatre representative to provide us with new theatre events.
               </p>
            </Dialog>
         </div>
      </div>
   )
};

export { WelcomeDialog };
