import { z } from 'zod'

export type SignupInput = z.infer<typeof signupSchema>

export const signupSchema = z
  .object({
    email: z
      .string()
      .email('유효한 이메일을 입력해주세요.')
      .min(1, '이메일은 필수입니다.'),
    nickname: z
      .string()
      .max(10, '열 자 이하로 작성해주세요.')
      .min(1, '닉네임은 필수입니다.'),
    password: z
      .string()
      .min(8, '8자 이상 입력해주세요.')
      .regex(/[a-z]/, '소문자가 포함되어야 합니다.')
      .regex(/[0-9]/, '숫자가 포함되어야 합니다.')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, '특수문자가 포함되어야 합니다.')
      .regex(/^\S*$/, '공백을 포함할 수 없습니다.')
      .min(1, '비밀번호는 필수입니다.'),
    confirmPassword: z.string().min(1, '비밀번호 확인은 필수입니다.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  })
