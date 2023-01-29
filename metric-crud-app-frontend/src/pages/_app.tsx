import { css, Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Colors } from '../util/colors';

import { Shrikhand, Montserrat } from '@next/font/google'
import { mq } from '../util/mediaQuery';

const shrikhand = Shrikhand({ subsets: ['latin'], weight: "400" })
const montserrat = Montserrat({ subsets: ['latin'], weight: "400" })

const globalStyles = mq({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },
  'body, html': {
    overflowX: 'hidden',
    overflowY: ['auto', 'hidden'],
  },
  'h1,h2,h3': {
    fontFamily: shrikhand.style.fontFamily
  },
  body: {
    fontSize: [16, 24],
    fontFamily: montserrat.style.fontFamily,
    color: Colors.foreground,
    backgroundColor: Colors.background,
  },
  a: {
    fontFamily: shrikhand.style.fontFamily,
    color: 'inherit',
    textDecoration: 'none',
  },
  button: {
    fontFamily: shrikhand.style.fontFamily,
    color: 'inherit',
    cursor: 'pointer',
  },
  label:{
    fontWeight: 'bold',
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Metric Crud App</title>
      <meta name="description" content="Metrics Crud App" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </>
}
