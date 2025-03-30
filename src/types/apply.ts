export type Applicant = {
  applicantNickname: string
  applicationId: number
  createdAt: string
  message: string
  openLink: string
  projectTitle: string
  studyTitle: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
}
