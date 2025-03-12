import Banner from '@/components/Banner'
import Dropdown from '@/components/Dropdown'
import ProjectList from '@/components/ProjectList'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  return (
    <div>
      <Banner />
      <div className="mx-auto w-full max-w-[1200px] px-10">
        <div className="flex items-center justify-start gap-4 py-10">
          <Dropdown />
          <SearchBar />
        </div>
        <ProjectList />
      </div>
    </div>
  )
}
