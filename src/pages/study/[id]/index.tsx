import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import profile from '@/assets/icons/profile.png'
import Button from '@/components/Button'
import { MouseEvent, useState } from 'react'
import heartEmpty from '@/assets/icons/heartEmpty.png'
import heartFill from '@/assets/icons/heartFill.png'
import eyeVisible from '@/assets/icons/eyeVisible.png'
import { Study } from '@/types/study'
import { deleteStudy, getStudyById } from '@/libs/apis/study'
import { useAuthStore } from '@/store/authStore'
import { notify } from '@/components/Toast'
import { useRouter } from 'next/router'
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

type StudyDetailProps = {
  study: Study
}

export default function StudyDetail({ study }: StudyDetailProps) {
  const { user } = useAuthStore()
  const isAuthor = user?.nickname === study.authorNickname

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(study.likes)

  const [message, setMessage] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const router = useRouter()

  const toggleLike = () => {
    setLiked((prev) => !prev)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  const handleAccept = () => {
    setModalOpen(true)
  }

  const handleModalSubmit = () => {
    setModalOpen(false)
  }

  const handleOutsideClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false)
    }
  }

  const handleEdit = () => {
    router.push(`/edit/study/${study.id}`)
  }

  const handleDelete = async () => {
    try {
      await deleteStudy(study.id)
      notify('success', '스터디 삭제 성공!')
      router.push('/study')
    } catch (error) {
      notify('error', '스터디 삭제에 실패했습니다.')
      console.error('스터디 삭제 오류:', error)
      throw error
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-10">
      <div className="mb-4 flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-3xl font-bold text-white">
            {study.title}
          </h1>
        </div>
        <div className="flex items-center justify-between gap-1">
          <Image
            src={profile}
            alt="프로필 이미지"
            className="size-10 rounded-full object-cover"
          />
          <p>{study.authorNickname}</p>
        </div>
      </div>

      <div className="flex items-center justify-between py-2">
        <span className="text-primary text-lg">
          📅 {study.deadline.split('T')[0]} 까지
        </span>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <button
            onClick={toggleLike}
            className="flex cursor-pointer items-center gap-1"
          >
            <Image
              src={liked ? heartFill : heartEmpty}
              alt="좋아요"
              className="size-5"
            />
            <span>{likeCount}</span>
          </button>
          <div className="flex items-center gap-1">
            <Image src={eyeVisible} alt="조회수 아이콘" className="size-5" />
            <span>{study.views}</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-10">
        <h2 className="mb-2 text-2xl font-semibold">📄 프로젝트 설명</h2>
        <div className="text-custom-gray-200 max-h-100 overflow-y-auto">
          <div className="markdown-preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {study.description}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        {isAuthor ? (
          <div className="flex items-center justify-center gap-4">
            <Button type="secondary" className="max-w-100" onClick={handleEdit}>
              편집하기
            </Button>
            <Button
              type="tertiary"
              className="max-w-100"
              onClick={handleDelete}
            >
              삭제하기
            </Button>
          </div>
        ) : (
          <Button type="primary" className="max-w-100" onClick={handleAccept}>
            신청하기
          </Button>
        )}
      </div>
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg"
          onClick={handleOutsideClick}
        >
          <div
            className="bg-custom-black min-w-100 rounded-lg border-2 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-xl font-semibold">🖥️ 메세지 입력</h2>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="text-custom-white focus:border-custom-white border-custom-gray-300 w-full rounded-lg border-2 bg-transparent px-4 py-3 outline-none"
              placeholder="작성자에게 보낼 메세지를 입력하세요"
            />
            <div className="mt-4 flex w-full items-center justify-center gap-4">
              <Button
                type="primary"
                onClick={handleModalSubmit}
                className="max-w-30"
              >
                제출
              </Button>
              <Button
                type="tertiary"
                onClick={() => setModalOpen(false)}
                className="max-w-30"
              >
                취소
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
