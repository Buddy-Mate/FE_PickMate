import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { notify } from '@/components/Toast'
import useModal from '@/hooks/useModal'
import { cancelProjectApplication } from '@/libs/apis/apply'

type ProjectCardProps = {
  applicantNickname: string
  applicationId: number
  message: string
  projectTitle: string
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

export default function AppliedProjectCard({
  message,
  projectTitle,
  applicationId,
  status,
  openLink,
  onCancel,
}: ProjectCardProps) {
  const { isOpen, closeModal, openModal } = useModal()

  const statusStyle = getStatusStyle(status)

  const handleConfirm = () => {
    openModal()
  }

  const handleCancel = async (applicationId: number) => {
    try {
      await cancelProjectApplication(applicationId)
      onCancel(applicationId)
      notify('success', '신청 취소 성공!')
    } catch (error) {
      console.error(error)
      notify('error', '신청 취소에 실패했습니다. 다시 시도해주세요.')
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
        <p className="text-custom-blue text-2xl font-bold">{projectTitle}</p>
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
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="mb-4 text-xl font-semibold">🖥️ 오픈 채팅방 링크</h2>
        {openLink && openLink !== '' ? (
          <p className="text-custom-white rounded-lg border p-2">{openLink}</p>
        ) : (
          <p className="text-gray-500">링크가 없습니다.</p>
        )}
        <div className="mt-4 flex w-full items-center justify-center gap-4">
          <Button type="primary" onClick={closeModal} className="max-w-30">
            확인
          </Button>
        </div>
      </Modal>
    </div>
  )
}
