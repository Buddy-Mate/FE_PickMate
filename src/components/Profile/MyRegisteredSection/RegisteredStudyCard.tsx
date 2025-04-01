import Button from '@/components/Button'
import { notify } from '@/components/Toast'
import {
  acceptStudyApplication,
  getStudyApplicants,
  rejectStudyApplication,
} from '@/libs/apis/apply'
import { Applicant } from '@/types/apply'
import Link from 'next/link'
import { MouseEvent, useState, useEffect, useCallback } from 'react'

type StudyCardProps = {
  title: string
  id: number
  likes: number
  views: number
  deadline: string
  status?: string
}

export default function RegisteredStudyCard({
  title,
  id,
  likes,
  views,
  deadline,
  // status,
}: StudyCardProps) {
  const [chatRoomUrl, setChatRoomUrl] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const [applicantsList, setApplicantsList] = useState<Applicant[]>([])
  const [applicationIdToAccept, setApplicationIdToAccept] = useState<
    number | null
  >(null)

  const getApplicants = useCallback(async () => {
    if (id) {
      try {
        const data = await getStudyApplicants(id)
        setApplicantsList(data)
      } catch (error) {
        console.error('신청자 데이터 불러오기 실패:', error)
      }
    }
  }, [id])

  useEffect(() => {
    getApplicants()
  }, [getApplicants])

  const handleAccept = (applicationId: number) => {
    setModalOpen(true)
    setApplicationIdToAccept(applicationId)
  }

  const handleReject = async (applicationId: number) => {
    try {
      await rejectStudyApplication(applicationId)
      setApplicantsList((prev) =>
        prev.map((applicant) =>
          applicant.applicationId === applicationId
            ? { ...applicant, status: 'REJECTED' }
            : applicant,
        ),
      )
      notify('success', '지원을 거절했습니다!')
    } catch (error) {
      console.error('거절 실패:', error)
    }
  }

  const handleModalSubmit = async () => {
    if (!chatRoomUrl) {
      notify('error', '채팅방 URL을 입력하세요.')
      return
    }
    if (applicationIdToAccept === null) {
      notify('error', '유효하지 않은 신청입니다.')
      return
    }
    try {
      await acceptStudyApplication(applicationIdToAccept, chatRoomUrl)

      setApplicantsList((prev) =>
        prev.map((applicant) =>
          applicant.applicationId === applicationIdToAccept
            ? { ...applicant, status: 'ACCEPTED' }
            : applicant,
        ),
      )

      setModalOpen(false)
      notify('success', '신청을 수락했습니다!')
    } catch (error) {
      notify('error', '신청 수락에 실패했습니다.')
      console.error('신청 수락 실패:', error)
    }
  }

  const handleOutsideClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false)
    }
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

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4 lg:flex-row">
      {/* 왼쪽: 스터디 정보 */}
      <Link
        href={`/study/${id}`}
        className="bg-custom-gray-300 flex w-full flex-col items-start justify-between rounded-lg p-4 text-sm transition-all lg:max-w-100"
      >
        <p className="text-custom-blue text-2xl font-bold">{title}</p>
        <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600">
          <p>
            <strong>♥️ 좋아요</strong> {likes}
          </p>
          <p>
            <strong>👁️ 조회수</strong> {views}
          </p>
          <p>
            <strong>📅 마감일</strong>{' '}
            {deadline ? deadline.split('T')[0] : '정보 없음'}
          </p>
        </div>
      </Link>

      {/* 오른쪽: 신청자 리스트 */}
      <div className="w-full flex-1 border-t pt-4 md:rounded-tl-lg md:border-l md:pt-0 md:pl-4">
        <p className="py-2 font-semibold">신청자 목록</p>
        <div className="flex h-60 flex-col gap-2 overflow-y-auto">
          {applicantsList.length > 0 ? (
            applicantsList.map((applicant, index) => {
              const statusStyle = getStatusStyle(applicant.status)
              return (
                <div
                  key={index}
                  className="bg-custom-gray-300 flex justify-between rounded-lg p-3"
                >
                  <div>
                    <p
                      className={`mb-2 w-fit rounded-full p-2 text-sm text-white ${statusStyle.background}`}
                    >
                      {statusStyle.label}
                    </p>
                    <p className="text-custom-white font-semibold">
                      {applicant.applicantNickname}
                    </p>
                    <p className="text-custom-white text-sm">
                      {applicant.message}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col items-end justify-end gap-4 md:flex-row md:items-center">
                    {applicant.status === 'PENDING' && (
                      <>
                        <Button
                          type="primary"
                          onClick={() => handleAccept(applicant.applicationId)}
                          className="max-w-24 text-sm"
                        >
                          수락
                        </Button>
                        <Button
                          type="tertiary"
                          onClick={() => handleReject(applicant.applicationId)}
                          className="max-w-24 text-sm"
                        >
                          거절
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-gray-500">신청자가 없습니다.</p>
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
