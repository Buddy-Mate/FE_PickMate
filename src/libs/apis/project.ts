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
