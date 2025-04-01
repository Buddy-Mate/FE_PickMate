import Button from '@/components/Button'
import { notify } from '@/components/Toast'
import { cancelStudyApplication } from '@/libs/apis/apply'
import { MouseEvent, useState } from 'react'

type StudyCardProps = {
  applicantNickname: string
  applicationId: number
  message: string
  studyTitle: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
  openLink: string
  onCancel: (applicationId: number) => void
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'PENDING':
      return { background: 'bg-yellow-400', label: '대기중' }
    case 'ACCEPTED':
      return { background: 'bg-blue-400', label: '수락됨' }
    case 'REJECTED':
      return { background: 'bg-red-400', label: '거절됨' }
    default:
      return { background: 'bg-gray-300', label: '정보 없음' }
  }
}

export default function AppliedStudyCard({
  message,
  studyTitle,
  applicationId,
  status,
  openLink,
  onCancel,
}: StudyCardProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const statusStyle = getStatusStyle(status)

  const handleConfirm = () => {
    setModalOpen(true)
  }

  const handleCancel = async (applicationId: number) => {
    try {
      await cancelStudyApplication(applicationId)
      onCancel(applicationId)
      notify('success', '신청 취소 성공!')
    } catch (error) {
      console.error(error)
      notify('error', '신청 취소에 실패했습니다. 다시 시도해주세요.')
    }
  }
  const handleOutsideClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false)
    }
  }

  return (
    <div className="flex flex-row items-center justify-between gap-4 rounded-lg border p-4">
      <div>
        <p
          className={`mb-2 w-fit rounded-full p-2 text-sm text-white ${statusStyle.background}`}
        >
          {statusStyle.label}
        </p>
        <p className="text-custom-blue text-2xl font-bold">{studyTitle}</p>
        <p className="text-custom-white pt-2 text-sm">📝 {message}</p>
      </div>
      <div className="flex justify-end gap-4">
        <div className="flex flex-col items-center">
          {status === 'PENDING' && (
            <Button
              type="tertiary"
              onClick={() => handleCancel(applicationId)}
              className="max-w-40 text-sm"
            >
              신청 취소
            </Button>
          )}
          {status === 'ACCEPTED' && (
            <Button
              type="primary"
              onClick={handleConfirm}
              className="max-w-40 text-sm"
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
            <h2 className="mb-4 text-xl font-semibold">🖥️ 오픈 채팅방 링크</h2>
            {openLink && openLink !== '' ? (
              <p className="text-custom-white rounded-lg border p-2">
                {openLink}
              </p>
            ) : (
              <p className="text-gray-500">링크가 없습니다.</p>
            )}
            <div className="mt-4 flex w-full items-center justify-center gap-4">
              <Button
                type="primary"
                onClick={() => setModalOpen(false)}
                className="max-w-30"
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
