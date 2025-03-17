/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image'
import React, { useState } from 'react'
import profile from '@/assets/icons/profile.png'

export default function My() {
  const [bio, setBio] = useState('')

  return (
    <div className="mx-auto w-full max-w-[1200px] px-10 py-10">
      {/* 프로필 */}
      <h1>내 정보</h1>
      <div className="border-custom-gray-200 mb-10 flex items-center justify-center gap-10 rounded-lg border-2 p-10">
        <Image
          src={profile}
          alt="프로필 이미지"
          className="h-24 w-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">닉네임</h2>
          <p className="text-gray-600">email@example.com</p>
          <p className="mt-2 text-gray-500">{bio ? bio : '한 줄 소개'}</p>
        </div>
      </div>

      {/* 내가 쓴 게시글 */}
      <div>
        <h2 className="mb-4 text-xl font-bold">내가 쓴 게시글</h2>
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
        <h3 className="mb-4 text-xl font-bold">내가 신청한 목록</h3>
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
