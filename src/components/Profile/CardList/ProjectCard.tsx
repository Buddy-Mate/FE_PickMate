import Button from '@/components/Button'
import { MouseEvent, useState } from 'react'

type ProjectCardProps = {
  title: string
  applicant?: string
  message?: string
  status: string
}

export default function ProjectCard({
  title,
  applicant,
  message,
  status,
}: ProjectCardProps) {
  const [chatRoomUrl, setChatRoomUrl] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(status)

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
    <div className="space-y-4 rounded-lg border p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <p className="text-custom-blue text-2xl font-bold">{title}</p>
      <div className="bg-custom-gray-300 flex items-center justify-between rounded-lg p-4 text-sm">
        <div className="flex flex-col items-start justify-center gap-2">
          <div className="rounded-full bg-yellow-500 px-4 py-2 text-center text-sm text-white">
            {currentStatus}
          </div>
          <p className="font-semibold">{applicant}</p>
          <p>{message}</p>
        </div>

        {currentStatus === '대기중' && (
          <div className="flex w-1/2 flex-col items-end justify-end gap-4 md:flex-row md:items-center">
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
