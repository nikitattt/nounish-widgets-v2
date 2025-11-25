import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ReactTooltip from 'react-tooltip'
import Script from 'next/script'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ReactTooltip type="info" event="custom" />
      <Script src="https://adata.nounswidgets.wtf/latest.js" />
      <noscript>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="https://adata.nounswidgets.wtf/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
    </>
  )
}

export default MyApp
