export type StudyDataResponse = {
  title: string
  description: string
  deadline: string
}

export type Study = {
  id: number
  title: string
  description: string
  deadline: string
  authorNickname: string
  authorProfile: string
  likes: number
  views: number
  createdAt: string
  updatedAt: string
}
