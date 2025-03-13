import ProjectCard from './ProjectCard'

export default function ProjectList() {
  const projects = [
    {
      id: 1,
      title: '프로젝트 A',
      techStack: ['React', 'Node.js', 'MongoDB'],
      authorProfile: '/path/to/profile1.png',
      authorNickname: '작성자1',
      likes: 120,
      views: 450,
    },
    {
      id: 2,
      title: '프로젝트 B',
      techStack: ['Vue.js', 'Express', 'MySQL'],
      authorProfile: '/path/to/profile2.png',
      authorNickname: '작성자2',
      likes: 85,
      views: 300,
    },
    {
      id: 3,
      title: '프로젝트 C',
      techStack: ['Angular', 'Django', 'PostgreSQL'],
      authorProfile: '/path/to/profile3.png',
      authorNickname: '작성자3',
      likes: 60,
      views: 200,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          id={project.id}
          title={project.title}
          techStack={project.techStack}
          authorProfile={project.authorProfile}
          authorNickname={project.authorNickname}
          likes={project.likes}
          views={project.views}
        />
      ))}
    </div>
  )
}
