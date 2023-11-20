import React from 'react'
import { type AppProps } from 'next/app'
import Head from 'next/head'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import 'bootstrap/dist/css/bootstrap.min.css'

import '../styles/style.scss'
import '../styles/menu.scss'

import setting from '../setting'
import Layout from '../components/Layout'

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export default function MyApp ({ Component, pageProps }: AppProps): React.JSX.Element {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>{setting.title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          rel='icon'
          type='image/png'
          href={`${setting.basePath}/favicon.ico`}
        />
      </Head>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Layout>
    </>
  )
}
