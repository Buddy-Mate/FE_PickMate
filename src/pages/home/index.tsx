/* eslint-disable @typescript-eslint/no-unused-vars */
import ProjectBanner from '@/components/Banner/ProjectBanner'
import Dropdown from '@/components/Dropdown'
import Pagination from '@/components/Pagination'
import ProjectList from '@/components/ProjectList'
import SearchBar from '@/components/SearchBar'
import { getAllProjects } from '@/libs/apis/project'
import { useAuthStore } from '@/store/authStore'
import { User } from '@/types/auth'
import { Project } from '@/types/project'
import { useEffect, useState } from 'react'

export async function getServerSideProps() {
  const projects = await getAllProjects()
  return {
    props: { projects },
  }
}

type HomeProps = {
  projects: Project[]
  user: User
}

export default function HomePage({ projects, user }: HomeProps) {
  const [sortedProjects, setSortedProjects] = useState<Project[]>(projects)
  const [sortOption, setSortOption] = useState('최신순')

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(projects.length / itemsPerPage)

  const { setUser } = useAuthStore()

  useEffect(() => {
    if (user) {
      setUser(user)
    }
  }, [user, setUser])

  const handleSortChange = (option: string) => {
    setSortOption(option)
    const sorted = [...projects]

    switch (option) {
      case '최신순':
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        break
      case '좋아요순':
        sorted.sort((a, b) => b.likes - a.likes)
        break
      case '조회순':
        sorted.sort((a, b) => b.views - a.views)
        break
      default:
        break
    }

    setSortedProjects(sorted)
  }

  // projects가 변경될 때 최신순으로 정렬
  useEffect(() => {
    const sorted = [...projects].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    setSortedProjects(sorted)
  }, [projects])

  return (
    <div>
      <ProjectBanner />
      <div className="mx-auto w-full max-w-[1200px] px-10 py-10">
        <div className="flex items-center justify-start gap-4 py-10">
          <Dropdown onSelect={handleSortChange} />
          <SearchBar />
        </div>
        <ProjectList
          currentPage={currentPage}
          projects={sortedProjects}
          itemsPerPage={itemsPerPage}
        />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}
