import Banner from '@/components/Banner'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import ProjectList from '@/components/ProjectList'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-xl p-6">
      <Banner />
      <div className="flex items-center justify-between">
        <Dropdown />
        <div className="flex items-center justify-center">
          <SearchBar />
          <Button type="primary">프로젝트 등록</Button>
        </div>
      </div>
      <ProjectList />
    </div>
  )
}
