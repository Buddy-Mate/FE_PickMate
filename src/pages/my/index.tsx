/* eslint-disable @typescript-eslint/no-unused-vars */
import ProfileCard from '@/components/Profile/ProfileCard'
import Section from '@/components/Profile/Section'
import { getUserData } from '@/libs/apis/auth'
import { User } from '@/types/auth'
import { getCookie } from 'cookies-next'
import { GetServerSidePropsContext } from 'next'
import React, { useState } from 'react'

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const accessToken = getCookie('accessToken', {
//     req: context.req,
//     res: context.res,
//   })

//   const user = await getUserData(accessToken as string)

//   return {
//     props: {
//       user: user || null,
//     },
//   }
// }

// type MyProps = {
//   user: User | null
// }

// export default function My({ user }: MyProps) {
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
