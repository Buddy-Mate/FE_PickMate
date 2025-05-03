import MyAppliedSection from '@/components/Profile/MyAppliedSection'
import MyRegisteredSection from '@/components/Profile/MyRegisteredSection'
import ProfileCard from '@/components/Profile/ProfileCard'

export default function My() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-10 py-10">
      <ProfileCard />
      <MyRegisteredSection />
      <MyAppliedSection />
    </div>
  )
}
