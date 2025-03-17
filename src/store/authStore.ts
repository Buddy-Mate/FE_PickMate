import { getCookie } from 'cookies-next'
import { create } from 'zustand'

interface AuthStore {
  isLoggedIn: boolean
  accessToken: string | null
  login: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => {
  const token = getCookie('accessToken') as string | null

  return {
    isLoggedIn: !!token, // 토큰이 있으면 로그인 상태로 설정
    accessToken: token,
    login: (token: string) => set({ isLoggedIn: true, accessToken: token }),
    logout: () => set({ isLoggedIn: false, accessToken: null }),
  }
})
