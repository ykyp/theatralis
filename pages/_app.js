import '../styles/theme-theatralis.css'
import '../styles/global.css'
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import 'tailwindcss/tailwind.css';
import { MantineProvider } from '@mantine/core';

import * as ga from '../lib/ga'

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, [router.events]);

  return <MantineProvider withGlobalStyles withNormalizeCSS theme={{
    fontFamily: 'Ubuntu, Roboto, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    colors: {
      brand: ['#780811', '#780811', '#780811', '#780811', '#780811', '#780811', '#780811', '#780811', '#780811', '#780811'],
    },
    primaryColor: 'brand',
  }}>
    <Component {...pageProps} />
  </MantineProvider>;
}

export default App;
