import ProjectBanner from '@/components/Banner/ProjectBanner'
import Dropdown from '@/components/Dropdown'
import Pagination from '@/components/Pagination'
import ProjectList from '@/components/ProjectList'
import SearchBar from '@/components/SearchBar'
import { PROJECTS } from '@/constants/PROJECTS'
import { getAllProjects } from '@/libs/apis/project'
import { getCookie } from 'cookies-next'
import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const accessToken = await getCookie('accessToken', {
    req: context.req,
    res: context.res,
  })
  const projects = await getAllProjects(accessToken as string)

  console.log(projects)

  return {
    props: {
      projects,
    },
  }
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(PROJECTS.length / itemsPerPage)

  return (
    <div>
      <ProjectBanner />
      <div className="mx-auto w-full max-w-[1200px] px-10 py-10">
        <div className="flex items-center justify-start gap-4 py-10">
          <Dropdown />
          <SearchBar />
        </div>
        <ProjectList currentPage={currentPage} />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}
