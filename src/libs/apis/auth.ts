import { LoginResponse, SignupResponse } from '@/types/auth'
import axiosInstance from '../axiosInstance'
import { AxiosError } from 'axios'

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
    return response.data
  } catch (error) {
    console.error('사용자 정보 GET 실패:', error)
    throw error
  }
}

// 사용자 정보 수정
export const updateUserData = async (
  nickname: string,
  introduction: string,
) => {
  try {
    const response = await axiosInstance.put('/my/update', {
      nickname,
      introduction,
    })
    return response.data
  } catch (error) {
    // 중복된 닉네임일 경우 403 상태 코드 처리
    if (error instanceof AxiosError) {
      if (error.response && error.response.status === 403) {
        throw new Error('이미 사용 중인 닉네임입니다.')
      }
      console.error('사용자 정보 수정 실패:', error)
      throw error
    }
  }
}
