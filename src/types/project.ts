export type ProjectDataResponse = {
  title: string
  description: string
  stack: string[]
  deadline: string
}

export type Project = {
  id: number
  title: string
  description: string
  stack: string[]
  deadline: string
  author: {
    userId: number
    userNickname: string
  }
  likes: number
  views: number
  createdAt: string
  updatedAt: string
}
