import axiosInstance from '../axiosInstance'

// 프로젝트 신청하기
export const applyProject = async (projectId: number, message: string) => {
  try {
    const response = await axiosInstance.post(
      `/project-applications/${projectId}`,
      { message },
    )
    return response.data
  } catch (error) {
    console.error('프로젝트 신청하기 실패:', error)
    throw error
  }
}

// 내가 신청한 프로젝트 조회
export const getAppliedProjects = async () => {
  try {
    const response = await axiosInstance.get('/project-applications/applied')
    return response.data
  } catch (error) {
    console.error('내가 신청한 프로젝트 조회 실패:', error)
    throw error
  }
}

// 특정 프로젝트의 신청자 조회
export const getProjectApplicants = async (projectId: number) => {
  try {
    const response = await axiosInstance.get(
      `/project-applications/received/${projectId}`,
    )
    return response.data
  } catch (error) {
    console.error('특정 프로젝트의 신청자 조회 실패:', error)
    throw error
  }
}

// 스터디 신청하기
export const applyStudy = async (studyId: number, message: string) => {
  try {
    const response = await axiosInstance.post(
      `/study-applications/${studyId}`,
      { message },
    )
    return response.data
  } catch (error) {
    console.error('스터디 신청하기 실패:', error)
    throw error
  }
}

// 내가 신청한 스터디 조회
export const getAppliedStudies = async () => {
  try {
    const response = await axiosInstance.get('/study-applications/applied')
    return response.data
  } catch (error) {
    console.error('내가 신청한 스터디 조회 실패:', error)
    throw error
  }
}

// 특정 스터디의 신청자 조회
export const getStudyApplicants = async (studyId: number) => {
  try {
    const response = await axiosInstance.get(
      `/study-applications/received/${studyId}`,
    )
    return response.data
  } catch (error) {
    console.error('특정 스터디의 신청자 조회 실패:', error)
    throw error
  }
}
