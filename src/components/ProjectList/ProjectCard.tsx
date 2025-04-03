import Image from 'next/image'
import profile from '@/assets/icons/profile.png'
import eyeVisible from '@/assets/icons/eyeVisible.png'
import Link from 'next/link'
import { Project } from '@/types/project'
import LikeButton from '../LikeButton'

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { id, title, techStack, authorNickname, likes, views } = project

  return (
    <div className="bg-custom-gray-300 border-custom-gray-100 flex h-60 flex-col justify-between rounded-lg border p-4 shadow-md transition-all hover:scale-105">
      <Link href={`/project/${id}`} className="flex-1/2">
        {/* 제목 */}
        <h3 className="line-clamp-3 text-lg font-bold">{title}</h3>

        {/* 기술 스택 */}
        <ul className="my-2 flex flex-wrap gap-2">
          {techStack.length > 0 &&
            techStack.map((stack, index) => (
              <li
                key={index}
                className="rounded-full bg-gray-950 px-2 py-1 text-sm text-white"
              >
                {stack}
              </li>
            ))}
        </ul>
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
          <LikeButton id={id} initialLikes={likes} type="project" />
          <div className="flex items-center gap-1">
            <Image src={eyeVisible} alt="조회수 아이콘" className="size-5" />
            <span>{views}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
