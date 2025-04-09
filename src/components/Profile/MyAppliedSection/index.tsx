import { useCallback, useEffect, useState } from 'react'
import { getAppliedProjects, getAppliedStudies } from '@/libs/apis/apply'
import AppliedCardList from './AppliedCardList'
import { Applicant } from '@/types/apply'
import { motion } from 'framer-motion'

export default function MyAppliedSection() {
  const [activeTab, setActiveTab] = useState<'project' | 'study'>('project')
  const [projects, setProjects] = useState<Applicant[]>([])
  const [studies, setStudies] = useState<Applicant[]>([])

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

  const handleCancelProject = (applicationId: number) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.applicationId !== applicationId),
    )
  }

  const handleCancelStudy = (applicationId: number) => {
    setStudies((prevStudies) =>
      prevStudies.filter((study) => study.applicationId !== applicationId),
    )
  }

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
          <motion.div
            key="project"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <AppliedCardList
              tab={activeTab}
              projects={projects}
              onCancel={handleCancelProject}
            />
          </motion.div>
        ) : (
          <motion.div
            key="study"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <AppliedCardList
              tab={activeTab}
              studies={studies}
              onCancel={handleCancelStudy}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}
