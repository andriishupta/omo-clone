import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import NextNProgress from 'nextjs-progressbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type {
  Session} from '@supabase/auth-helpers-react';
import {
  SessionContextProvider
} from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import React, { useState } from 'react';
import { AppRoute } from '@/common/constants';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DefaultLayout } from '@/components/layouts/DefaultLayout';

const nextUiTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      omo50: '#ebeef9',
      omo100: '#c3cdee',
      omo200: '#9cace3',
      omo300: '#748ad8',
      omo400: '#4c69cc',
      omo500: '#3858C6',
      omo: '#3858C6',
      omo600: '#273e8b',
      omo700: '#1c2c63',
      omo800: '#111b3c',
      omo900: '#060914',

      primaryLight: '$omo200',
      primaryLightHover: '$omo300',
      primaryLightActive: '$omo400',
      primaryLightContrast: '$omo600',
      primary: '$omo',
      primaryBorder: '$omo500',
      primaryBorderHover: '$omo600',
      primarySolidHover: '$omo700',
      primarySolidContrast: '$white',
      primaryShadow: '$omo500',
    },
  },
});

export default function App({ Component, pageProps, router }: AppProps<{ initialSession: Session }>) {
  const [clientSupabase] = useState(() => createBrowserSupabaseClient());
  const { route } = router;
  const Layout = route.startsWith(AppRoute.Dashboard) ? DashboardLayout : DefaultLayout;

  return (
    <>
      <NextHead>
        <title>OmoClone | By AndriiTech</title>
        <meta name="description" content="The Clone of Omo App to showcase simple MVP by Andrii Shupta" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/omo-logo.webp" />
      </NextHead>
      <SessionContextProvider supabaseClient={clientSupabase} initialSession={pageProps.initialSession}>
        <NextUIProvider theme={nextUiTheme}>
          <Layout>
            <NextNProgress />
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </NextUIProvider>
      </SessionContextProvider>
    </>
  );
}
