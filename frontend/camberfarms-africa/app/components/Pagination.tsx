import Link from 'next/link'

export default function Pagination({
  currentPage,
  totalPages
}: {
  currentPage: number
  totalPages: number
}) {
  return (
    <div className="flex justify-center gap-3 mt-12">
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1

        return (
          <Link
            key={page}
            href={`/blog?page=${page}`}
            className={`w-10 h-10 flex items-center justify-center rounded-full border
              ${
                page === currentPage
                  ? 'bg-[#1AD329] text-white border-[#1AD329]'
                  : 'bg-white text-black border-gray-300'
              }
            `}
          >
            {page}
          </Link>
        )
      })}
    </div>
  )
}
