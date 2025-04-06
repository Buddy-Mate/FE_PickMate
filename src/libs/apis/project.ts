import { ProjectDataResponse } from '@/types/project'
import axiosInstance from '../axiosInstance'

// 프로젝트 생성 (CREATE)
export const createProject = async (data: ProjectDataResponse) => {
  try {
    const response = await axiosInstance.post('/projects/addProject', data)
    return response.data
  } catch (error) {
    console.error('프로젝트 생성 실패:', error)
    throw error
  }
}

// 전체 프로젝트 조회 (READ)
export const getAllProjects = async () => {
  try {
    const response = await axiosInstance.get('/projects/all')
    return response.data
  } catch (error) {
    console.error('프로젝트 조회 실패:', error)
    throw error
  }
}

// 단일 프로젝트 조회 (READ)
export const getProjectById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/projects/${id}`)
    return response.data
  } catch (error) {
    console.error('단일 프로젝트 조회 실패:', error)
    throw error
  }
}

// 프로젝트 수정 (UPDATE)
export const updateProject = async (
  id: number,
  data: ProjectDataResponse,
  accessToken: string,
) => {
  try {
    const response = await axiosInstance.put(`/projects/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('프로젝트 수정 실패:', error)
    throw error
  }
}

// 프로젝트 삭제 (DELETE)
export const deleteProject = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/projects/${id}`)
    return response.data
  } catch (error) {
    console.error('프로젝트 삭제 실패:', error)
    throw error
  }
}

// 내가 작성한 프로젝트 목록 조회
export const getMyProjects = async () => {
  try {
    const response = await axiosInstance.get('/my/projects')
    return response.data
  } catch (error) {
    console.error('내가 작성한 프로젝트 목록 조회 실패:', error)
    throw error
  }
}

// 프로젝트 좋아요
export const likeProject = async (projectId: number) => {
  try {
    const response = await axiosInstance.post(`/projects/${projectId}/like`)
    return response.data
  } catch (error) {
    console.error('프로젝트 좋아요 실패:', error)
    throw error
  }
}

// 프로젝트 좋아요 취소
export const unlikeProject = async (projectId: number) => {
  try {
    const response = await axiosInstance.delete(`/projects/${projectId}/like`)
    return response.data
  } catch (error) {
    console.error('프로젝트 좋아요 취소 실패:', error)
    throw error
  }
}

// 프로젝트 검색
export const searchProject = async (keyword: string) => {
  try {
    const response = await axiosInstance.get('/projects/search', {
      params: { keyword },
    })
    return response.data
  } catch (error) {
    console.error('프로젝트 검색 실패:', error)
    throw error
  }
}
