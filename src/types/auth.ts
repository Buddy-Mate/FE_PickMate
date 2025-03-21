import { Project } from './project'
import { Study } from './study'

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
  writtenProjects: Project[]
  writtenStudies: Study[]
  appliedProjects: Project[]
  appliedStudies: Study[]
}
