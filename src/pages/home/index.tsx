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

export async function getStaticProps() {
  const projects = await getAllProjects()
  return {
    props: { projects },
    revalidate: 300, // 5분마다 revalidate
  }
}

type HomeProps = {
  projects: Project[]
  user: User
}

export default function HomePage({ projects, user }: HomeProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(projects.length / itemsPerPage)

  const { setUser } = useAuthStore()

  useEffect(() => {
    if (user) {
      setUser(user)
    }
  }, [user, setUser])

  return (
    <div>
      <ProjectBanner />
      <div className="mx-auto w-full max-w-[1200px] px-10 py-10">
        <div className="flex items-center justify-start gap-4 py-10">
          <Dropdown />
          <SearchBar />
        </div>
        <ProjectList
          currentPage={currentPage}
          projects={projects}
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
