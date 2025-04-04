import Image from 'next/image'
import carbonBlack from '@/assets/imgs/banner/carbonBlack.webp'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Loading from '../Loading'

export default function ProjectBanner() {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleAddProject = () => {
    setLoading(true)
    router.push('/add/project')
  }

  if (loading) return <Loading />

  return (
    <div className="flex justify-center bg-black">
      <div className="flex h-full w-full max-w-[1200px] flex-col overflow-hidden py-4 md:h-fit md:flex-row md:items-center md:justify-center">
        <div className="md:w-1/2">
          <Image
            src={carbonBlack}
            alt="PickMate 배너"
            priority
            width={600}
            height={400}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between px-14 text-white md:w-1/2 md:py-16">
          <div>
            <h3 className="text-lg font-semibold text-gray-300">
              토이프로젝트? 이제 팀원 걱정은 그만!
            </h3>
            <h2 className="mt-2 text-3xl font-bold">
              개발자를 위한 최적의 팀 빌딩 플랫폼
            </h2>
            <p className="my-2 text-base text-gray-400">
              PICKMATE에서 시작하세요!
            </p>
          </div>

          <div className="mt-auto">
            <Button type="primary" onClick={handleAddProject}>
              프로젝트 등록하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
