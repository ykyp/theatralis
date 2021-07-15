const nextTranslate = require('next-translate');

module.exports = nextTranslate({
   webpack: (config, { isServer, webpack }) => {
      return config;
   },
   target: 'serverless',
   rewrites: async () =>  {
      return {
         fallback: [
            { source: "/en/:path*", destination: "/:path*" },
         ],
      }
   }
});
