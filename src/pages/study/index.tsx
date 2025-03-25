import StudyBanner from '@/components/Banner/StudyBanner'
import Dropdown from '@/components/Dropdown'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import StudyList from '@/components/StudyList'
import { getAllStudies } from '@/libs/apis/study'
import { Study } from '@/types/study'
import { useState } from 'react'

export async function getStaticProps() {
  const studies = await getAllStudies()
  return {
    props: { studies },
    revalidate: 300, // 5분마다 revalidate
  }
}

type StudyProps = {
  studies: Study[]
}

export default function StudyPage({ studies }: StudyProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(studies.length / itemsPerPage)

  return (
    <div>
      <StudyBanner />
      <div className="mx-auto w-full max-w-[1200px] px-10 py-10">
        <div className="flex items-center justify-start gap-4 py-10">
          <Dropdown />
          <SearchBar />
        </div>
        <StudyList
          currentPage={currentPage}
          studies={studies}
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
