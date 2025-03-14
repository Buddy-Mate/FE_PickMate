import Banner from '@/components/Banner'
import Dropdown from '@/components/Dropdown'
import Pagination from '@/components/Pagination'
import ProjectList from '@/components/ProjectList'
import SearchBar from '@/components/SearchBar'
import { useState } from 'react'

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div>
      <Banner />
      <div className="mx-auto w-full max-w-[1200px] px-10">
        <div className="flex items-center justify-start gap-4 py-10">
          <Dropdown />
          <SearchBar />
        </div>
        <ProjectList currentPage={currentPage} />
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  )
}
