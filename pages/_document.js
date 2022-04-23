import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
   render() {
      return (
         <Html>
         <Head>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <script
               async
               src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <script
               dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0TQL1NZTJ0', {
              page_path: window.location.pathname,
            });
          `,
               }}
            />

            <script async
                    src="https://www.googletagmanager.com/gtag/js?id=UA-196728460-1"/>
            <script dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());

               gtag('config', 'UA-196728460-1');
          `,
         }}
            />

            <script async defer
            src="https://maps.google.com/maps/api/js?key=AIzaSyDJFw0VYvFk9VqhQjDfNqmITaKYXga3SyI"/>

            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital@0;1&display=swap"
                     rel="stylesheet"/>

         </Head>
         <body>
         <Main />
         <NextScript />
         </body>
         </Html>
      )
   }
}
