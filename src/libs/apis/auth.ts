import { LoginResponse, SignupResponse } from '@/types/auth'
import axiosInstance from '../axiosInstance'

// 회원가입
export const signup = async (data: SignupResponse) => {
  try {
    const response = await axiosInstance.post('/auth/signup', data)
    return response.data
  } catch (error) {
    console.error('회원가입 실패:', error)
    throw error
  }
}

// 로그인
export const login = async (data: LoginResponse) => {
  try {
    const response = await axiosInstance.post('/auth/login', data)
    return response.data
  } catch (error) {
    console.error('로그인 실패:', error)
    throw error
  }
}

// 사용자 정보 GET
export const getUserData = async (accessToken: string) => {
  try {
    const response = await axiosInstance.get('/my/info', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.error('사용자 정보 GET 실패:', error)
    throw error
  }
}

// 사용자 정보 수정
export const updateUserData = async (formData: FormData) => {
  try {
    const response = await axiosInstance.put('/my/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log(response)
    return response.data
  } catch (error) {
    console.error('사용자 정보 수정', error)
    throw error
  }
}
