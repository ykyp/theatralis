import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { Navbar } from "./navigation/navbar";
import { Footer } from "./footer/footer";
import { Hero } from "./hero/hero";
import useTranslation from 'next-translate/useTranslation'
import { navLinks } from "./nav-data";
import { useRouter } from 'next/router';

export const siteTitle = 'Theatralis - Cyprus theatre listing';
export const defaultDesc = 'Find all theatres in Cyprus';
export const defaultImage = '/images/defaultHomeImg.png';

export default function Layout({ children, home, pageTitle, description, currentURL, previewImage, siteName }) {
   const { t, lang } = useTranslation('common');
   const router = useRouter();
  return (
    <div className={`antialiased w-full text-gray-700`}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
         <title>{pageTitle || siteTitle}</title>
         <meta name="description" content={description} />

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
         <meta property="og:site_name" content={siteName || siteTitle} key="ogsitename" />
         <meta property="og:title" content={pageTitle || siteTitle} key="ogtitle" />
         <meta property="og:description" content={description} key="ogdesc" />
         <meta property="og:type" content="website" />
      </Head>

       <Navbar>
          {navLinks.map((link, index) => {
             return (
                <>
                <li className="ml-2">
                   <Link href={link.path} activeStyle={{'fontWeight': "bold"}}>
                      <a key={index}
                         className={router.pathname === link.path ? "active" : ""}>{t(link.key)}</a>
                   </Link>
                </li>
                <li className="ml-2 brand-red">
                  |
               </li>
                </>
             );
          })}
          <li className={"ml-2"}>
             <Link href="/" locale="en">
                <a>EN</a>
             </Link>
          </li>
          <li className="ml-2 brand-red">
             |
          </li>
          <li className={"ml-2"}>
             <Link href="/"  locale="gr">
                <a>GR</a>
             </Link>
          </li>
       </Navbar>

       { home && <Hero/> }

      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>  ← {t("backToHome")}</a>
          </Link>
        </div>
      )}

       <Footer />
    </div>
  )
}
