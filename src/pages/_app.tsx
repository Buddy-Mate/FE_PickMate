import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import { useAuthStore } from '@/store/authStore'
import '@/styles/globals.css'
import '../styles/customDatePicker.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const noLayoutPages = ['/', '/login', '/signup']
  const hideLayout = noLayoutPages.includes(router.pathname)

  const { isLoggedIn } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 랜딩페이지('/')는 로그인 여부와 상관없이 접근 가능
    if (router.pathname === '/') {
      setLoading(false)
      return
    }

    // 로그인 상태가 아니면 로그인 페이지로 리디렉션
    if (!isLoggedIn && !hideLayout) {
      alert('로그인이 필요합니다!')
      router.push('/login')
    }

    // 로그인한 사용자가 로그인 또는 회원가입 페이지에 접근하면 홈으로 리디렉션
    if (
      isLoggedIn &&
      (router.pathname === '/login' || router.pathname === '/signup')
    ) {
      router.push('/home')
    } else {
      setLoading(false)
    }
  }, [hideLayout, isLoggedIn, router, router.pathname])

  if (loading) return <Loading />

  return (
    <>
      <Head>
        {/* 기본 메타데이터 */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="PickMate는 토이프로젝트를 시작하고 싶은 사람들과 함께할 팀원을 찾아주는 플랫폼이에요. 이제 혼자 고민하지 말고, 함께 팀을 이루어 재미있는 프로젝트를 진행해봐요."
        />
        <meta name="author" content="BuddyMate 팀" />
        <title>PickMate</title>

        {/* Open Graph 메타데이터 */}
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
        </main>
        {!hideLayout && <Footer />}
      </div>
    </>
  )
}
