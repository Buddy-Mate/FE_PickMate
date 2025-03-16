import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PrivateRoute from '@/components/PrivateRoute'
import { useAuthStore } from '@/store/authStore'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const noLayoutPages = ['/', '/login', '/signup']
  const hideLayout = noLayoutPages.includes(router.pathname)

  const { isLoggedIn } = useAuthStore()

  useEffect(() => {
    // 로그인한 사용자가 로그인 페이지에 접근할 경우 홈으로 리다이렉트
    if (
      isLoggedIn &&
      (router.pathname === '/login' || router.pathname === '/signup')
    ) {
      router.push('/home')
    }
  }, [isLoggedIn, router, router.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      {!hideLayout && <Header />}
      <main className="mt-20 flex-1">
        {/* 로그인 상태 확인이 필요한 페이지에만 PrivateRoute 적용 */}
        {!noLayoutPages.includes(router.pathname) ? (
          <PrivateRoute>
            <Component {...pageProps} />
          </PrivateRoute>
        ) : (
          <Component {...pageProps} />
        )}
      </main>
      {!hideLayout && <Footer />}
    </div>
  )
}
