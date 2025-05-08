export type ProjectDataResponse = {
  title: string
  description: string
  techStack: string[]
  deadline: string
}

export type Project = {
  id: number
  title: string
  description: string
  techStack: string[]
  deadline: string
  authorNickname: string
  authorProfile: string
  likes: number
  views: number
  createdAt: string
  updatedAt: string
}
