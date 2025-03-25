import '@/styles/globals.css'
import '../styles/customDatePicker.css'
import '../styles/customToast.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import Toast from '@/components/Toast'
import { useAuthGuard } from '@/hooks/useAuthGuard'

export default function App({ Component, pageProps }: AppProps) {
  const { loading, hideLayout } = useAuthGuard()

  if (loading) return <Loading />

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="PickMate는 토이프로젝트를 시작하고 싶은 사람들과 함께할 팀원을 찾아주는 플랫폼이에요. 이제 혼자 고민하지 말고, 함께 팀을 이루어 재미있는 프로젝트를 진행해봐요."
        />
        <meta name="author" content="BuddyMate 팀" />
        <title>PickMate</title>
        <meta
          property="og:title"
          content="PickMate - 토이프로젝트 팀 매칭 플랫폼"
        />
        <meta
          property="og:description"
          content="PickMate는 토이프로젝트를 시작하고 싶은 사람들과 함께할 팀원을 찾아주는 플랫폼이에요. 이제 혼자 고민하지 말고, 함께 팀을 이루어 재미있는 프로젝트를 진행해봐요."
        />
        <meta property="og:image" content="/assets/imgs/logo.png" />
        <meta property="og:url" content="https://fe-pick-mate.vercel.app/" />
      </Head>
      <div className="flex min-h-screen flex-col">
        {!hideLayout && <Header />}
        <main className="mt-20 flex-1">
          <Component {...pageProps} />
          <Toast />
        </main>
        {!hideLayout && <Footer />}
      </div>
    </>
  )
}
