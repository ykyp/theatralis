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

export default function Event({ eventData: eventData }) {
  const { t } = useTranslation('common');
  const [facebookShareLink, setFacebookShareLink] = useState("");
  const [twitterShareLink, setTwitterShareLink] = useState("");
  useEffect(() => {
    setFacebookShareLink("https://www.facebook.com/sharer.php?u="+encodeURIComponent(window.location.href));
    setTwitterShareLink("https://twitter.com/share?text=Check this theatre out&url="+ encodeURIComponent(window.location.href) +"&hashtags=theatralis");
  });

  const translatedKeys = (keysAsString) => {
    const keys = keysAsString.split(",").map(c => c.trim());
    const tKeys = keys.map(city => {
      const key = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
      return t(""+ key);
    });

    return tKeys.join(", ");
  };

  const period = `${formatDate(eventData.startDate)} - ${formatDate(eventData.endDate)}`;
  return (
    <Layout description={eventData.title}
            fbSiteName={period}
            fbTitle={eventData.title}
            previewImage={eventData.event_image}
    >

      <header className="max-w-screen-xl text-center mx-auto object-center">
        <div className="hero-image-2 px-0 hero-image-small">
        </div>
      </header>

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
            <div className="">
              <img className="ml-5
              mr-10
              max-h-48
              max-w-xs
               border-0
               border-solid
               rounded-sm
               shadow-md
               border-slate-200"
                   src={eventData.event_image}
                   alt={eventData.title}/>
            </div>
          </div>
          <div className="hide-li">
            <TabView>
              <TabPanel header={t("details")}>
                <div className="event-body md:text-justify lg:text-justify xl:text-justify xxl:text-justify"
                     dangerouslySetInnerHTML={{ __html: eventData.contentHtml }} />
              </TabPanel>
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
