import { motion } from 'framer-motion'
import Image from 'next/image'
import logo from '@/assets/imgs/logo.png'
import top1 from '@/assets/imgs/landing/1top.png'
import top2 from '@/assets/imgs/landing/2top.png'
import bottom3 from '@/assets/imgs/landing/3bottom.png'
import full6 from '@/assets/imgs/landing/6full.png'
import bottom7 from '@/assets/imgs/landing/7bottom.png'
import { useRouter } from 'next/router'
import Button from '@/components/Button'

export async function getStaticProps() {
  return {
    props: {},
  }
}

export default function LandingPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const router = useRouter()

  const handleClick = () => {
    router.push('/login')
  }

  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center px-6 pt-10 pb-40">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="flex flex-col text-center"
      >
        <Image src={logo} width={400} height={300} alt={'로고'} />
        <h1 className="text-4xl font-bold md:text-4xl">
          토이프로젝트 매칭 플랫폼
        </h1>
        <p className="pt-5 text-lg text-gray-600">
          스터디부터 프로젝트까지, 원하는 팀을 손쉽게 모집하고 참여하세요.
        </p>
      </motion.section>

      {/* 서비스 소개 섹션 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="grid gap-6 py-20 md:grid-cols-3"
      >
        {[
          { emoji: '📝', title: '간편한 등록', desc: '3분 만에 모집 글 작성' },
          {
            emoji: '🤝',
            title: '자유로운 지원',
            desc: '원하는 팀에 바로 신청',
          },
          {
            emoji: '📬',
            title: '실시간 관리',
            desc: '신청 현황을 한눈에 확인',
          },
        ].map((item) => (
          <motion.div
            key={item.title}
            className="bg-custom-gray-300 rounded-2xl p-6 shadow transition-all hover:scale-105"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
          >
            <div className="mb-4 text-4xl">{item.emoji}</div>
            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* 프로세스 안내 섹션 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="w-full max-w-[800px]"
      >
        <h2 className="py-10 text-center text-3xl font-bold">
          이렇게 이용해보세요!
        </h2>

        {/* Step 1 */}
        <div className="border-custom-gray-100 mb-20 flex flex-col items-center gap-6 rounded-2xl border p-6 md:flex-row md:justify-between md:px-10">
          <div className="flex flex-col">
            <div className="text-primary text-6xl font-bold md:text-8xl">1</div>
            <h4 className="mt-2 text-xl font-semibold md:text-3xl">
              회원가입 & 로그인
            </h4>
            <p className="text-gray-600 md:pt-2 md:text-lg">
              빠른 가입 후 마이페이지를 꾸며보세요.
            </p>
          </div>
          <div className="flex justify-end gap-4 md:w-1/2">
            <Image src={top2} alt="회원가입 & 로그인" className="h-60 w-40" />
            <Image
              src={bottom3}
              alt="회원가입 & 로그인 추가 이미지"
              className="h-60 w-40"
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className="border-custom-gray-100 mb-20 flex flex-col items-center gap-6 rounded-2xl border p-6 md:flex-row-reverse md:justify-between md:px-10">
          <div className="flex flex-col items-start md:w-2/3">
            <div className="text-primary text-6xl font-bold md:text-8xl">2</div>
            <h4 className="mt-2 text-xl font-semibold md:text-3xl">
              모집 & 탐색
            </h4>
            <p className="text-gray-600 md:pt-2 md:text-lg">
              팀을 만들거나 지원하세요.
            </p>
          </div>
          <Image src={full6} alt="모집 & 탐색 추가 이미지" className="w-50" />
        </div>

        {/* Step 3 */}
        <div className="border-custom-gray-100 mb-20 flex flex-col items-center gap-6 rounded-2xl border p-6 md:flex-row md:justify-between md:px-10">
          <div className="flex flex-col items-start md:w-1/2">
            <div className="text-primary text-6xl font-bold md:text-8xl">3</div>
            <h4 className="mt-2 text-xl font-semibold md:text-3xl">
              신청 / 수락 / 오픈채팅
            </h4>
            <p className="text-gray-600 md:pt-2 md:text-lg">
              수락 후 바로 소통을 시작하세요!
            </p>
          </div>
          <div className="flex justify-end md:w-1/2">
            <Image src={bottom7} width={250} alt="신청 / 수락 / 오픈채팅" />
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="flex flex-col justify-center gap-4 pt-50 pb-20 md:flex-row md:items-center"
      >
        <Image src={top1} alt="image" className="w-60 md:w-100" />
        <p className="text-5xl font-bold">
          지금 바로 <br /> PickMate 에서 시작하세요!
        </p>
      </motion.section>

      <Button type="primary" className="max-w-100" onClick={handleClick}>
        시작하기
      </Button>
    </main>
  )
}
