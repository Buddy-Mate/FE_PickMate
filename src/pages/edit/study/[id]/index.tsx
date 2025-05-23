import Button from '@/components/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { MouseEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'
import { GetServerSidePropsContext } from 'next'
import { getCookie } from 'cookies-next'
import { notify } from '@/components/Toast'
import { getStudyById, updateStudy } from '@/libs/apis/study'
import { Study } from '@/types/study'
import { studySchema } from '@/utils/studySchema'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params?.id) {
    return { notFound: true }
  }

  const study = await getStudyById(Number(context.params.id))

  return {
    props: {
      study,
    },
  }
}

type EditStudyProps = {
  study: Study
}

type FormData = {
  title: string
  description: string
  deadline: string
}

export default function EditStudy({ study }: EditStudyProps) {
  const router = useRouter()
  const { id } = router.query

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(studySchema),
    mode: 'all',
    defaultValues: {
      title: study.title || '',
      description: study.description || '',
      deadline: study.deadline || '',
    },
  })

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(study.deadline),
  )
  const [description, setDescription] = useState(study.description || '')

  const [isLoading, setIsLoading] = useState(false)

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
      await updateStudy(Number(id), data, accessToken as string)
      notify('success', '스터디 수정 성공!')
      setTimeout(() => {
        router.push(`/study/${id}`)
      }, 1000)
    } catch (error) {
      notify('error', '스터디 수정에 실패했습니다. 다시 시도해주세요.')
      console.error('스터디 수정 에러:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!study) return
  if (isLoading) return <Loading />

  return (
    <div className="mx-auto w-full max-w-[1200px] px-10 py-10">
      <h1 className="my-4 text-3xl font-bold">스터디 수정</h1>
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
          <div className="flex w-full flex-col items-start justify-center gap-2 md:flex-row">
            <textarea
              {...register('description')}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              placeholder="스터디 목표와 함께 학습하고 싶은 분야를 자유롭게 작성해주세요(마크다운 가능)"
              className="text-custom-white focus:border-custom-white border-custom-gray-200 h-100 w-full resize-none rounded-lg border-2 bg-transparent px-4 py-3 outline-none md:h-200 md:w-1/2"
            />
            <div className="markdown-preview h-100 w-full md:h-200 md:w-1/2">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {description}
              </ReactMarkdown>
            </div>
          </div>
          {errors.description && (
            <p className="text-custom-red">{errors.description.message}</p>
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
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              router.back()
            }}
          >
            취소하기
          </Button>
          <Button type="primary" className="max-w-30" disabled={isLoading}>
            {isLoading ? '수정중...' : '수정하기'}
          </Button>
        </div>
      </form>
    </div>
  )
}
