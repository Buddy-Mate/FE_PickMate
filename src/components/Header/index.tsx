import Image from 'next/image'
import logo from '@/assets/imgs/logo.png'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-custom-black border-custom-gray-300 fixed top-0 left-0 w-full border-b">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-start gap-10 px-6 text-white">
        <Link href="/home">
          <Image src={logo} width={200} height={50} alt="로고" />
        </Link>
        <nav className="flex gap-10">
          <Link
            href="/home"
            className="hover:text-primary text-lg font-bold transition-all"
          >
            Home
          </Link>
          <Link
            href="/study"
            className="hover:text-primary text-lg font-bold transition-all"
          >
            Study
          </Link>
        </nav>
      </div>
    </header>
  )
}
