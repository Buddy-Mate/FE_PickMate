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
  introduction?: string
  profileImageUrl?: string | null
}
