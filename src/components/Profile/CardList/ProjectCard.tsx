import Button from '@/components/Button'
import { getProjectApplicants } from '@/libs/apis/apply'
import Link from 'next/link'
import { MouseEvent, useState, useEffect, useCallback } from 'react'

type ProjectCardProps = {
  type: 'register' | 'apply'
  title: string
  id: number
  likes: number
  views: number
  deadline: string
  status?: string
  applicant?: string
  message?: string
}

export default function ProjectCard({
  title,
  id,
  likes,
  views,
  deadline,
  status,
  applicant,
  message,
  type,
}: ProjectCardProps) {
  const [chatRoomUrl, setChatRoomUrl] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(status)
  const [applicantsList, setApplicantsList] = useState<
    {
      name: string
      status: string
      applicantNickname: string
      message: string
    }[]
  >([])

  const getApplicants = useCallback(async () => {
    if (id) {
      try {
        const data = await getProjectApplicants(id)
        setApplicantsList(data)
      } catch (error) {
        console.error('신청자 데이터 불러오기 실패:', error)
      }
    }
  }, [id])

  useEffect(() => {
    if (type === 'apply') {
      getApplicants()
    }
  }, [getApplicants, type])

  const handleAccept = () => {
    setModalOpen(true)
  }

  const handleReject = () => {
    setCurrentStatus('거절됨')
  }

  const handleModalSubmit = () => {
    setModalOpen(false)
  }

  const handleOutsideClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row">
      {/* 왼쪽: 프로젝트 정보 */}
      <Link
        href={`/project/${id}`}
        className="bg-custom-gray-300 flex w-full max-w-100 flex-col items-start justify-start rounded-lg p-4 text-sm transition-all hover:scale-105"
      >
        <p className="text-custom-blue text-2xl font-bold">{title}</p>
        <div className="flex flex-col gap-2">
          <div className="mt-2 text-sm text-gray-600">
            <p>
              <strong>좋아요</strong> {likes}
            </p>
            <p>
              <strong>조회수</strong> {views}
            </p>
            <p>
              <strong>마감일</strong>{' '}
              {deadline ? deadline.split('T')[0] : '정보 없음'}
            </p>
          </div>
        </div>
      </Link>

      {/* 오른쪽: 신청자 리스트 또는 상태 */}
      <div className="w-full flex-1 border-t pt-4 md:rounded-tl-lg md:border-l md:pt-0 md:pl-4">
        {type === 'register' ? (
          <>
            <p className="py-2 font-semibold">신청자 목록</p>
            <div className="flex h-60 flex-col gap-2 overflow-y-auto">
              {applicantsList.length > 0 ? (
                applicantsList.map((applicant, index) => (
                  <div
                    key={index}
                    className="bg-custom-gray-300 flex justify-between rounded-lg p-3"
                  >
                    <div>
                      <p className="bg-custom-yellow mb-2 w-fit rounded-full p-2 text-sm text-white">
                        {applicant.status}
                      </p>
                      <p className="text-custom-white font-semibold">
                        {applicant.applicantNickname}
                      </p>
                      <p className="text-custom-white text-sm">
                        {applicant.message}
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col items-end justify-end gap-4 md:flex-row md:items-center">
                      <Button
                        type="primary"
                        onClick={handleAccept}
                        className="max-w-24 text-sm"
                      >
                        수락
                      </Button>
                      <Button
                        type="tertiary"
                        onClick={handleReject}
                        className="max-w-24 text-sm"
                      >
                        거절
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">신청자가 없습니다.</p>
              )}
            </div>
          </>
        ) : (
          <div className="py-2 text-sm text-gray-600">
            <p>신청 상태: {currentStatus || '대기 중'}</p>
            {applicant && <p>신청자: {applicant}</p>}
            {message && <p>메시지: {message}</p>}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg"
          onClick={handleOutsideClick}
        >
          <div
            className="bg-custom-black min-w-100 rounded-lg border-2 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-xl font-semibold">🖥️ 채팅방 주소 입력</h2>
            <input
              type="text"
              value={chatRoomUrl}
              onChange={(e) => setChatRoomUrl(e.target.value)}
              className="text-custom-white focus:border-custom-white border-custom-gray-300 w-full rounded-lg border-2 bg-transparent px-4 py-3 outline-none"
              placeholder="채팅방 URL을 입력하세요"
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
