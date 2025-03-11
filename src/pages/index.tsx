import { motion } from 'framer-motion'
import Image from 'next/image'
import logo from '@/assets/imgs/logo.png'
import image1 from '@/assets/imgs/landing/image1.png'
import image2 from '@/assets/imgs/landing/image2.png'
import image3 from '@/assets/imgs/landing/image3.png'
import { useRouter } from 'next/router'
import Button from './_components/Button'

export async function getStaticProps() {
  return {
    props: {},
  }
}

export default function LandingPage() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/login')
  }

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center px-6 py-20">
      <div className="flex flex-col items-center justify-center gap-20">
        <motion.div
          className="text-4xl font-bold text-blue-500"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image src={logo} width={500} height={300} alt={'로고'} />
        </motion.div>

        <motion.div
          className="bg-custom-gray-300 mt-4 flex w-full max-w-300 flex-col items-center gap-4 rounded-2xl pb-4 text-center text-lg text-white shadow-lg backdrop-blur-lg md:flex-row md:pb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Image
            src={image1}
            width={300}
            height={200}
            alt="image"
            className="w-full rounded-t-2xl md:max-w-130 md:rounded-t-none md:rounded-tl-2xl md:rounded-bl-2xl"
          />
          <p className="p-10 text-left">
            <span className="text-2xl font-bold">
              PickMate는 토이 프로젝트를 위한 매칭 플랫폼으로,
            </span>
            <br />
            <br />
            프로젝트를 진행하고 싶은 개인들이 참여하고, 함께 하고 싶은 파트너를
            찾아 프로젝트를 시작할 수 있도록 도와줍니다.
          </p>
        </motion.div>

        <motion.div
          className="bg-custom-gray-300 mt-4 flex w-full max-w-300 flex-col items-center gap-4 rounded-2xl pb-4 text-center text-lg text-white shadow-lg backdrop-blur-lg md:flex-row md:pb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Image
            src={image2}
            width={300}
            height={200}
            alt="image"
            className="w-full rounded-t-2xl md:max-w-130 md:rounded-t-none md:rounded-tl-2xl md:rounded-bl-2xl"
          />
          <p className="p-10 text-left">
            프로젝트 외에도 스터디나 개발 관련 정보 공유를 할 수 있는 다양한
            기능을 제공합니다. <br />
            <br />
            당신의 아이디어를 성공적인 프로젝트로 만들 준비가 되셨나요?
          </p>
        </motion.div>

        <motion.div
          className="bg-custom-gray-300 mt-4 flex w-full max-w-300 flex-col items-center gap-4 rounded-2xl pb-4 text-center text-lg text-white shadow-lg backdrop-blur-lg md:flex-row md:pb-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <Image
            src={image3}
            width={300}
            height={200}
            alt="image"
            className="w-full rounded-t-2xl md:max-w-130 md:rounded-t-none md:rounded-tl-2xl md:rounded-bl-2xl"
          />
          <p className="p-10 text-left">
            PickMate는 꿈꾸는 이들을 연결하여 성공적인 프로젝트를 현실로
            만들어냅니다. <br />
            당신과 함께 팀을 이루고 싶은 메이트들이 기다리고 있습니다. <br />
            <br />
            지금, PickMate에서 만나보세요!
          </p>
        </motion.div>

        <Button type="primary" className="max-w-100" onClick={handleClick}>
          시작하기
        </Button>
      </div>
    </div>
  )
}
