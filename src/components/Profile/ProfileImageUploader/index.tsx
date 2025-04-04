import { ChangeEvent, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import profilePlaceholder from '@/assets/icons/profile.png'

type ProfileImageUploaderProps = {
  profileImage: string | StaticImageData
  onImageChange: (file: File | null) => void
}

export default function ProfileImageUploader({
  profileImage,
  onImageChange,
}: ProfileImageUploaderProps) {
  const [preview, setPreview] = useState(profileImage || profilePlaceholder)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file)) // 이미지 미리보기
      onImageChange(file) // 상위 컴포넌트에 파일 전달
    }
  }

  return (
    <div className="relative">
      <Image
        src={preview}
        alt="프로필 이미지"
        className="size-30 rounded-full object-cover md:size-40"
        width={120}
        height={120}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
    </div>
  )
}
