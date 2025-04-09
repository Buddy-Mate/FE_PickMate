type PaginationProps = {
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
}
export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  return (
    <div className="mt-4 flex justify-center space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-custom-gray-100 hover:bg-custom-gray-100 flex size-10 cursor-pointer items-center justify-center rounded-full border bg-transparent disabled:cursor-not-allowed disabled:bg-transparent"
      >
        {'<'}
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`flex size-10 cursor-pointer items-center justify-center rounded-full ${
            currentPage === index + 1
              ? 'bg-custom-gray-100 text-white'
              : 'border-custom-gray-100 hover:bg-custom-gray-100 border bg-transparent'
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-custom-gray-100 hover:bg-custom-gray-100 flex size-10 cursor-pointer items-center justify-center rounded-full border bg-transparent disabled:cursor-not-allowed disabled:bg-transparent"
      >
        {'>'}
      </button>
    </div>
  )
}
