import { Project } from '@/types/project'
import ProjectCard from './ProjectCard'
import StudyCard from './StudyCard'
import { Study } from '@/types/study'
import { useState } from 'react'
import Pagination from '@/components/Pagination'

type CardListProps = {
  tab: 'project' | 'study'
  type: 'register' | 'apply'
  projects?: Project[]
  studies?: Study[]
}

export default function CardList({
  tab,
  projects,
  studies,
  type,
}: CardListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2

  const data = tab === 'project' ? projects : studies

  if (!data || data.length === 0) {
    if (type === 'register') {
      return (
        <div className="mt-20 flex items-center justify-center p-10">
          <p className="text-gray-500">아직 등록한 글이 없습니다.</p>
        </div>
      )
    } else {
      return (
        <div className="mt-20 flex items-center justify-center p-10">
          <p className="text-gray-500">아직 지원한 내역이 없습니다.</p>
        </div>
      )
    }
  }
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = data.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil((data.length || 0) / itemsPerPage)

  return (
    <div className="mt-4 space-y-4">
      {tab === 'project'
        ? currentData.map((item) => (
            <ProjectCard
              key={item.id}
              type={type}
              id={item.id}
              title={item.title}
              likes={item.likes}
              views={item.views}
              deadline={item.deadline}
            />
          ))
        : currentData.map((item) => (
            <StudyCard
              key={item.id}
              type={type}
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
