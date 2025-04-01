import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

        <link
          rel="preconnect"
          href="https://be-pickmate.shop"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fastly.jsdelivr.net"
          crossOrigin="anonymous"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
