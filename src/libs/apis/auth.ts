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
    return response.data
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   if (error.response) {
    //     // 응답이 있다면, 응답 상태와 메시지를 확인
    //     if (error.response.status === 403) {
    //       throw new Error('이미 사용 중인 닉네임입니다.')
    //     } else {
    //       console.error('사용자 정보 수정 실패:', error.response.data)
    //       throw new Error('프로필 수정에 실패했습니다.')
    //     }
    //   } else {
    //     // 서버와의 연결 문제 등
    //     console.error('API 요청 실패:', error)
    //     throw new Error('서버 연결에 실패했습니다.')
    //   }
    // }
    console.error(error)
    throw error
  }
}
