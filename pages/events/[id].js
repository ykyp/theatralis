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

  const translatedCities = (citiesAsString) => {
    const cities = citiesAsString.split(",").map(c => c.trim());
    const tCities = cities.map(city => {
      const key = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
      return t(""+ key);
    });

    return tCities.join(", ");
  };

  return (
    <Layout description={eventData.title}
            previewImage={eventData.event_image}
    >
      <Head>
        <title>{eventData.title}</title>
      </Head>
      <div className="w-full flex justify-around">
        <article className="prose prose-purple max-w-sm lg:max-w-lg">
          <div className="p-4">
            <h1 className={utilStyles.headingXl}>{eventData.title} </h1>
            <div className={utilStyles.lightText}></div>
                {formatDate(eventData.startDate)} - {formatDate(eventData.endDate)}

                <div className="flex justify-between">
            <div className="justify-start">
              <h3>{t("suitable")} {t("for-m")} {t(eventData.audience + '')}</h3>
                  {eventData.category && <h3>{t("category")}: {eventData.category}</h3>}
              <h3>{t('cities')}: {translatedCities(eventData.city)}</h3>

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
