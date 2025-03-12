import { z } from 'zod'

export type LoginInput = z.infer<typeof loginSchema>

export const loginSchema = z.object({
  email: z
    .string()
    .email('유효한 이메일을 입력해주세요.')
    .min(1, '이메일은 필수입니다.'),
  password: z
    .string()
    .min(8, '8자 이상 입력해주세요.')
    .regex(/[a-z]/, '소문자가 포함되어야 합니다.')
    .regex(/[0-9]/, '숫자가 포함되어야 합니다.')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, '특수문자가 포함되어야 합니다.')
    .regex(/^\S*$/, '공백을 포함할 수 없습니다.')
    .min(1, '비밀번호는 필수입니다.'),
})
