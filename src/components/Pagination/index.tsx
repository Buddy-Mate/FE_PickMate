type PaginationProps = {
  currentPage: number
  setCurrentPage: (page: number) => void
}

export default function Pagination({
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const totalPages = 3

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="mt-6 flex justify-center gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`rounded px-3 py-1 ${currentPage === page ? 'bg-gray-800 text-white' : 'bg-gray-300'}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
    </div>
  )
}
