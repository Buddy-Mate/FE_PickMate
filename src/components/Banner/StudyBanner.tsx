import Image from 'next/image'
import studyBlack from '@/assets/imgs/banner/studyBlack.webp'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Loading from '../Loading'

export default function StudyBanner() {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleAddProject = () => {
    setLoading(true)
    router.push('/add/study')
  }

  if (loading) return <Loading />

  return (
    <div className="flex justify-center bg-black">
      <div className="flex h-full w-full max-w-[1200px] flex-col overflow-hidden py-4 md:h-fit md:flex-row md:items-center md:justify-center">
        <div className="md:w-1/2">
          <Image
            src={studyBlack}
            alt="Study 배너"
            priority
            width={600}
            height={400}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between px-14 text-white md:w-1/2 md:py-16">
          <div>
            <h3 className="text-lg font-semibold text-gray-300">
              새롭게 시작하는 스터디! 함께 성장할 사람을 찾고 있나요?
            </h3>
            <h2 className="mt-2 text-3xl font-bold">
              스터디 팀을 찾고 함께 공부를 시작해보세요!
            </h2>
            <p className="my-2 text-base text-gray-400">
              PICKMATE에서 시작하세요!
            </p>
          </div>

          <div className="mt-auto">
            <Button type="primary" onClick={handleAddProject}>
              스터디 등록하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
