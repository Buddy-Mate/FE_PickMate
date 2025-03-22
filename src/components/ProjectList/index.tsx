import ProjectCard from './ProjectCard'
import { Project } from '@/types/project'

type ProjectListProps = {
  projects: Project[]
  currentPage: number
  itemsPerPage: number
}

export default function ProjectList({
  projects = [],
  currentPage,
  itemsPerPage,
}: ProjectListProps) {
  const startIndex = (currentPage - 1) * itemsPerPage

  const paginatedProjects = projects.slice(
    startIndex,
    startIndex + itemsPerPage,
  )

  if (projects.length === 0) {
    return <div>프로젝트가 없습니다.</div>
  }

  return (
    <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {paginatedProjects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  )
}
