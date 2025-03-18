import { Project } from './project'

export type LoginResponse = {
  email: string
  password: string
}

export type SignupResponse = {
  email: string
  nickname: string
  password: string
}

export type User = {
  id: number
  email: string
  nickname: string
  bio?: string
  writtenPosts: Project[] // 내가 쓴 게시글들 (작성한 프로젝트들)
  appliedPosts: Project[] // 내가 신청한 게시글들 (신청한 프로젝트들)
}
