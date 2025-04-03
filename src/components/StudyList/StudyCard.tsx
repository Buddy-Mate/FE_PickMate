import Image from 'next/image'
import profile from '@/assets/icons/profile.png'
import heartEmpty from '@/assets/icons/heartEmpty.png'
import heartFill from '@/assets/icons/heartFill.png'
import eyeVisible from '@/assets/icons/eyeVisible.png'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Study } from '@/types/study'
import { useLikeStore } from '@/store/likeStore'
import { likeStudy, unlikeStudy } from '@/libs/apis/study'

type StudyCardProps = {
  study: Study
}

export default function ProjectCard({ study }: StudyCardProps) {
  const { id, title, authorNickname, likes, views } = study

  const { likedStudies, toggleStudyLike } = useLikeStore()
  const isLiked = likedStudies.includes(id)
  const [likeCount, setLikeCount] = useState(likes)

  useEffect(() => {
    setLikeCount(likes)
  }, [likes])

  const handleLike = async () => {
    try {
      toggleStudyLike(id) // Zustand 상태 변경 (전역 상태 업데이트)

      if (isLiked) {
        await unlikeStudy(id)
        setLikeCount((prev) => prev - 1)
      } else {
        await likeStudy(id)
        setLikeCount((prev) => prev + 1)
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error)
      // 실패 시 상태 롤백
      toggleStudyLike(id)
      setLikeCount(likes)
    }
  }

  return (
    <div className="bg-custom-gray-300 border-custom-gray-100 flex h-50 flex-col justify-between rounded-lg border p-4 shadow-md transition-all hover:scale-105">
      <Link href={`/study/${id}`} className="flex-1/2">
        {/* 제목 */}
        <h3 className="line-clamp-3 text-lg font-bold">{title}</h3>
      </Link>

      <div className="flex items-center justify-between">
        {/* 프로필 */}
        <div className="flex items-center gap-2">
          <Image
            src={profile}
            alt={authorNickname}
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-gray-500">{authorNickname}</p>
        </div>

        {/* 좋아요 & 조회수 */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <button
            onClick={handleLike}
            className="flex cursor-pointer items-center gap-1"
          >
            <Image
              src={isLiked ? heartFill : heartEmpty}
              alt="좋아요"
              className="size-5"
            />
            <span>{likeCount}</span>
          </button>
          <div className="flex items-center gap-1">
            <Image src={eyeVisible} alt="조회수 아이콘" className="size-5" />
            <span>{views}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
