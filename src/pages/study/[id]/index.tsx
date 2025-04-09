import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import profile from '@/assets/icons/profile.png'
import Button from '@/components/Button'
import { useCallback, useEffect, useState } from 'react'
import eyeVisible from '@/assets/icons/eyeVisible.png'
import { Study } from '@/types/study'
import { deleteStudy, getStudyById } from '@/libs/apis/study'
import { useAuthStore } from '@/store/authStore'
import { notify } from '@/components/Toast'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { applyStudy, getAppliedStudies } from '@/libs/apis/apply'
import { Applicant } from '@/types/apply'
import LikeButton from '@/components/LikeButton'
import Modal from '@/components/Modal'
import useModal from '@/hooks/useModal'

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
  const router = useRouter()
  const { id } = router.query
  const studyId = Number(id)

  const { user } = useAuthStore()
  const isAuthor = user?.nickname === study.authorNickname
  const [hasApplied, setHasApplied] = useState(false)

  const [message, setMessage] = useState('')

  const [isClosed, setIsClosed] = useState(false)

  const { isOpen, closeModal, openModal } = useModal()

  // 이미 신청한 스터디인지 확인
  const checkIfApplied = useCallback(async () => {
    try {
      const appliedStudies: Applicant[] = await getAppliedStudies()
      const isAlreadyApplied = appliedStudies.some(
        (appliedStudy) => appliedStudy.studyId === study.id,
      )
      setHasApplied(isAlreadyApplied)
    } catch (error) {
      console.error('신청 여부 확인 실패:', error)
    }
  }, [study.id])

  useEffect(() => {
    if (user) {
      checkIfApplied()
    }
  }, [user, study.id, checkIfApplied])

  // 스터디디 마감일 체크
  useEffect(() => {
    const deadlineDate = new Date(study.deadline)
    const currentDate = new Date()

    // 마감일이 지나면 마감 처리
    if (currentDate > deadlineDate) {
      setIsClosed(true)
    }
  }, [study.deadline])

  const handleAccept = () => {
    openModal()
  }

  const handleModalSubmit = async () => {
    try {
      await applyStudy(study.id, message)
      closeModal()
      notify('success', '스터디 신청 완료!')
      router.push('/my')
    } catch (error) {
      console.error('스터디 신청 실패:', error)
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
          <LikeButton id={studyId} initialLikes={study.likes} type="study" />

          <div className="flex items-center gap-1">
            <Image src={eyeVisible} alt="조회수 아이콘" className="size-5" />
            <span>{study.views}</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-10">
        <h2 className="mb-2 text-2xl font-semibold">📄 프로젝트 설명</h2>
        <div className="text-custom-gray-200 min-h-100">
          <div className="markdown-preview min-h-100">
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
        ) : isClosed ? (
          <Button type="tertiary" className="max-w-100" disabled>
            마감되었어요.
          </Button>
        ) : hasApplied ? (
          <Button type="tertiary" className="max-w-100" disabled>
            이미 신청했어요.
          </Button>
        ) : (
          <Button type="primary" className="max-w-100" onClick={handleAccept}>
            신청하기
          </Button>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
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
          <Button type="tertiary" onClick={closeModal} className="max-w-30">
            취소
          </Button>
        </div>
      </Modal>
    </div>
  )
}
