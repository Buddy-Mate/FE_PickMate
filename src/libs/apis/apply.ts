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
