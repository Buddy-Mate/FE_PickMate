import Button from '@/components/Button'
import Link from 'next/link'
import { MouseEvent, useState } from 'react'

type StudyCardProps = {
  applicantNickname: string
  applicationId: number
  message: string
  studyTitle: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
  openLink?: string // 오픈 채팅방 링크
}

export default function AppliedStudyCard({
  applicantNickname,
  applicationId,
  message,
  studyTitle,
  status,
  openLink,
}: StudyCardProps) {
  const [modalOpen, setModalOpen] = useState(false)

  // 확인하기 버튼
  const handleAccept = () => {
    setModalOpen(true)
  }

  const handleReject = () => {
    // 거절 로직 추가 (예: 상태 업데이트)
  }

  const handleModalSubmit = () => {
    // 제출 로직 추가 (예: 채팅방 URL 처리)
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
        href={`/Study/${applicationId}`}
        className="bg-custom-gray-300 flex w-full max-w-100 flex-col items-start justify-start rounded-lg p-4 text-sm transition-all hover:scale-105"
      >
        <p className="text-custom-blue text-2xl font-bold">{studyTitle}</p>
      </Link>

      {/* 오른쪽: 신청자 정보 */}
      <div className="w-full flex-1 border-t pt-4 md:rounded-tl-lg md:border-l md:pt-0 md:pl-4">
        <p className="py-2 font-semibold">신청자 정보</p>
        <div className="bg-custom-gray-300 rounded-lg p-3">
          <p className="text-custom-white font-semibold">
            닉네임: {applicantNickname}
          </p>
          <p className="text-custom-white text-sm">메시지: {message}</p>
        </div>

        {/* 상태에 따른 버튼 표시 */}
        <div className="mt-4 flex justify-end gap-4">
          {status === 'PENDING' && (
            <Button
              type="tertiary"
              onClick={handleReject}
              className="max-w-24 text-sm"
            >
              신청 취소
            </Button>
          )}
          {status === 'ACCEPTED' && (
            <Button
              type="primary"
              onClick={handleAccept}
              className="max-w-24 text-sm"
            >
              쪽지 확인하기
            </Button>
          )}
        </div>
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
            <h2 className="mb-4 text-xl font-semibold">오픈 채팅방 링크</h2>
            {openLink ? (
              <p className="text-custom-white">{openLink}</p>
            ) : (
              <p className="text-gray-500">링크가 없습니다.</p>
            )}
            <div className="mt-4 flex w-full items-center justify-center gap-4">
              <Button
                type="primary"
                onClick={handleModalSubmit}
                className="max-w-30"
              >
                확인
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
