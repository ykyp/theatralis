import React from 'react';
import useTranslation from "next-translate/useTranslation";
import Disqus from "disqus-react"

const Reviews = ({eventData, disqusConfig, disqusShortname}) => {
   const { t } = useTranslation('common');
   return (
      <div className="article-container" >
         {/*<hr/>
                  <h4> Comments </h4>*/}

         { eventData.critic_p && <><div className="event-details flex items-center mb-5 ">
            <i className="pi pi-arrow-circle-right mr-2 th-24"></i>
            ️ <div className="th-icon-text font-bold"> {t("criticPhilenews")}</div>
         </div>

            <a href={eventData.critic_link} target="_blank">
               <img src="/images/phile_logo.png" className="text-center m-auto pb-5" alt="Phileleftheros logo"
                    style={{ width: '150px', maxHeight: '500px', display: 'block', objectFit: 'contain' }}/>
            </a>

            <div className=" justify-center text-center">
               <strong className="justify-center text-center">

                  { eventData.critic_title }
               </strong>
            </div>

            <div className="event-body md:text-justify lg:text-justify xl:text-justify xxl:text-justify xs:text-sm sm:text-sm "
                 dangerouslySetInnerHTML={{ __html: eventData.critic_p }} />

            <div className=" justify-center text-center mb-10">
               <a href={eventData.critic_link} target="_blank">{t("readMoreCritic")}</a>
            </div>
         </>}


         {/*<div className="event-details flex items-center mb-5 ">*/}
            {/*<i className="pi pi-arrow-circle-right mr-2 th-24"></i>*/}
            {/*️ <div className="th-icon-text font-bold"> {t("commentsTitle")}</div>*/}
         {/*</div>*/}

         <div id={"comments"}>
         <div className="th-messagebox text-sm">
            <strong>{t('commentsPolicyTitle2')}</strong>
            <p>
               {t('commentsPolicyTitle1')}
               <a href={`/comment-policy`} target="_blank">{t('commentsPolicyTitle2')}</a>

               {t('commentsPolicyTitle3')}
            </p>
         </div>


            <Disqus.DiscussionEmbed
               shortname={disqusShortname}
               config={disqusConfig}
            />
            {/* <div>{disqusConfig}</div>*/}
         </div>
      </div>
   )};

export { Reviews };
