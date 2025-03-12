import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-custom-gray-300 mt-12 py-6 text-white">
      <div className="container mx-auto text-center">
        <div className="mb-4 flex flex-col items-center justify-center gap-4 md:flex-row">
          <Link href="/notice">공지사항</Link>
          <Link href="/report">버그제보</Link>
          <Link href="/privacy">개인정보 처리방침</Link>
          <Link href="/terms">서비스 이용약관</Link>
        </div>
        <div className="text-sm">
          <p>All That Developer</p>
          <p>©2024 PickMate, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
