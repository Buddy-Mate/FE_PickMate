import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import { useAuthStore } from '@/store/authStore'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const noLayoutPages = ['/', '/login', '/signup']
  const hideLayout = noLayoutPages.includes(router.pathname)

  const { isLoggedIn } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 로그인 상태가 아니면 로그인 페이지로 리디렉션
    if (!isLoggedIn && !['/login', '/signup'].includes(router.pathname)) {
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
  }, [isLoggedIn, router, router.pathname])

  if (loading) return <Loading />

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
