import Image from 'next/image'
import profile from '@/assets/icons/profile.png'
import heartEmpty from '@/assets/icons/heartEmpty.png'
import heartFill from '@/assets/icons/heartFill.png'
import eyeVisible from '@/assets/icons/eyeVisible.png'
import { useState } from 'react'
import Link from 'next/link'

type ProjectCardProps = {
  id: number
  title: string
  techStack: string[]
  authorProfile: string
  authorNickname: string
  likes: number
  views: number
}

export default function ProjectCard({
  id,
  title,
  techStack,
  authorNickname,
  likes,
  views,
}: ProjectCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const toggleLike = () => {
    setLiked((prev) => !prev)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  return (
    <Link href={`/project/${id}`}>
      <div className="bg-custom-gray-300 border-custom-gray-100 flex h-60 flex-col justify-between rounded-lg border p-4 shadow-md transition-all hover:scale-105">
        {/* 제목 */}
        <h3 className="line-clamp-3 text-lg font-bold">{title}</h3>

        {/* 기술 스택 */}
        <ul className="my-2 flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <li
              key={index}
              className="rounded-full bg-gray-950 px-2 py-1 text-sm"
            >
              {tech}
            </li>
          ))}
        </ul>

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
            <button onClick={toggleLike} className="flex items-center gap-1">
              <Image
                src={liked ? heartFill : heartEmpty}
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
    </Link>
  )
}
