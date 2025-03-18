type StudyCardProps = {
  title: string
  applicant?: string
  message?: string
  status: string
}

export default function StudyCard({
  title,
  applicant,
  message,
  status,
}: StudyCardProps) {
  return (
    <div className="space-y-2 rounded border p-3">
      <p className="font-medium">{title}</p>
      <div className="text-sm text-gray-600">
        신청자: <span className="font-semibold">{applicant}</span> <br />
        전달 내용: {message} <br />
        상태: <span className="font-semibold text-yellow-500">{status}</span>
      </div>
    </div>
  )
}
