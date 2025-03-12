import Banner from '@/components/Banner'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import ProjectList from '@/components/ProjectList'
import SearchBar from '@/components/SearchBar'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleAddProject = () => {
    router.push('/addProject')
  }
  return (
    <div>
      <Banner />
      <div className="mx-auto max-w-screen-xl p-6">
        <div className="flex items-center justify-between">
          <Dropdown />
          <div className="flex items-center justify-center">
            <SearchBar />
            <Button
              type="primary"
              onClick={handleAddProject}
              className="max-w-20"
            >
              등록
            </Button>
          </div>
        </div>
        <ProjectList />
      </div>
    </div>
  )
}
