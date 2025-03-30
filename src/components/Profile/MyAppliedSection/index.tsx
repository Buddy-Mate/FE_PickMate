import { useCallback, useEffect, useState } from 'react'
import { getAppliedProjects, getAppliedStudies } from '@/libs/apis/apply'
import AppliedCardList from './AppliedCardList'

export default function MyAppliedSection() {
  const [activeTab, setActiveTab] = useState<'project' | 'study'>('project')
  const [projects, setProjects] = useState([])
  const [studies, setStudies] = useState([])

  const getData = useCallback(async () => {
    try {
      if (activeTab === 'project') {
        const data = await getAppliedProjects()
        setProjects(data)
      } else if (activeTab === 'study') {
        const data = await getAppliedStudies()
        setStudies(data)
      }
    } catch (error) {
      console.error('데이터 불러오기 실패:', error)
    }
  }, [activeTab])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div className="mt-8">
      <h2 className="my-4 text-2xl font-semibold">🤝 내가 신청한</h2>
      <div className="flex w-full">
        {['project', 'study'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'project' | 'study')}
            className={`relative flex-1 cursor-pointer py-3 transition-colors duration-300 ease-in-out focus:outline-none ${
              activeTab === tab
                ? 'text-primary'
                : 'hover:text-primary text-gray-500'
            } `}
          >
            {tab === 'project' ? '프로젝트' : '스터디'}
            {activeTab === tab && (
              <span className="bg-primary absolute right-0 bottom-0 left-0 h-1 rounded transition-all duration-300 ease-in-out"></span>
            )}
          </button>
        ))}
      </div>

      <div className="w-full">
        {activeTab === 'project' ? (
          <AppliedCardList tab={activeTab} projects={projects} />
        ) : (
          <AppliedCardList tab={activeTab} studies={studies} />
        )}
      </div>
    </div>
  )
}
