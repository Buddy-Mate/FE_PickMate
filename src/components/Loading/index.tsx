import loadingAnimation from '@/assets/lottie/loading.json'
import dynamic from 'next/dynamic'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function Loading() {
  return (
    <div className="flex max-h-screen items-center justify-center">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        autoplay={true}
        height={300}
        width={300}
      />
    </div>
  )
}
