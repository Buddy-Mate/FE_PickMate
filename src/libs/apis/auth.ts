import { LoginResponse, SignupResponse } from '@/types/auth'
import axiosInstance from '../axiosInstance'

// 회원가입
export const signup = async (data: SignupResponse) => {
  try {
    const response = await axiosInstance.post('/api/auth/signup', data)
    return response.data
  } catch (error) {
    console.error('회원가입 실패:', error)
    throw error
  }
}

// 로그인
export const login = async (data: LoginResponse) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', data)
    return response.data
  } catch (error) {
    console.error('로그인 실패:', error)
    throw error
  }
}

// 사용자 정보 GET
export const getUserData = async (accessToken: string) => {
  console.log('Access Token:', accessToken)

  try {
    const response = await axiosInstance.get('/api/auth/my', {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('사용자 정보 GET 실패:', error)
    throw error
  }
}
