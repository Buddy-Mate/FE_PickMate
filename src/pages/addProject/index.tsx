import Button from '@/components/Button'
import { projectSchema } from '@/utils/projectSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

type FormData = {
  title: string
  description: string
  techStack: string
  deadline: string
}

export default function AddProject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(projectSchema),
    mode: 'all',
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] px-10 py-10">
      <h1 className="my-4 text-3xl font-bold">프로젝트 등록</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-2">
          <label className="text-xl font-semibold">제목</label>
          <input
            type="text"
            {...register('title')}
            className="text-custom-white focus:border-custom-white border-custom-gray-200 rounded-lg border-2 bg-transparent px-4 py-3 outline-none"
          />
          {errors.title && (
            <p className="text-custom-red">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl font-semibold">내용</label>
          <textarea
            {...register('description')}
            className="text-custom-white focus:border-custom-white border-custom-gray-200 h-100 resize-none rounded-lg border-2 bg-transparent px-4 py-3 outline-none"
          />
          {errors.description && (
            <p className="text-custom-red">{errors.description.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl font-semibold">기술 스택</label>
          <input
            type="text"
            {...register('techStack')}
            placeholder="ex) React, TypeScript"
            className="text-custom-white focus:border-custom-white border-custom-gray-200 rounded-lg border-2 bg-transparent px-4 py-3 outline-none"
          />
          {errors.techStack && (
            <p className="text-custom-red">{errors.techStack.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl font-semibold">마감일</label>
          <input
            type="date"
            {...register('deadline')}
            className="text-custom-white focus:border-custom-white border-custom-gray-200 rounded-lg border-2 bg-transparent px-4 py-3 outline-none"
          />
          {errors.deadline && (
            <p className="text-custom-red">{errors.deadline.message}</p>
          )}
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button type="secondary" className="max-w-30">
            취소하기
          </Button>
          <Button type="primary" className="max-w-30">
            등록하기
          </Button>
        </div>
      </form>
    </div>
  )
}
