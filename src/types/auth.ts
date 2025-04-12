import { StaticImageData } from 'next/image'

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
  profileImage?: string | StaticImageData
}
