import loadingAnimation from '@/assets/lottie/loading.json'
import dynamic from 'next/dynamic'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        autoplay={true}
        height={200}
        width={200}
      />
    </div>
  )
}
