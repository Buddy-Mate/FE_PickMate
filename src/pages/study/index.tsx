import StudyBanner from '@/components/Banner/StudyBanner'
import Dropdown from '@/components/Dropdown'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import StudyList from '@/components/StudyList'
import { STUDIES } from '@/constants/STUDIES'
import { useState } from 'react'

export default function Study() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(STUDIES.length / itemsPerPage)

  return (
    <div>
      <StudyBanner />
      <div className="mx-auto w-full max-w-[1200px] px-10 py-10">
        <div className="flex items-center justify-start gap-4 py-10">
          <Dropdown />
          <SearchBar />
        </div>
        <StudyList currentPage={currentPage} />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}
