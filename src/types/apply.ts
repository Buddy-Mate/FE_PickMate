export type Applicant = {
  applicantNickname: string
  applicationId: number
  createdAt: string
  message: string
  openLink: string
  projectId?: number
  projectTitle?: string
  studyId?: number
  studyTitle?: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
}
