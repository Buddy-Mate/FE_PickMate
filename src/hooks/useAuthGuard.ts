import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { notify } from '@/components/Toast'
import { getCookie } from 'cookies-next'
import { getUserData } from '@/libs/apis/auth'

export const useAuthGuard = () => {
  const router = useRouter()
  const { isLoggedIn, login, logout, setUser } = useAuthStore()
  const [loading, setLoading] = useState(true)

  const noLayoutPages = ['/', '/login', '/signup']
  const hideLayout = noLayoutPages.includes(router.pathname)

  useEffect(() => {
    const checkAuth = async () => {
      const token = getCookie('accessToken') as string | null

      // 1. 토큰이 없고 보호 페이지 접근 시 로그인으로
      if (!token && !hideLayout) {
        notify('info', '로그인이 필요합니다!')
        router.push('/login')
        return
      }

      // 2. 토큰이 있으면 로그인 처리 + 유저 정보 요청
      if (token && !isLoggedIn) {
        login(token)

        try {
          const res = await getUserData(token)
          setUser(res.data)
        } catch (error) {
          // 토큰 만료 or 오류 시 강제 로그아웃
          logout()
          notify('error', '로그인 정보가 만료되었습니다.')
          router.push('/login')
          console.error(error)
          return
        }
      }

      // 3. 로그인한 유저가 /login, /signup 접근 시 홈으로
      if (
        token &&
        (router.pathname === '/login' || router.pathname === '/signup')
      ) {
        router.push('/home')
        return
      }

      setLoading(false)
    }

    checkAuth()
  }, [hideLayout, isLoggedIn, login, logout, router, router.pathname, setUser])

  return { loading, hideLayout }
}
