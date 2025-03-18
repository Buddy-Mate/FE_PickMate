import Tab from './Tab'

type SectionProps = {
  title: string
  type: 'register' | 'apply'
}

export default function Section({ title, type }: SectionProps) {
  return (
    <div className="mt-8">
      <h2 className="my-4 text-2xl font-semibold">{title}</h2>
      <Tab type={type} />
    </div>
  )
}
