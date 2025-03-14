import React from 'react'
import StudyCard from './StudyCard'
import { STUDIES } from '@/constants/STUDIES'

type StudyListProps = {
  currentPage: number
}

export default function StudyList({ currentPage }: StudyListProps) {
  const studiesPerPage = 6
  const startIndex = (currentPage - 1) * studiesPerPage

  const paginatedStudies = STUDIES.slice(
    startIndex,
    startIndex + studiesPerPage,
  )

  return (
    <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {paginatedStudies.map((study, index) => (
        <StudyCard key={index} study={study} />
      ))}
    </div>
  )
}
