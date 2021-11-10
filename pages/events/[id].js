import Layout from '../../components/layout'
import { getAllEventIds, getEventData } from '../../lib/events'
import Head from 'next/head'
import {formatDate} from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { TabView, TabPanel } from 'primereact/tabview';
import useTranslation from "next-translate/useTranslation";
import {useEffect, useState} from 'react';

export default function Event({ eventData: eventData }) {
  const { t, lang } = useTranslation('common');
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

  return (
    <Layout description={eventData.title}
            previewImage={eventData.event_image}
    >
      <Head>
        <title>{eventData.title}</title>
      </Head>
      <div className="w-full flex justify-around">
        <article className="prose prose-purple max-w-sm lg:max-w-2xl">
          <div className="p-4">
            <h1 className={utilStyles.headingXl}>{eventData.title} </h1>
            <div className={utilStyles.lightText}></div>
            <i className="pi pi-calendar th-icon"></i>
            {formatDate(eventData.startDate)} - {formatDate(eventData.endDate)}

                <div className="flex justify-between">
            <div className="justify-start">
              {eventData.category && <div className="mt-2 mb-2"><i className="pi pi-tag th-icon"></i> {translatedKeys(eventData.category)}</div>}
              <div className="mt-2 mb-2"><i className="pi pi-map-marker th-icon"></i>{translatedKeys(eventData.city)}</div>

              <div className="socials-container">
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
          <div className="hide-li">
            <TabView>
              <TabPanel header={t("details")}>
                <div dangerouslySetInnerHTML={{ __html: eventData.contentHtml }} />
              </TabPanel>
              {/*<TabPanel header="Map">
                <p>Map will go here...</p>
              </TabPanel>*/}
            </TabView>
          </div>
        </article>
      </div>
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
