import { useState } from 'react'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'
import { useAuthStore } from '@/store/authStore'
import ProfileImageUploader from './ProfileImageUploader'
import Image, { StaticImageData } from 'next/image'
import profile from '@/assets/icons/profile.png'
import profileEdit from '@/assets/icons/profileEdit.png'
import { notify } from '../Toast'

type ProfileCardProps = {
  nickname: string
  email: string
  bio?: string
  profileImage?: string | StaticImageData
}

export default function ProfileCard({
  nickname,
  email,
  bio,
  profileImage,
}: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)

  const [nicknameInput, setNicknameInput] = useState(nickname)
  const [bioInput, setBioInput] = useState(bio)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const router = useRouter()

  // 취소 버튼
  const handleCancel = () => {
    setNicknameInput(nickname)
    setBioInput(bio)
    setSelectedImage(null)
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
    notify('success', '프로필 변경 성공!')
    console.log('닉네임:', nicknameInput)
    console.log('한 줄 소개:', bioInput)
    console.log('프로필 이미지:', selectedImage)
    setIsEditing(false)
  }

  return (
    <div className="border-custom-gray-200 mb-10 flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 md:flex-row md:gap-10 md:p-8">
      <div className="flex justify-center md:w-1/3">
        <div className="rounded-full border-6 md:border-8">
          {isEditing ? (
            <ProfileImageUploader
              profileImage={
                selectedImage
                  ? URL.createObjectURL(selectedImage) // 사용자가 새 이미지를 선택한 경우 미리보기
                  : profileImage || profileEdit // 기존 이미지 또는 기본 이미지
              }
              onImageChange={setSelectedImage}
            />
          ) : (
            <Image
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : profileImage || profile
              }
              alt="프로필 이미지"
              className="size-30 rounded-full object-cover transition-all md:size-40"
              width={120}
              height={120}
            />
          )}
        </div>
      </div>
      <div className="w-full space-y-3 md:flex-1">
        {isEditing ? (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">✏️ 닉네임</label>
              <input
                type="text"
                value={nicknameInput}
                onChange={(e) => setNicknameInput(e.target.value)}
                className="text-custom-white focus:border-custom-white border-custom-gray-300 rounded-lg border-2 bg-transparent px-2 py-1 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">✍️ 한 줄 소개</label>
              <input
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                placeholder="한 줄 소개를 입력하세요"
                className="text-custom-white focus:border-custom-white border-custom-gray-300 rounded-lg border-2 bg-transparent px-2 py-1 outline-none"
              />
            </div>
            <div className="mt-2 flex items-center justify-center gap-2 md:justify-end">
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
