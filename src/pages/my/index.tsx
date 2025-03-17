/* eslint-disable @typescript-eslint/no-unused-vars */
import Profile from '@/components/Profile'
import React, { useState } from 'react'

export default function My() {
  const [bio, setBio] = useState('')
  const nickname = 'example'
  const email = 'email@example.com'

  return (
    <div className="mx-auto w-full max-w-[1200px] px-10 py-10">
      {/* 프로필 */}
      <h1 className="my-4 text-3xl font-bold">{nickname}님의 정보</h1>
      <Profile nickname={nickname} email={email} bio={bio} />

      {/* 내가 쓴 게시글 */}
      <div>
        <h2 className="my-4 text-2xl font-semibold">📄 내가 등록한</h2>
        <div className="flex space-x-4">
          {/* 프로젝트 탭 */}
          <div className="bg-custom-gray-300 w-1/2 space-y-4 rounded-xl p-4 shadow">
            <h4 className="text-lg font-semibold">프로젝트</h4>
            {/* 게시글 예시 */}
            <div className="space-y-2 rounded border p-3">
              <p className="font-medium">프로젝트 제목</p>
              <div className="text-sm text-gray-600">
                신청자: <span className="font-semibold">홍길동</span> <br />
                전달 내용: 열심히 하겠습니다! <br />
                상태:{' '}
                <span className="font-semibold text-yellow-500">대기중</span>
              </div>
            </div>
          </div>

          {/* 스터디 탭 */}
          <div className="bg-custom-gray-300 w-1/2 space-y-4 rounded-xl p-4 shadow">
            <h4 className="text-lg font-semibold">스터디</h4>
            {/* 게시글 예시 */}
            <div className="space-y-2 rounded border p-3">
              <p className="font-medium">스터디 제목</p>
              <div className="text-sm text-gray-600">
                신청자: <span className="font-semibold">김철수</span> <br />
                전달 내용: 같이 공부하고 싶어요! <br />
                상태:{' '}
                <span className="font-semibold text-yellow-500">대기중</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 내가 신청한 목록 */}
      <div>
        <h3 className="my-4 text-2xl font-semibold">🤝 내가 신청한</h3>
        <div className="flex space-x-4">
          {/* 프로젝트 탭 */}
          <div className="bg-custom-gray-300 w-1/2 space-y-4 rounded-xl p-4 shadow">
            <h4 className="text-lg font-semibold">프로젝트</h4>
            {/* 신청 목록 예시 */}
            <div className="space-y-2 rounded border p-3">
              <p className="font-medium">프로젝트 제목</p>
              <p className="text-sm text-gray-600">상태: 대기중</p>
            </div>
          </div>

          {/* 스터디 탭 */}
          <div className="bg-custom-gray-300 w-1/2 space-y-4 rounded-xl p-4 shadow">
            <h4 className="text-lg font-semibold">스터디</h4>
            {/* 신청 목록 예시 */}
            <div className="space-y-2 rounded border p-3">
              <p className="font-medium">스터디 제목</p>
              <p className="text-sm text-gray-600">상태: 대기중</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
