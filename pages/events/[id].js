import Layout from '../../components/layout'
import { getAllEventIds, getEventData } from '../../lib/events'
import Head from 'next/head'
import {formatDate} from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { TabView, TabPanel } from 'primereact/tabview';
import useTranslation from "next-translate/useTranslation";
import {useEffect, useState} from 'react';
import {BackToHome} from "../../components/navigation/backToHome";
import ScrollTopArrow from "../../components/scroll-top-arrow/scroll-top-arrow";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Galleria } from 'primereact/galleria'
import Disqus from "disqus-react"
import { CommentCount } from 'disqus-react';
import React from "react";

export default function Event({ eventData: eventData }) {
  const { t } = useTranslation('common');
  const [facebookShareLink, setFacebookShareLink] = useState("");
  const [twitterShareLink, setTwitterShareLink] = useState("");
  const [disqusConfig, setDisqusConfig] = useState(null);
  const galleryImages = [
     eventData.gallery_1,
     eventData.gallery_2,
     eventData.gallery_3
  ].filter(img => img !== null && typeof img !== "undefined" && img !== "");

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

  const template = (options) => {
    return (<><div className="flex align-items-center p-3"
                   style={{ cursor: 'pointer' }}
                   onClick={options.onClick}>

         <CommentCount
          shortname={disqusShortname}
          config={
            disqusConfig
          }
       >
           Comments
       </CommentCount>
         </div>
       </>
    );

  };
  return (
    <Layout description={eventData.title}
            fbSiteName={period}
            fbTitle={eventData.title}
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
        <title>{eventData.title}</title>
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

                <div className="socials-container flex">
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
                     className="pi pi-twitter"></a>
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
          <div className="hide-li">
            <TabView>
              <TabPanel header={t("details")}>
                <div className="event-body md:text-justify lg:text-justify xl:text-justify xxl:text-justify xs:text-sm sm:text-sm "
                     dangerouslySetInnerHTML={{ __html: eventData.contentHtml }} />

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
                  <div className="flex">


                  <Galleria value={allGalleryImages}
                  responsiveOptions={responsiveOptions}
                  numVisible={5}
                  circular
                  style={{maxWidth: '640px'}}
                  showItemNavigators
                  item={itemTemplate}
                  thumbnail={thumbnailTemplate} />
                  </div>
                  </div>
                }



              </TabPanel>
              { disqusConfig && <TabPanel header="Comments" headerTemplate={template}>
                <div className="article-container">
                  {/*<hr/>
                  <h4> Comments </h4>*/}




                  <div className="event-details flex items-center mb-5 ">
                    <i className="pi pi-arrow-circle-right mr-2 th-24"></i>
                    ️ <div className="th-icon-text font-bold"> {t("commentsTitle")}</div>
                  </div>

                  <div className="th-messagebox text-sm">
                    <strong>{t('commentsPolicyTitle2')}</strong>
                    <p>
                      {t('commentsPolicyTitle1')}
                      <a href={`/comment-policy`} target="_blank">{t('commentsPolicyTitle2')}</a>

                    {t('commentsPolicyTitle3')}
                    </p>
                  </div>


                  <>
                    <Disqus.DiscussionEmbed
                       shortname={disqusShortname}
                       config={disqusConfig}
                    />
                   {/* <div>{disqusConfig}</div>*/}
                    </>

                </div>
              </TabPanel>
              }
              {/*<TabPanel header="Map">
                <p>Map will go here...</p>
              </TabPanel>*/}
            </TabView>
          </div>

          <BackToHome/>

        </article>
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
