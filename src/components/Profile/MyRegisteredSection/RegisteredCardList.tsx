import { Project } from '@/types/project'
import { Study } from '@/types/study'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import RegisteredProjectCard from './RegisteredProjectCard'
import RegisteredStudyCard from './RegisteredStudyCard'

type RegisteredCardListProps = {
  tab: 'project' | 'study'
  projects?: Project[]
  studies?: Study[]
}

export default function RegisteredCardList({
  tab,
  projects,
  studies,
}: RegisteredCardListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2

  const data = tab === 'project' ? projects : studies

  if (!data || data.length === 0) {
    return (
      <div className="mt-20 flex items-center justify-center p-10">
        <p className="text-gray-500">아직 등록한 글이 없습니다.</p>
      </div>
    )
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = data.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil((data.length || 0) / itemsPerPage)

  return (
    <div className="mt-4 space-y-4">
      {tab === 'project'
        ? currentData.map((item) => (
            <RegisteredProjectCard
              key={item.id}
              id={item.id}
              title={item.title}
              likes={item.likes}
              views={item.views}
              deadline={item.deadline}
            />
          ))
        : currentData.map((item) => (
            <RegisteredStudyCard
              key={item.id}
              id={item.id}
              title={item.title}
              likes={item.likes}
              views={item.views}
              deadline={item.deadline}
            />
          ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}
