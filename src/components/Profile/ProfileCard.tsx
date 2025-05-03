import { useEffect, useState } from 'react'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import ProfileImageUploader from './ProfileImageUploader'
import Image from 'next/image'
import profile from '@/assets/icons/profile.png'
import profileEdit from '@/assets/icons/profileEdit.png'
import { notify } from '../Toast'
import { getUserData, updateUserData } from '@/libs/apis/auth'
import { getCookie } from 'cookies-next'

export default function ProfileCard() {
  const { user, setUser, logout } = useAuthStore()

  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [nicknameInput, setNicknameInput] = useState(user?.nickname || '')
  const [introductionInput, setIntroductionInput] = useState(
    user?.introduction || '',
  )
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      setNicknameInput(user.nickname)
      setIntroductionInput(user.introduction || '')
      setImagePreviewUrl(user.profileImageUrl || null)
    }
  }, [user])

  const handleCancel = () => {
    setNicknameInput(user?.nickname || '')
    setIntroductionInput(user?.introduction || '')
    setSelectedImage(null)
    setIsEditing(false)
  }

  const handleLogOut = () => {
    setTimeout(() => {
      logout()
      router.push('/login')
    }, 300)
  }

  const handleSave = async () => {
    try {
      const isNicknameChanged = nicknameInput !== user?.nickname
      const isIntroductionChanged = introductionInput !== user?.introduction
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

      await updateUserData(formData)

      // 업데이트 성공 후 최신 사용자 정보를 다시 가져옴
      const accessToken = getCookie('accessToken')
      if (!accessToken) {
        notify('error', '로그인 정보가 없습니다.')
        return
      }
      const latestUser = await getUserData(accessToken as string)

      setUser(latestUser)

      notify('success', '프로필 수정 성공!')
      setIsEditing(false)
      setSelectedImage(null)
    } catch (error) {
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

  return (
    <>
      <h1 className="my-4 text-3xl font-bold">{user?.nickname}님의 정보</h1>
      <div className="border-custom-gray-200 mb-10 flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 md:flex-row md:gap-10 md:p-8">
        <div className="flex justify-center md:w-1/3">
          <div className="rounded-full border-6 md:border-8">
            {isEditing ? (
              <ProfileImageUploader
                profileImageUrl={imagePreviewUrl || profileEdit}
                onImageChange={setSelectedImage}
              />
            ) : (
              <Image
                src={user?.profileImageUrl || profile}
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
                <Button
                  type="primary"
                  onClick={handleSave}
                  className="max-w-30"
                >
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
              <h3 className="text-xl font-semibold">{user?.nickname}</h3>
              <p className="text-gray-600">{user?.email}</p>
              <p className="mt-2 text-gray-500">
                ✍️ {user?.introduction || '한 줄 소개가 없습니다.'}
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
    </>
  )
}
