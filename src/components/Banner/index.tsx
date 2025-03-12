import Image from 'next/image'
import logo from '@/assets/imgs/logo.png'

export default function Banner() {
  return (
    <div className="relative mb-6 h-60 w-full">
      <Image src={logo} alt="PickMate 배너" layout="fill" objectFit="cover" />
      <div className="bg-opacity-50 absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-bold">
          PickMate - 토이 프로젝트 매칭 플랫폼
        </h1>
      </div>
    </div>
  )
}
