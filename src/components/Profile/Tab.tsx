import { useState } from 'react'
import CardList from './CardList'

type TabProps = {
  type: 'register' | 'apply'
}

export default function MyTab({ type }: TabProps) {
  const [activeTab, setActiveTab] = useState<'project' | 'study'>('project')

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
        <CardList tab={activeTab} type={type} />
      </div>
    </div>
  )
}
