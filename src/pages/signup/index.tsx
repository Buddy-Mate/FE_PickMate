import { signupSchema } from '@/utils/signupSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import logo from '@/assets/imgs/logo.png'
import Button from '@/components/Button'
import { signup } from '@/libs/apis/auth'
import { notify } from '@/components/Toast'

type FormData = {
  email: string
  nickname: string
  password: string
  confirmPassword: string
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    mode: 'all',
  })

  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    try {
      const { email, nickname, password } = data
      await signup({ email, nickname, password })

      notify('success', '회원가입 성공!')
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    } catch (error) {
      notify('error', '회원가입에 실패했습니다.')
      console.error('회원가입 에러:', error)
    }
  }

  return (
    <div className="flex max-h-screen flex-col items-center justify-center px-4 py-10">
      <Link href={'/'}>
        <Image src={logo} alt="로고" width={400} height={300} priority />
      </Link>
      <div className="w-full max-w-[400px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            type="text"
            className="text-custom-white focus:border-custom-white border-custom-gray-300 rounded-lg border-2 bg-transparent px-4 py-3 outline-none"
            placeholder="이메일"
            {...register('email')}
          />
          {errors.email && (
            <p className="pl-4 text-left text-sm text-red-500">
              {errors.email.message}
            </p>
          )}

          <input
            type="text"
            className="text-custom-white focus:border-custom-white border-custom-gray-300 rounded-lg border-2 bg-transparent px-4 py-3 outline-none"
            placeholder="닉네임"
            {...register('nickname')}
          />
          {errors.nickname && (
            <p className="pl-4 text-left text-sm text-red-500">
              {errors.nickname.message}
            </p>
          )}

          <input
            type="password"
            className="text-custom-white focus:border-custom-white border-custom-gray-300 rounded-lg border-2 bg-transparent px-4 py-3 outline-none"
            placeholder="비밀번호"
            {...register('password')}
          />
          {errors.password && (
            <p className="pl-4 text-left text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

          <input
            type="password"
            className="text-custom-white focus:border-custom-white border-custom-gray-300 rounded-lg border-2 bg-transparent px-4 py-3 outline-none"
            placeholder="비밀번호 확인"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="pl-4 text-left text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}

          <Button type="primary" className="max-w-100">
            회원가입하기
          </Button>
        </form>
        <div className="text-md mt-10 flex items-center justify-center gap-4">
          <p>이미 회원이신가요?</p>
          <Link
            href="/login"
            className="text-primary decoration-primary-40 underline underline-offset-2"
          >
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  )
}
