import ProjectCard from './ProjectCard'
import StudyCard from './StudyCard'

type CardListProps = {
  tab: 'project' | 'study'
  type: 'register' | 'apply'
}

export default function CardList({ tab, type }: CardListProps) {
  // 가짜 데이터 예시
  const dummyData = {
    register: {
      project: [
        {
          id: 1,
          title: '등록한 프로젝트 1',
          applicant: '홍길동',
          message: '열심히 하겠습니다',
          status: '대기중',
        },
      ],
      study: [
        {
          id: 1,
          title: '등록한 스터디 1',
          applicant: '김철수',
          message: '같이 해요!',
          status: '대기중',
        },
      ],
    },
    apply: {
      project: [{ id: 2, title: '신청한 프로젝트 1', status: '대기중' }],
      study: [{ id: 2, title: '신청한 스터디 1', status: '대기중' }],
    },
  }

  const data = dummyData[type][tab]

  return (
    <div className="mt-4 space-y-4">
      {tab === 'project'
        ? data.map((item) => <ProjectCard key={item.id} {...item} />)
        : data.map((item) => <StudyCard key={item.id} {...item} />)}
    </div>
  )
}
