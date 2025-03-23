import Button from '@/components/Button'
import { projectSchema } from '@/utils/projectSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import remove from '@/assets/icons/remove.png'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '@/styles/customDatePicker.css'
import { useRouter } from 'next/router'
import { getProjectById, updateProject } from '@/libs/apis/project'
import Loading from '@/components/Loading'
import { GetServerSidePropsContext } from 'next'
import { getCookie } from 'cookies-next'
import { Project } from '@/types/project'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params?.id) {
    return { notFound: true }
  }

  const accessToken = await getCookie('accessToken', {
    req: context.req,
    res: context.res,
  })

  const project = await getProjectById(
    Number(context.params.id),
    accessToken || '',
  )

  return {
    props: {
      project,
    },
  }
}

type EditProjectProps = {
  project: Project
}

type FormData = {
  title: string
  description: string
  techStack: string[]
  deadline: string
}

export default function EditProject({ project }: EditProjectProps) {
  const router = useRouter()
  const { id } = router.query

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(projectSchema),
    mode: 'all',
    defaultValues: {
      title: project.title || '',
      description: project.description || '',
      techStack: project.techStack || [],
      deadline: project.deadline || '',
    },
  })

  const [stacks, setStacks] = useState<string[]>(project.techStack)
  const [stackTag, setStackTag] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(project.deadline),
  )
  const [isLoading, setIsLoading] = useState(false)

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
    const newStacks = stacks.filter((_, index) => index !== removeTagIndex)
    setStacks(newStacks)
  }

  // stacks 배열이 바뀔 때마다 react-hook-form에 주입
  useEffect(() => {
    setValue('techStack', stacks)
  }, [stacks, setValue])

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString()
      setValue('deadline', formattedDate)
    } else {
      setValue('deadline', '')
    }
  }, [selectedDate, setValue])

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    const accessToken = await getCookie('accessToken')
    try {
      await updateProject(Number(id), data, accessToken as string)
      alert('프로젝트 수정 성공!')
      router.push(`/project/${id}`)
    } catch (error) {
      alert('프로젝트 수정에 실패했습니다. 다시 시도해주세요.')
      console.error('프로젝트 수정 에러:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!project) return
  if (isLoading) return <Loading />

  return (
    <div className="mx-auto w-full max-w-[1200px] px-10 py-10">
      <h1 className="my-4 text-3xl font-bold">프로젝트 수정</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-2">
          <label className="text-xl font-semibold">📌 제목</label>
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
          <label className="text-xl font-semibold">📝 내용</label>
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
          <label className="text-xl font-semibold">⚒️ 기술 스택</label>
          <input
            type="text"
            value={stackTag}
            onChange={handleTagInput}
            onKeyDown={inputKeyDown}
            placeholder="태그를 입력하세요 (엔터를 누르면 태그가 적용돼요, 최대 8개) "
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
          {errors.techStack && (
            <p className="text-custom-red">{errors.techStack.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl font-semibold">📅 마감일</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date)
              clearErrors('deadline')
            }}
            minDate={new Date()}
            className="text-custom-white focus:border-custom-white border-custom-gray-200 w-full cursor-pointer rounded-lg border-2 bg-transparent px-4 py-3 outline-none"
            placeholderText="날짜를 선택하세요"
            dateFormat="yyyy-MM-dd"
          />
          {errors.deadline && (
            <p className="text-custom-red">{errors.deadline.message}</p>
          )}
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button
            type="secondary"
            className="max-w-30"
            onClick={() => router.back()}
          >
            취소하기
          </Button>
          <Button type="primary" className="max-w-30">
            수정하기{' '}
          </Button>
        </div>
      </form>
    </div>
  )
}
