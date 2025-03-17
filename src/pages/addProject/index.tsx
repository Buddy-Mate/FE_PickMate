import Button from '@/components/Button'
import { projectSchema } from '@/utils/projectSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import remove from '@/assets/icons/remove.png'

type FormData = {
  title: string
  description: string
  stack: string[]
  deadline: string
}

export default function AddProject() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(projectSchema),
    mode: 'all',
  })

  const [stacks, setStacks] = useState<string[]>([])
  const [stackTag, setStackTag] = useState('')

  const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    setStackTag(e.target.value)
  }

  const inputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && stackTag) {
      if (!stacks.includes(stackTag)) {
        setStacks([...stacks, stackTag])
      }
      setStackTag('')
      e.preventDefault()
    }
  }

  const removeTag = (removeTagIndex: number) => {
    const newstacks = stacks.filter((_, index) => index !== removeTagIndex)
    setStacks(newstacks)
  }

  // stacks 배열이 바뀔 때마다 react-hook-form에 주입
  useEffect(() => {
    setValue('stack', stacks)
  }, [stacks, setValue])

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
            placeholder="제목을 입력하세요"
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
            placeholder="어떤 개발자를 모집하고 싶은지, 구현하고 싶은 기능이나 목표 등을 작성해주세요"
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
            value={stackTag}
            onChange={handleTagInput}
            onKeyDown={inputKeyDown}
            placeholder="태그를 입력하세요 (엔터를 누르면 태그가 적용돼요, 최대 8개)"
            className="text-custom-white focus:border-custom-white border-custom-gray-200 rounded-lg border-2 bg-transparent px-4 py-3 outline-none"
          />
          <div className="flex flex-wrap gap-2">
            {stacks.map((stack, index) => (
              <div
                key={index}
                className="bg-primary text-custom-white flex items-center gap-1 rounded-full px-4 py-2"
              >
                {stack}
                <Image
                  src={remove}
                  onClick={() => removeTag(index)}
                  className="h-5 w-5 cursor-pointer"
                  alt="Remove tag"
                />
              </div>
            ))}
          </div>
          {stacks.length > 8 && (
            <p className="text-custom-red">
              기술 스택은 최대 8개까지 입력할 수 있습니다
            </p>
          )}
          {errors.stack && (
            <p className="text-custom-red">{errors.stack.message}</p>
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
