import { User } from '@/types/auth'
import { deleteCookie, getCookie } from 'cookies-next'
import { create } from 'zustand'

interface AuthStore {
  isLoggedIn: boolean
  accessToken: string | null
  user: User | null
  login: (token: string) => void
  setUser: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => {
  const token = getCookie('accessToken') as string | null

  return {
    isLoggedIn: !!token, // 토큰이 있으면 로그인 상태로 설정
    accessToken: token,
    user: null,
    login: (token: string) => set({ isLoggedIn: true, accessToken: token }),
    setUser: (user: User) => set({ user }),
    logout: () => {
      deleteCookie('accessToken')
      set({ isLoggedIn: false, accessToken: null, user: null })
    },
  }
})
