import { User } from './auth'

export type Study = {
  id: number
  title: string
  description: string
  deadline: string
  author: User
  likes: number
  views: number
  createdAt: string
  updatedAt: string
}
