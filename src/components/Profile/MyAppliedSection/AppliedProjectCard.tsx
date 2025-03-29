import Button from '@/components/Button'
import { MouseEvent, useState } from 'react'

type ProjectCardProps = {
  applicantNickname: string
  applicationId: number
  message: string
  projectTitle: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
  openLink?: string // 오픈 채팅방 링크
}

export default function AppliedProjectCard({
  message,
  projectTitle,
  status,
  openLink,
}: ProjectCardProps) {
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
    <div className="flex flex-row items-center justify-between gap-4 rounded-lg border p-4">
      <div>
        <p className="text-custom-blue text-2xl font-bold">{projectTitle}</p>
        <p className="text-custom-white pt-2 text-sm">📝 {message}</p>
      </div>
      <div className="flex justify-end gap-4">
        {status === 'PENDING' && (
          <Button
            type="tertiary"
            onClick={handleReject}
            className="max-w-40 text-sm"
          >
            신청 취소
          </Button>
        )}
        {status === 'ACCEPTED' && (
          <Button
            type="primary"
            onClick={handleAccept}
            className="max-w-40 text-sm"
          >
            쪽지 확인하기
          </Button>
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
