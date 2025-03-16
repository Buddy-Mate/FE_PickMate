import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuthStore()
  const router = useRouter()

  // 로그인 안 되어 있으면 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다!')
      router.push('/login')
    }
  }, [isLoggedIn, router])

  return <>{children}</>
}
