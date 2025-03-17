import Image from 'next/image'
import { useState } from 'react'
import profile from '@/assets/icons/profile.png'
import Button from '../Button'

type ProfileCardProps = {
  nickname: string
  email: string
  bio: string
}

export default function Profile({ nickname, email, bio }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [nicknameInput, setNicknameInput] = useState(nickname)
  const [bioInput, setBioInput] = useState(bio)

  // 취소 버튼
  const handleCancel = () => {
    setNicknameInput(nickname)
    setBioInput(bio)
    setIsEditing(false)
  }

  // TODO: API 연결
  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="border-custom-gray-200 mb-10 flex items-center justify-center gap-10 rounded-lg border-2 p-10">
      <Image
        src={profile}
        alt="프로필 이미지"
        className="size-30 rounded-full object-cover"
      />
      <div className="flex-1 space-y-3">
        {isEditing ? (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">✏️ 닉네임</label>
              <input
                type="text"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
                className="text-custom-white focus:border-custom-white border-custom-gray-300 rounded-lg border-2 bg-transparent px-4 py-3 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">✍️ 한 줄 소개</label>
              <input
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                className="text-custom-white focus:border-custom-white border-custom-gray-300 rounded-lg border-2 bg-transparent px-4 py-3 outline-none"
              />
            </div>
            <div className="mt-2 flex gap-2">
              <Button type="primary" onClick={handleSave} className="max-w-30">
                저장
              </Button>
              <Button
                type="secondary"
                onClick={handleCancel}
                className="max-w-30"
              >
                취소
              </Button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold">{nicknameInput}</h3>
            <p className="text-gray-600">{email}</p>
            <p className="mt-2 text-gray-500">
              ✍️ {bioInput ? bioInput : '한 줄 소개가 없습니다.'}
            </p>
            <Button type="tertiary" onClick={() => setIsEditing(true)}>
              프로필 편집
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
