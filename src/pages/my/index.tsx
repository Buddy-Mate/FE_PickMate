import ProfileCard from '@/components/Profile/ProfileCard'
import Section from '@/components/Profile/Section'
import { useAuthStore } from '@/store/authStore'
import React from 'react'

export default function My() {
  const { user } = useAuthStore()

  if (!user) return
  return (
    <div className="mx-auto w-full max-w-[1200px] px-10 py-10">
      <h1 className="my-4 text-3xl font-bold">{user?.nickname}님의 정보</h1>
      <ProfileCard nickname={user.nickname} email={user.email} bio={user.bio} />

      <Section title="📄 내가 등록한" type="register" />

      <Section title="🤝 내가 신청한" type="apply" />
    </div>
  )
}
