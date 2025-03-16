import { LoginResponse, SignupResponse } from '@/types/auth'
import axiosInstance from '../axiosInstance'

export const signup = async (data: SignupResponse) => {
  try {
    const response = await axiosInstance.post('/auth/signup', data)
    return response.data
  } catch (error) {
    console.error('회원가입 실패:', error)
    throw error
  }
}

export const login = async (data: LoginResponse) => {
  try {
    const response = await axiosInstance.post('/auth/login', data)
    return response.data
  } catch (error) {
    console.error('로그인 실패:', error)
    throw error
  }
}
