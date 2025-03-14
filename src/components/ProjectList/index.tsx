import { PROJECTS } from '@/constants/PROJECTS'
import ProjectCard from './ProjectCard'

type ProjectListProps = {
  currentPage: number
}

export default function ProjectList({ currentPage }: ProjectListProps) {
  const projectsPerPage = 6
  const startIndex = (currentPage - 1) * projectsPerPage

  const paginatedProjects = PROJECTS.slice(
    startIndex,
    startIndex + projectsPerPage,
  )

  return (
    <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {paginatedProjects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  )
}
