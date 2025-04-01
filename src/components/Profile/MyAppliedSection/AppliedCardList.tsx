import { useState } from 'react'
import AppliedProjectCard from './AppliedProjectCard'
import AppliedStudyCard from './AppliedStudyCard'
import Pagination from '@/components/Pagination'
import { Applicant } from '@/types/apply'

type AppliedCardListProps = {
  tab: 'project' | 'study'
  projects?: Applicant[]
  studies?: Applicant[]
  onCancel: (applicationId: number) => void
}

export default function AppliedCardList({
  tab,
  projects,
  studies,
  onCancel,
}: AppliedCardListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2

  const data = tab === 'project' ? projects : studies

  if (!data || data.length === 0) {
    return (
      <div className="mt-20 flex items-center justify-center p-10">
        <p className="text-gray-500">아직 신청 내역이 없습니다.</p>
      </div>
    )
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = data.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(data.length / itemsPerPage)

  return (
    <div className="mt-4 space-y-4">
      {currentData.map((applicant) =>
        tab === 'project' ? (
          <AppliedProjectCard
            key={applicant.applicationId}
            applicantNickname={applicant.applicantNickname}
            applicationId={applicant.applicationId}
            message={applicant.message}
            projectTitle={applicant.projectTitle || ''}
            status={applicant.status}
            openLink={applicant.openLink}
            onCancel={onCancel}
          />
        ) : (
          <AppliedStudyCard
            key={applicant.applicationId}
            applicantNickname={applicant.applicantNickname}
            applicationId={applicant.applicationId}
            message={applicant.message}
            studyTitle={applicant.studyTitle || ''}
            status={applicant.status}
            openLink={applicant.openLink}
            onCancel={onCancel}
          />
        ),
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}
