import Image from 'next/image'
import { useState } from 'react'
import profile from '@/assets/icons/profile.png'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
import { useAuthStore } from '@/store/authStore'

type ProfileCardProps = {
  nickname: string
  email: string
  bio?: string
}

export default function ProfileCard({
  nickname,
  email,
  bio,
}: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [nicknameInput, setNicknameInput] = useState(nickname)
  const [bioInput, setBioInput] = useState(bio)

  const router = useRouter()

  // 취소 버튼
  const handleCancel = () => {
    setNicknameInput(nickname)
    setBioInput(bio)
    setIsEditing(false)
  }

  // 로그아웃
  const handleLogOut = () => {
    deleteCookie('accessToken')
    useAuthStore.getState().logout()
    router.push('/login')
  }

  // TODO: API 연결
  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="border-custom-gray-200 mb-10 flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 md:flex-row md:gap-10 md:p-10">
      <Image
        src={profile}
        alt="프로필 이미지"
        className="size-30 rounded-full object-cover"
      />
      <div className="w-full space-y-3 md:flex-1">
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
            <div className="flex gap-4">
              <Button type="secondary" onClick={() => setIsEditing(true)}>
                프로필 편집
              </Button>
              <Button type="tertiary" onClick={handleLogOut}>
                로그아웃
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
