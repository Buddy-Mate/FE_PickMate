import { loginSchema } from '@/utils/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import logo from '@/assets/imgs/logo.png'
import Button from '@/components/Button'
import { getUserData, login } from '@/libs/apis/auth'
import { setCookie } from 'cookies-next'
import { useAuthStore } from '@/store/authStore'
import { useState } from 'react'
import Loading from '@/components/Loading'

type FormData = {
  email: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
  })

  const router = useRouter()
  const { login: setLogin, setUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const res = await login(data)

      const { token } = res
      setCookie('accessToken', token, {
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
      setLogin(token)

      const userData = await getUserData(token)
      setUser(userData)

      alert('로그인 성공!')
      router.push('/home')
    } catch (error) {
      alert('로그인에 실패했습니다.')
      console.error('로그인 에러:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <Loading />

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
            <p className="text-custom-red pl-4 text-left text-sm">
              {errors.email.message}
            </p>
          )}

          <input
            type="password"
            className="text-custom-white focus:border-custom-white border-custom-gray-300 rounded-lg border-2 bg-transparent px-4 py-3 outline-none"
            placeholder="비밀번호"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-custom-red pl-4 text-left text-sm">
              {errors.password.message}
            </p>
          )}
          <Button type="primary" className="max-w-100">
            로그인하기
          </Button>
        </form>
        <div className="text-md mt-10 flex items-center justify-center gap-4">
          <p>회원이 아니신가요?</p>
          <Link
            href="/signup"
            className="text-primary decoration-primary-40 underline underline-offset-2"
          >
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  )
}
