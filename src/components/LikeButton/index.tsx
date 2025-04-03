import { useState } from 'react'
import Image from 'next/image'
import heartEmpty from '@/assets/icons/heartEmpty.png'
import heartFill from '@/assets/icons/heartFill.png'
import likeHeart from '@/assets/lottie/likeHeart.json'
import dynamic from 'next/dynamic'
import { likeProject, unlikeProject } from '@/libs/apis/project'
import { likeStudy, unlikeStudy } from '@/libs/apis/study'
import { useLikeStore } from '@/store/likeStore'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

type LikeButtonProps = {
  id: number
  initialLikes: number
  type: 'project' | 'study'
}

export default function LikeButton({
  id,
  initialLikes,
  type,
}: LikeButtonProps) {
  const { likedProjects, likedStudies, toggleProjectLike, toggleStudyLike } =
    useLikeStore()

  // 타입에 따라 전역 상태 선택
  const isLiked =
    type === 'project' ? likedProjects.includes(id) : likedStudies.includes(id)
  const toggleLike = type === 'project' ? toggleProjectLike : toggleStudyLike
  const likeApi = type === 'project' ? likeProject : likeStudy
  const unlikeApi = type === 'project' ? unlikeProject : unlikeStudy

  const [likeCount, setLikeCount] = useState(initialLikes)
  const [showAnimation, setShowAnimation] = useState(false)

  const handleLike = async () => {
    try {
      toggleLike(id)

      if (isLiked) {
        await unlikeApi(id)
        setLikeCount((prev) => prev - 1)
      } else {
        setShowAnimation(true)
        await likeApi(id)
        setLikeCount((prev) => prev + 1)
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error)
      toggleLike(id)
      setLikeCount(initialLikes)
    }
  }

  return (
    <button
      onClick={handleLike}
      className="relative flex cursor-pointer items-center gap-1"
    >
      {showAnimation ? (
        <div className="absolute -top-8 -left-11 flex items-center justify-center">
          <Lottie
            animationData={likeHeart}
            autoplay
            loop={false}
            style={{ width: 60, height: 60 }}
            onComplete={() => setShowAnimation(false)}
          />
        </div>
      ) : (
        <Image
          src={isLiked ? heartFill : heartEmpty}
          alt="좋아요"
          className="size-5"
        />
      )}
      <span>{likeCount}</span>
    </button>
  )
}
