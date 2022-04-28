import Head from 'next/head'
import Link from 'next/link'
import { Navbar } from "./navigation/navbar";
import { Footer } from "./footer/footer";
import { Hero } from "./hero/hero";
import useTranslation from 'next-translate/useTranslation'
import { navLinks } from "./nav-data";
import { useRouter } from 'next/router';
import CookieConsent from "react-cookie-consent";
import { useState } from 'react';
import {ISSERVER} from "./session-storage-state";


export default function Layout({ children, home, pageTitle, description, currentURL, previewImage, siteName, fbTitle, fbSiteName, onSearchChange, searchBy }) {
   const { t, lang } = useTranslation('common');
   const siteTitle = t('defaultSiteTitle');
   const defaultDesc = t('defaultSiteDesc');
   const defaultImage = '/images/defaultHomeImg.png';
   const [agendaOpened, setAgendaOpened] = useState(false);

   const handleAgendaClick = () => {
      setAgendaOpened(!agendaOpened);
   };

   const router = useRouter();
  return (
    <div className={`antialiased w-full text-gray-700`}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
         <title>{pageTitle || siteTitle}</title>
         <meta name="description" content={description || defaultDesc} />

         {/*<!-- Google / Search Engine Tags -->*/}
         <meta itemProp="name" content={pageTitle || siteTitle} />
         <meta itemProp="description" content={description || defaultDesc} />
         <meta itemProp="image" content={`${process.env.BASE_URL}${previewImage || defaultImage}`} />

         {/* Twitter */}
         <meta name="twitter:card" content="summary" key="twcard" />
         <meta name="twitter:title" content={pageTitle || siteTitle} />
         <meta name="twitter:description" content={description || defaultDesc} />
         <meta name="twitter:image" content={`${process.env.BASE_URL}${previewImage || defaultImage}`} />

         {/* Open Graph app id: 342107034384158*/}
         {/*<meta property="og:url" content={currentURL} key="ogurl" />*/}
         <meta property="og:image" content={`${process.env.BASE_URL}${previewImage||defaultImage}`} key="ogimage" />
         <meta property="og:image:height" content="720"/>
         <meta property="og:image:width" content="1200"/>
         <meta property="og:site_name" content={ siteName || siteTitle} key="ogsitename" />
         <meta property="og:title" content={fbTitle || pageTitle || siteTitle} key="ogtitle" />
         <meta property="og:description" content={fbSiteName || description || defaultDesc} key="ogdesc" />
         <meta property="og:type" content="website" />

         <link rel="preload" href="/images/background-cropped.jpg" as="image"/>
         <link rel="preload" href="/images/theatralis_greek_white.png" as="image"/>
         <link rel="preload" href="/images/theatralis_english_white.png" as="image"/>
         <link rel="preload" href="/images/th7.png" as="image"/>
         <link rel="preload" href="/images/about1.png" as="image"/>
         <link rel="preload" href="/images/about2.png" as="image"/>
         <link rel="preload" href="/images/about3.png" as="image"/>
         <link rel="preload" href="/images/hero-1.jpg" as="image"/>

      </Head>

       <Navbar>
          <li className="ml-2 mt-1" key="agenda">
              <i className="pi pi-calendar" onClick={handleAgendaClick}></i>
             <div className="flex justify-center ">
                   {agendaOpened && <div className="absolute xs:right-8 right-22 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20" style={{width:'20rem'}}>
                <div className="py-2">
                   <a href="#" className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                      <img className="h-8 w-8 rounded-full object-cover mx-1" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar"/>
                         <p className="text-gray-600 text-sm mx-2">
                            <span className="font-bold" href="#">Sara Salah</span> replied on the <span className="font-bold text-blue-500" href="#">Upload Image</span> artical . 2m
                         </p>
                   </a>
                </div>
                <a href="#" className="block bg-gray-800 text-white text-center font-bold py-2">See all notifications</a>
             </div> }
             </div>
          </li>
          <li className="ml-2 brand-red"  key="divider-1">
             |
          </li>
          {navLinks.map((link, index) => {
             return (
                <>
                <li className="ml-2" key={link.path}>
                   <Link href={link.path} activeStyle={{'fontWeight': "bold"}}>
                      <a key={index}
                         className={router.pathname === link.path ? "active" : ""}>{t(link.key)}</a>
                   </Link>
                </li>
                <li className="ml-2 brand-red"  key="divider-1">
                  |
               </li>
                </>
             );
          })}
          <li className={"ml-2"} key="en">
             <Link href="/" locale="en">
                <a  className={lang === 'en' ? "active" : ""}>EN</a>
             </Link>
          </li>
          <li className="ml-2 brand-red" key="divider-2">
             |
          </li>
          <li className={"ml-2"} key="gr">
             <Link href="/"  locale="gr">
                <a  className={lang === 'gr' ? "active" : ""}>ΕΛ</a>
             </Link>
          </li>
       </Navbar>

       { home && <Hero onSearchChange={onSearchChange} searchBy={searchBy}/> }

      <main>{children}</main>

       <Footer />
       <CookieConsent
          style={{ background: "#1f2937", color: "white", fontSize: "14px" }}
          buttonStyle={{
             color: '#fff',
             background: '#780811',
             border: '0 none',
             padding: '0.714rem 1rem',
             fontSize: '1rem',
             transition: 'background-color .2s,border-color .2s,color .2s,box-shadow .2s,background-size 0.2s cubic-bezier(0.64, 0.09, 0.08, 1)',
             borderRadius: '4px' }}
          buttonText={t("cookie-banner-ok")}
       >{t("cookie-banner")}
       <a className="text-yellow-400 hover:text-yellow-500 underline underline-offset-8" href="/cookie-policy" target="_blank">cookies</a>
          {t("cookie-banner-2")}
         {/* <a className="text-yellow-400 hover:text-yellow-500 underline underline-offset-8" href="/privacy-policy" target="_blank">{t("more")}</a>*/}
       </CookieConsent>
    </div>
  )
}
