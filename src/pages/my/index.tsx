/* eslint-disable @typescript-eslint/no-unused-vars */
import ProfileCard from '@/components/Profile/ProfileCard'
import Section from '@/components/Profile/Section'
import React, { useState } from 'react'

export default function My() {
  const [bio, setBio] = useState('')
  const nickname = 'example'
  const email = 'email@example.com'

  return (
    <div className="mx-auto w-full max-w-[1200px] px-10 py-10">
      <h1 className="my-4 text-3xl font-bold">{nickname}님의 정보</h1>
      <ProfileCard nickname={nickname} email={email} bio={bio} />

      <Section title="📄 내가 등록한" type="register" />

      <Section title="🤝 내가 신청한" type="apply" />
    </div>
  )
}
