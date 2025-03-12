export default function Dropdown() {
  return (
    <div className="bg-custom-gray-300 flex">
      <select className="bg-custom-gray-300 rounded-2xl px-4 py-2">
        <option value="latest">최신순</option>
        <option value="popular">좋아요순</option>
        <option value="popular">조회순</option>
      </select>
    </div>
  )
}
