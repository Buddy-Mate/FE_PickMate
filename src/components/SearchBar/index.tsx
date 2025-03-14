import search from '@/assets/icons/search.png'
import Image from 'next/image'

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-60 md:max-w-80">
      <input
        type="text"
        placeholder="제목으로 검색하세요"
        className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2 pl-10 focus:outline-none"
      />
      <Image
        src={search}
        alt="검색 아이콘"
        width={20}
        height={20}
        className="absolute top-1/2 left-3 -translate-y-1/2"
      />
    </div>
  )
}
