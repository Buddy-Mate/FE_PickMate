import { User } from './auth'

export type Project = {
  id: number
  title: string
  description: string
  stack: string[]
  deadline: string
  author: User
  likes: number
  views: number
  createdAt: string
  updatedAt: string
}
