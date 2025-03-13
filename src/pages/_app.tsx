import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const noLayoutPages = ['/', '/login', '/signup']
  const hideLayout = noLayoutPages.includes(router.pathname)

  return (
    <div className="flex min-h-screen flex-col">
      {!hideLayout && <Header />}
      <main className="mt-20 flex-1">
        <Component {...pageProps} />
      </main>
      {!hideLayout && <Footer />}
    </div>
  )
}
