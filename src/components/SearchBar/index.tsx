import search from '@/assets/icons/search.png'
import { searchProject } from '@/libs/apis/project'
import { searchStudy } from '@/libs/apis/study'
import { Project } from '@/types/project'
import { Study } from '@/types/study'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

type SearchBarProps =
  | {
      type: 'project'
      onSearchResult: (data: Project[]) => void
    }
  | {
      type: 'study'
      onSearchResult: (data: Study[]) => void
    }

export default function SearchBar({ type, onSearchResult }: SearchBarProps) {
  const [keyword, setKeyword] = useState('')

  const handleSearch = useCallback(async () => {
    // 빈 입력 시 결과 초기화
    if (!keyword.trim()) {
      onSearchResult([])
      return
    }
    try {
      const data =
        type === 'project'
          ? await searchProject(keyword)
          : await searchStudy(keyword)
      onSearchResult(data)
    } catch (error) {
      console.error('검색 실패:', error)
    }
  }, [keyword, onSearchResult, type])

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch()
    }, 300)

    return () => clearTimeout(debounce)
  }, [keyword, handleSearch])

  return (
    <div className="relative w-full max-w-60 md:max-w-80">
      <input
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
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
