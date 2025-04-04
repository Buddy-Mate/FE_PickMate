import { create } from 'zustand'

interface LikeStore {
  likedProjects: number[]
  likedStudies: number[]
  toggleProjectLike: (id: number) => void
  toggleStudyLike: (id: number) => void
}

export const useLikeStore = create<LikeStore>((set) => {
  const storedProjectLikes =
    typeof window !== 'undefined' ? localStorage.getItem('likedProjects') : null
  const storedStudyLikes =
    typeof window !== 'undefined' ? localStorage.getItem('likedStudies') : null

  const initialProjectLikes = storedProjectLikes
    ? JSON.parse(storedProjectLikes)
    : []
  const initialStudyLikes = storedStudyLikes ? JSON.parse(storedStudyLikes) : []

  return {
    likedProjects: initialProjectLikes,
    likedStudies: initialStudyLikes,

    toggleProjectLike: (id: number) =>
      set((state) => {
        const isLiked = state.likedProjects.includes(id)
        const updatedLikes = isLiked
          ? state.likedProjects.filter((item) => item !== id) // 좋아요 취소
          : [...state.likedProjects, id] // 좋아요 추가

        localStorage.setItem('likedProjects', JSON.stringify(updatedLikes))

        return { likedProjects: updatedLikes }
      }),

    toggleStudyLike: (id: number) =>
      set((state) => {
        const isLiked = state.likedStudies.includes(id)
        const updatedLikes = isLiked
          ? state.likedStudies.filter((item) => item !== id) // 좋아요 취소
          : [...state.likedStudies, id] // 좋아요 추가

        localStorage.setItem('likedStudies', JSON.stringify(updatedLikes))

        return { likedStudies: updatedLikes }
      }),
  }
})
