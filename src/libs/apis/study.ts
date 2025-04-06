import axiosInstance from '../axiosInstance'
import { StudyDataResponse } from '@/types/study'

// 스터디 생성 (CREATE)
export const createStudy = async (data: StudyDataResponse) => {
  try {
    const response = await axiosInstance.post('/studies/addStudy', data)
    return response.data
  } catch (error) {
    console.error('스터디 생성 실패:', error)
    throw error
  }
}

// 전체 스터디 조회 (READ)
export const getAllStudies = async () => {
  try {
    const response = await axiosInstance.get('/studies/all')
    return response.data
  } catch (error) {
    console.error('스터디 조회 실패:', error)
    throw error
  }
}

// 단일 스터디 조회 (READ)
export const getStudyById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/studies/${id}`)
    return response.data
  } catch (error) {
    console.error('단일 스터디 조회 실패:', error)
    throw error
  }
}

// 스터디 수정 (UPDATE)
export const updateStudy = async (
  id: number,
  data: StudyDataResponse,
  accessToken: string,
) => {
  try {
    const response = await axiosInstance.put(`/studies/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('스터디 수정 실패:', error)
    throw error
  }
}

// 스터디 삭제 (DELETE)
export const deleteStudy = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/studies/${id}`)
    return response.data
  } catch (error) {
    console.error('스터디 삭제 실패:', error)
    throw error
  }
}

// 내가 작성한 스터디 목록 조회
export const getMyStudies = async () => {
  try {
    const response = await axiosInstance.get('/my/studies')
    return response.data
  } catch (error) {
    console.error('내가 작성한 스터디 목록 조회 실패:', error)
    throw error
  }
}

// 스터디 좋아요
export const likeStudy = async (studyId: number) => {
  try {
    const response = await axiosInstance.post(`/studies/${studyId}/like`)
    return response.data
  } catch (error) {
    console.error('스터디 좋아요 실패:', error)
    throw error
  }
}

// 스터디 좋아요 취소
export const unlikeStudy = async (studyId: number) => {
  try {
    const response = await axiosInstance.delete(`/studies/${studyId}/like`)
    return response.data
  } catch (error) {
    console.error('스터디 좋아요 취소 실패:', error)
    throw error
  }
}

// 스터디 검색
export const searchStudy = async (keyword: string) => {
  try {
    const response = await axiosInstance.get('/studies/search', {
      params: { keyword },
    })
    return response.data
  } catch (error) {
    console.error('스터디 검색 실패:', error)
    throw error
  }
}
