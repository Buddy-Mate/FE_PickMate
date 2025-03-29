import { useCallback, useEffect, useState } from 'react'
import CardList from './CardList'
import { getAppliedProjects, getAppliedStudies } from '@/libs/apis/apply'
import { getMyProjects } from '@/libs/apis/project'
import { getMyStudies } from '@/libs/apis/study'

type TabProps = {
  type: 'register' | 'apply'
}

export default function MyTab({ type }: TabProps) {
  const [activeTab, setActiveTab] = useState<'project' | 'study'>('project')

  const [projects, setProjects] = useState([])
  const [studies, setStudies] = useState([])

  const getData = useCallback(async () => {
    try {
      if (type === 'register') {
        if (activeTab === 'project') {
          const data = await getMyProjects()
          setProjects(data)
        } else if (activeTab === 'study') {
          const data = await getMyStudies()
          setStudies(data)
        }
      } else if (type === 'apply') {
        if (activeTab === 'project') {
          const data = await getAppliedProjects()
          console.log(data)
          setProjects(data)
        } else if (activeTab === 'study') {
          const data = await getAppliedStudies()
          setStudies(data)
        }
      }
    } catch (error) {
      console.error('데이터 불러오기 실패:', error)
    }
  }, [type, activeTab])

  // `type`이나 `activeTab`이 변경될 때마다 데이터 불러오기
  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div className="flex flex-col">
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
          <CardList tab={activeTab} type={type} projects={projects} />
        ) : (
          <CardList tab={activeTab} type={type} studies={studies} />
        )}
      </div>
    </div>
  )
}
