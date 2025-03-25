import React from 'react'
import StudyCard from './StudyCard'
import { Study } from '@/types/study'

type StudyListProps = {
  studies: Study[]
  currentPage: number
  itemsPerPage: number
}

export default function StudyList({
  studies = [],
  currentPage,
  itemsPerPage,
}: StudyListProps) {
  const startIndex = (currentPage - 1) * itemsPerPage

  const paginatedStudies = studies.slice(startIndex, startIndex + itemsPerPage)

  if (studies.length === 0) {
    return <div>스터디가 없습니다.</div>
  }

  return (
    <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {paginatedStudies.map((study, index) => (
        <StudyCard key={index} study={study} />
      ))}
    </div>
  )
}
