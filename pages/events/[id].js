import React, {useEffect, useRef, useState}  from 'react';
import Layout from '../../components/layout'
import { getAllEventIds, getEventData } from '../../lib/events'
import Head from 'next/head'
import {formatDate} from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { TabView, TabPanel } from 'primereact/tabview';
import useTranslation from "next-translate/useTranslation";

import ScrollTopArrow from "../../components/scroll-top-arrow/scroll-top-arrow";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Galleria } from 'primereact/galleria'
import { CommentCount } from 'disqus-react';
import {TheatreInfo} from "../../components/theatre/theatre-info";
import {Reviews} from "../../components/reviews/reviews";
import {SuggestedEvents} from "../../components/suggested-events/suggested-events";
import {BackToHome} from "../../components/navigation/backToHome";
import * as ga from "../../lib/ga";
import {addToLikes, isLiked, removeFromLikes} from "../../utils/agenda-utils";

export default function Event({ eventData: eventData }) {
  const { t } = useTranslation('common');
  const [facebookShareLink, setFacebookShareLink] = useState("");
  const [twitterShareLink, setTwitterShareLink] = useState("");
  const [disqusConfig, setDisqusConfig] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [likeState, setLikeState] = useState(isLiked(eventData.id));
  const galleryMultiImages = eventData.gallery_images || [];
  const galleryImages = galleryMultiImages.map(i=>i.imgSrc)
  .filter(img => img !== null && typeof img !== "undefined" && img !== "");

  const allGalleryImages = eventData.cover_image ? [eventData.event_image, ...galleryImages] : galleryImages;

  const disqusShortname = "theatralis";

  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 3
    }
  ];

  const itemTemplate = (item) => {
    return <img src={item} alt={item} style={{ width: '100%', maxHeight: '500px', display: 'block', objectFit: 'contain' }} />;
  };

  const thumbnailTemplate = (item) => {
    return <img src={item} alt={item} style={{ width: 'auto', maxHeight: '80px', display: 'block', marginRight: '40px' }} />;
  };

  useEffect(() => {
    setFacebookShareLink("https://www.facebook.com/sharer.php?u="+encodeURIComponent(window.location.href));
    setTwitterShareLink("https://twitter.com/share?text=Check this theatre out&url="+ encodeURIComponent(window.location.href) +"&hashtags=theatralis");
    const urlParts = window.location.href.split("/");
    setDisqusConfig({
       url: window.location.href,
       identifier: urlParts[urlParts.length-1],
       title: eventData.title
    });

    if (window.location.hash === '#map') {
       //wait for google maps to be loaded
       setTimeout(() => {
          setActiveIndex(1);
         const tabsElement = document.getElementById('tabs');
         tabsElement.scrollIntoView();
       }, 200);
    }
  }, []);

  const translatedKeys = (keysAsString) => {
    const keys = keysAsString.split(",").map(c => c.trim());
    const tKeys = keys.map(city => {
      const key = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
      return t(""+ key);
    });

    return tKeys.join(", ");
  };

  const period = `${formatDate(eventData.startDate)} - ${formatDate(eventData.endDate)}`;

  const goToFirstTabIfNeeded = () => {
    if (activeIndex !== 0) {
      setActiveIndex(0);
    }
  };

  const handleAddLike = () => {
    addToLikes(eventData.id);
    setLikeState(true);
  };
  const handleRemoveLike = () => {
    removeFromLikes(eventData.id);
    setLikeState(false);
  };

  return (
    <Layout description={eventData.title}
            fbSiteName={period}
            fbTitle={eventData.title.toUpperCase()}
            previewImage={eventData.event_image}
    >

      <header className="max-w-screen-xl text-center mx-auto object-center mb-2">
        <div className="hero-image-2 px-0 hero-image-small">
        </div>
      </header>

      {eventData.cover_image &&
        <div className="flex justify-center">
            <img className="cover-photo border-radius-4"
                 src={eventData.cover_image}
                 alt={eventData.title}/>
        </div>
      }

      <Head>
        <title>{eventData.title.toUpperCase()}</title>
      </Head>
      <div className="w-full flex justify-around">

        <article className="prose max-w-sm lg:max-w-3xl md:max-w-3xl  sm:max-w-2xl xs:max-w-l ">
          <div className="flex justify-between  xs:flex-col sm:flex-col">


            <div className="pt-4 pl-4 pr-4 pb-0">
              <div className={`event-title m-0 uppercase`}>{eventData.title} </div>
              <div className={utilStyles.lightText}></div>


                  <div className="flex justify-between">
              <div className="justify-start">
                <div className="event-details flex items-center mt-2 mb-1">
                  <i className="pi pi-calendar th-icon"></i>
                  <div className="th-icon-text">{period}</div>
                </div>
                {eventData.category &&
                <div className="event-details flex items-center mb-1">
                  <i className="pi pi-tag th-icon"></i>
                  <div className="th-icon-text"> {translatedKeys(eventData.category)}</div>
                </div>
               }
                <div className="event-details flex items-center mb-2">
                  <i className="pi pi-map-marker th-icon "></i>
                  <div className="th-icon-text">{translatedKeys(eventData.city)}</div>
                </div>

                <div className="event-details flex items-center">
                  <i className="pi pi-comments th-icon "></i>
                  <div className="th-icon-text">
                    <a href={"#comments"} className={"font-normal"} onClick={() => goToFirstTabIfNeeded()}>{ disqusConfig &&<CommentCount
                     shortname={disqusShortname}
                     config={
                       disqusConfig
                     }
                  >
                      { t("commentsAndReactions") }
                  </CommentCount>}
                  </a></div>
                </div>

                <div className="event-details flex items-center mt-2 mb-4">
                  <img className="h-5 no-margins xs:h-5 mr-3"
                       src={!likeState? "/images/remove-agenda.png": "/images/mask-added.png"}
                       alt="Added to your agenda"/>
                  {/*<i className="pi pi-comments th-icon "></i>*/}
                  <div className="th-icon-text ml-2">
                    <a className={"font-normal cursor-pointer brand-red"} onClick={() => likeState ? handleRemoveLike() : handleAddLike()}>
                      {likeState ? t("added-to-agenda") : t("add-to-agenda")}
                    </a></div>
                </div>

                <div className="socials-container flex">
                  {/*<span className={"mt-1"}>{t("share-it")}</span>*/}
                  <a href={facebookShareLink}
                     target="blank"
                     rel="noopener noreferrer"
                     alt="Share Page on Facebook"
                     className="pi pi-facebook"
                  ></a>
                  <a href={twitterShareLink}
                     target="blank"
                     rel="noopener noreferrer"
                     alt="Share Page on Twitter"
                     className="pi pi-twitter">
                  </a>

                </div>
              </div>
            </div>

            </div>


            {/* we want to hide id if there's a cover photo and on small devices */}
            {eventData.event_image && !eventData.cover_image &&
              <div className="xs:m-auto sm:m-auto md:m-auto">
              <Zoom>
                <img className="xs:max-h-80
                                sm:max-h-80
                                md:ml-5
                                md:mr-10
                                md:max-h-48
                                md:max-w-xs
                                lg:ml-5
                                lg:mr-5
                                lg:max-h-48
                                lg:max-w-xs
                                xl:ml-5
                                xl:mr-10
                                xl:max-h-48
                                xl:max-w-xs
                                2xl:ml-5
                                2xl:mr-10
                                2xl:max-h-48
                                2xl:max-w-xs
                                event-main-photo"
                     src={eventData.event_image}
                     alt={eventData.title}/>
              </Zoom>
            </div>
            }



             </div>
          {/*<Messages style={{maxWidth: '787px'}} className="max-w-screen-xl mx-auto xs:text-xs sm:text-xs" ref={covidMessage}></Messages>*/}

          <div className="hide-li">
            <TabView id="tabs" activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
              <TabPanel header={t("details")}>
                <div className="event-body md:text-justify lg:text-justify xl:text-justify xxl:text-justify xs:text-sm sm:text-sm "
                     dangerouslySetInnerHTML={{ __html: eventData.contentHtml }} />

                     {/*<hr/>*/}
                {/*{eventData.theatresData &&*/}
                {/*<>*/}
                    {/*<h4>{t("venue")}:</h4>*/}
                    {/*{eventData.theatresData.map((theatre, i) =>*/}
                      {/*<>*/}
                        {/*{t(`${theatre.city}`)}:*/}
                        {/*<a href className={"cursor-pointer"} onClick={()=> setActiveIndex(1)}>  {theatre.name}</a>*/}
                      {/*</>*/}
                      {/*)}*/}
                {/*</>*/}
                {/*}*/}

                { allGalleryImages.length === 1 &&
                <div>
                  <hr/>
                  <h4> {t("gallery")} </h4>
                  <div className="flex">
                    <Zoom>
                      <img className="xs:max-h-80
                                sm:max-h-80
                                md:ml-5
                                md:mr-10
                                md:max-h-48
                                md:max-w-xs
                                lg:ml-5
                                lg:mr-5
                                lg:max-h-96
                                lg:max-w-xs
                                xl:ml-5
                                xl:mr-10
                                xl:max-h-96
                                xl:max-w-xs
                                2xl:ml-5
                                2xl:mr-10
                                2xl:max-h-96
                                2xl:max-w-xs
                                event-main-photo"
                           src={allGalleryImages[0]}
                           alt={eventData.title}/>
                    </Zoom>
                  </div>
                </div>
                }

                { allGalleryImages.length > 1 &&
                <div>
                <hr/>
                  <h4> {t("gallery")} </h4>


                  <Galleria value={allGalleryImages}
                  responsiveOptions={responsiveOptions}
                  numVisible={5}
                  circular
                  style={{maxWidth: '640px'}}
                  showItemNavigators
                  item={itemTemplate}
                  thumbnail={thumbnailTemplate} />
                  </div>
                }
                <hr/>
                <h4> {t("commentsAndReactions")} </h4>
                { disqusConfig &&
                  <Reviews eventData={eventData} disqusConfig={disqusConfig} disqusShortname={disqusShortname}/>
                }
              </TabPanel>

              { eventData.theatresData && <TabPanel header={t("venue")}>
                {eventData.theatresData.map((t, i) =>
                   <TheatreInfo theatreData={t} key={i}/>
                   )}
              </TabPanel> }
            </TabView>
          </div>
          {/*<h4 className="h4-prose uppercase"> More events in {eventData.city}</h4>*/}
        </article>

      </div>

      <SuggestedEvents city={eventData.city} id={eventData.id}/>

      <div className="container my-12 mx-auto px-4 md:px-12 max-w-2xl lg:max-w-6xl md:max-w-3xl  sm:max-w-2xl xs:max-w-l ">
        <BackToHome/>
      </div>

      <ScrollTopArrow/>
    </Layout>
  )
}

export async function getStaticPaths({ locales }) {
  const paths = getAllEventIds(locales);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const eventData = await getEventData(params.id);
  return {
    props: {
      eventData: eventData
    }
  }
}
