import Head from 'next/head'
import Link from 'next/link'
import { Navbar } from "./navigation/navbar";
import { Footer } from "./footer/footer";
import { Hero } from "./hero/hero";
import useTranslation from 'next-translate/useTranslation'
import { navLinks } from "./nav-data";
import { useRouter } from 'next/router';
import CookieConsent from "react-cookie-consent";

export const siteTitle = 'Theatralis - Cyprus theatre listing';
export const defaultDesc = 'Find all theatre events in Cyprus';
export const defaultImage = '/images/defaultHomeImg.png';

export default function Layout({ children, home, pageTitle, description, currentURL, previewImage, siteName, fbTitle, fbSiteName }) {
   const { t, lang } = useTranslation('common');
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

      </Head>

       <Navbar>
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

       { home && <Hero/> }

      <main className="bg-gray-100">{children}</main>

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
