import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import Toast, { notify } from '@/components/Toast'
import { getUserData } from '@/libs/apis/auth'
import { useAuthStore } from '@/store/authStore'
import '@/styles/globals.css'
import '../styles/customDatePicker.css'
import '../styles/customToast.css'
import '../styles/customMarkdown.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import Router from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const noLayoutPages = ['/', '/login', '/signup']
  const hideLayout = noLayoutPages.includes(router.pathname)

  const { isLoggedIn, login, setUser } = useAuthStore()
  const [authLoading, setAuthLoading] = useState(true)
  const [pageLoading, setPageLoading] = useState(false)

  // ✅ 페이지 이동 로딩 이벤트 처리
  useEffect(() => {
    const handleStart = () => setPageLoading(true)
    const handleComplete = () => setPageLoading(false)

    Router.events.on('routeChangeStart', handleStart)
    Router.events.on('routeChangeComplete', handleComplete)
    Router.events.on('routeChangeError', handleComplete)

    return () => {
      Router.events.off('routeChangeStart', handleStart)
      Router.events.off('routeChangeComplete', handleComplete)
      Router.events.off('routeChangeError', handleComplete)
    }
  }, [])

  // ✅ 인증 상태 초기화
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = getCookie('accessToken')
      if (!accessToken) {
        setAuthLoading(false)
        return
      }

      try {
        const user = await getUserData(accessToken as string)
        setUser(user)
        login(accessToken as string)
      } catch (err) {
        console.error('유저 데이터 가져오기 실패:', err)
      } finally {
        setAuthLoading(false)
      }
    }

    initAuth()
  }, [setUser, login])

  // ✅ 인증 상태에 따른 라우팅 처리
  useEffect(() => {
    if (authLoading) return

    if (router.pathname === '/') return

    if (!isLoggedIn && !hideLayout) {
      notify('info', '로그인이 필요합니다!')
      router.push('/login')
    } else if (isLoggedIn && ['/login', '/signup'].includes(router.pathname)) {
      router.push('/home')
    }
  }, [hideLayout, isLoggedIn, authLoading, router])

  if (authLoading || pageLoading) return <Loading />

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="PickMate는 토이프로젝트를 시작하고 싶은 사람들과 함께할 팀원을 찾아주는 플랫폼이에요."
        />
        <meta name="author" content="BuddyMate 팀" />
        <title>PickMate</title>
        <meta
          property="og:title"
          content="PickMate - 토이프로젝트 팀 매칭 플랫폼"
        />
        <meta
          property="og:description"
          content="PickMate는 토이프로젝트를 시작하고 싶은 사람들과 함께할 팀원을 찾아주는 플랫폼이에요."
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
        <Toast />
      </div>
    </>
  )
}
