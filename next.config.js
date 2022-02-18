const nextTranslate = require('next-translate');

module.exports = nextTranslate({
   webpack: (config, { isServer, webpack }) => {
      return config;
   },
   target: 'serverless',
   env: {
      BASE_URL: process.env.BASE_URL,
   },
   rewrites: async () =>  {
      return {
         fallback: [
            { source: "/en/:path*", destination: "/:path*" },
         ],
      }
   },
   i18n: {
      localeDetection: false,
   },
});
