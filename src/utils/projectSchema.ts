import { z } from 'zod'

export type ProjectInput = z.infer<typeof projectSchema>

export const projectSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  description: z.string().min(1, '본문은 필수입니다'),
  stack: z
    .array(z.string())
    .min(1, '기술 스택을 1개 이상 입력해주세요')
    .max(8, '최대 8개까지 입력할 수 있습니다'),
  deadline: z.string().min(1, '마감일을 선택해주세요'),
})
