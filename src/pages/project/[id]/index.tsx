import { GetServerSideProps } from 'next'
import { Project } from '@/types/project'
import { PROJECTS } from '@/constants/PROJECTS'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params!

  // id가 string | undefined 타입일 수 있으므로, number로 변환
  const projectId = Array.isArray(id) ? Number(id[0]) : Number(id)

  // 더미 데이터에서 해당 id의 프로젝트 정보 찾기
  const project = PROJECTS.find((p) => p.id === projectId)

  if (!project) {
    return { notFound: true }
  }

  return {
    props: {
      project,
    },
  }
}

type ProjectDetailProps = {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="space-y-6 p-6">
      {/* 프로젝트 타이틀 */}
      <div>
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <p className="text-sm text-gray-500">등록일: {project.createdAt}</p>
      </div>

      {/* 프로젝트 설명 */}
      <div>
        <h2 className="mb-2 text-xl font-semibold">프로젝트 설명</h2>
        <p className="text-gray-700">{project.description}</p>
      </div>

      {/* 스택 */}
      <div>
        <h2 className="mb-2 text-xl font-semibold">기술 스택</h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 마감일, 좋아요, 조회수 */}
      <div className="flex items-center gap-6 text-sm text-gray-600">
        <span>마감일: {project.deadline}</span>
        <span>좋아요: ❤️ {project.likes}</span>
        <span>조회수: 👁️ {project.views}</span>
      </div>

      {/* 작성자 정보 */}
      <div className="border-t pt-4">
        <h2 className="mb-2 text-xl font-semibold">작성자 정보</h2>
        <div className="space-y-1">
          <p>닉네임: {project.author.nickname}</p>
          <p>이메일: {project.author.email}</p>
          {project.author.bio && <p>소개: {project.author.bio}</p>}
        </div>
      </div>
    </div>
  )
}
