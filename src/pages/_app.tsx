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

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const noLayoutPages = ['/', '/login', '/signup']
  const hideLayout = noLayoutPages.includes(router.pathname)

  const { isLoggedIn, login, setUser } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = getCookie('accessToken')
      if (!accessToken) {
        setLoading(false)
        return
      }

      try {
        const user = await getUserData(accessToken as string)
        setUser(user) // 유저 정보 설정
        login(accessToken as string) // 로그인 처리
      } catch (err) {
        console.error('유저 데이터 가져오기 실패:', err)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [setUser, login])

  useEffect(() => {
    if (loading) return

    if (router.pathname === '/') return

    if (!isLoggedIn && !hideLayout) {
      notify('info', '로그인이 필요합니다!')
      router.push('/login')
    } else if (isLoggedIn && ['/login', '/signup'].includes(router.pathname)) {
      router.push('/home')
    }
  }, [hideLayout, isLoggedIn, loading, router])

  if (loading) return <Loading />

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
          <Toast />
        </main>
        {!hideLayout && <Footer />}
      </div>
    </>
  )
}
