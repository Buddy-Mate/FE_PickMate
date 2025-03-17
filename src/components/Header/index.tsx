import Image from 'next/image'
import logo from '@/assets/imgs/logo.png'
import Link from 'next/link'
import { useRouter } from 'next/router'
import profile from '@/assets/icons/profile.png'

export default function Header() {
  const router = useRouter()

  const isActive = (path: string) => router.pathname === path

  return (
    <header className="bg-custom-black border-custom-gray-300 fixed top-0 left-0 z-50 w-full border-b">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-6 text-white md:gap-10">
        <div className="flex items-center justify-start gap-4 md:gap-10">
          <Link href="/home">
            <Image src={logo} width={200} height={50} alt="로고" />
          </Link>
          <nav className="flex gap-4 md:gap-10">
            <Link
              href="/home"
              className={`text-lg font-bold transition-all ${isActive('/home') ? 'text-primary' : 'hover:text-primary'}`}
            >
              Home
            </Link>
            <Link
              href="/study"
              className={`text-lg font-bold transition-all ${isActive('/study') ? 'text-primary' : 'hover:text-primary'}`}
            >
              Study
            </Link>
          </nav>
        </div>
        <Link href="/my">
          <Image
            src={profile}
            alt="마이페이지 로고"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
      </div>
    </header>
  )
}
