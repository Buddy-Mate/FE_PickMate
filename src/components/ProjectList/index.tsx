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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {paginatedProjects.map((project, index) => (
        <ProjectCard
          key={index}
          id={project.id}
          title={project.title}
          techStack={project.techStack}
          authorProfile={project.authorProfile}
          authorNickname={project.authorNickname}
          likes={project.likes}
          views={project.views}
        />
      ))}
    </div>
  )
}
