import { useEffect, useState } from 'react'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import ProfileImageUploader from './ProfileImageUploader'
import Image, { StaticImageData } from 'next/image'
import profile from '@/assets/icons/profile.png'
import profileEdit from '@/assets/icons/profileEdit.png'
import { notify } from '../Toast'
import { updateUserData } from '@/libs/apis/auth'

type ProfileCardProps = {
  id: number
  nickname: string
  email: string
  introduction?: string
  profileImage?: string | StaticImageData
}

export default function ProfileCard({
  id,
  nickname,
  email,
  introduction,
  profileImage,
}: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)

  const [nicknameInput, setNicknameInput] = useState<string>(nickname)
  const [introductionInput, setIntroductionInput] = useState<string>(
    introduction || '',
  )

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

  const router = useRouter()

  const { setUser, logout } = useAuthStore()

  // 취소 버튼
  const handleCancel = () => {
    setNicknameInput(nickname)
    setIntroductionInput(introduction || '')
    setSelectedImage(null)
    setIsEditing(false)
  }

  // 로그아웃
  const handleLogOut = () => {
    setTimeout(() => {
      logout()
      router.push('/login')
    }, 300)
  }

  // TODO: 이미지 API 연결
  const handleSave = async () => {
    try {
      const isNicknameChanged = nicknameInput !== nickname
      const isIntroductionChanged = introductionInput !== (introduction ?? '')
      const isImageChanged = selectedImage !== null

      if (!isNicknameChanged && !isIntroductionChanged && !isImageChanged) {
        notify('info', '변경된 내용이 없습니다.')
        setIsEditing(false)
        return
      }

      if (nicknameInput.length > 10) {
        notify('error', '닉네임은 10글자 이하이어야 합니다.')
        return
      }

      const formData = new FormData()
      const userData = {
        nickname: nicknameInput,
        introduction: introductionInput,
      }
      formData.append(
        'data',
        new Blob([JSON.stringify(userData)], { type: 'application/json' }),
      )

      if (selectedImage) {
        formData.append('image', selectedImage)
      }

      console.log('📦 FormData 전체 내용:')
      formData.forEach((value, key) => {
        console.log(`${key}:`, value)
      })

      const response = await updateUserData(formData)
      console.log('서버 응답:', response)

      // 사용자 정보 업데이트
      setUser({
        id,
        nickname: nicknameInput,
        email,
        introduction: introductionInput,
        profileImage: imagePreviewUrl || profileImage,
      })

      notify('success', '프로필 수정 성공!')
      setIsEditing(false)
    } catch (error) {
      // 403 오류 처리
      if (error instanceof Error) {
        if (error.message === '이미 사용 중인 닉네임입니다.') {
          notify('error', '이미 사용 중인 닉네임입니다.')
        } else {
          notify('error', '프로필 수정에 실패했습니다.')
        }
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (selectedImage) {
      const newImagePreviewUrl = URL.createObjectURL(selectedImage)
      setImagePreviewUrl(newImagePreviewUrl)
      return () => URL.revokeObjectURL(newImagePreviewUrl)
    }
  }, [selectedImage])

  return (
    <div className="border-custom-gray-200 mb-10 flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 md:flex-row md:gap-10 md:p-8">
      <div className="flex justify-center md:w-1/3">
        <div className="rounded-full border-6 md:border-8">
          {isEditing ? (
            <ProfileImageUploader
              profileImage={
                imagePreviewUrl ||
                (typeof profileImage === 'string' ? profileImage : undefined) ||
                profileEdit
              }
              onImageChange={setSelectedImage}
            />
          ) : (
            <Image
              src={imagePreviewUrl || profileImage || profile}
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
                value={introductionInput}
                onChange={(e) => setIntroductionInput(e.target.value)}
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
              ✍️{' '}
              {introductionInput ? introductionInput : '한 줄 소개가 없습니다.'}
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
