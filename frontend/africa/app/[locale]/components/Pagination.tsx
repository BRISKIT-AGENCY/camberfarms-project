import Link from 'next/link'

export default function Pagination({
  currentPage,
  totalPages
}: {
  currentPage: number
  totalPages: number
}) {
  return (
    <div className="flex justify-center w-full">
      <div className="flex items-center gap-2 p-3 rounded-lg bg-[#F2F2F2]">
        {/* Left arrow */}
        <button className='w-10 h-10  flex items-center justify-center bg-[#ababab24] rounded-lg'>
          <img src="/images/arrow-left.png" alt="" className='h-[9.58px] w-[5.42px]'/>
        </button>

        {/* Page numbers */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1

            return (
              <Link
                key={page}
                href={`/blog?page=${page}`}
                className={`w-6 h-6 sm:w-10 sm:h-10 md:text-[14px] flex items-center justify-center rounded-lg border
                  ${
                    page === currentPage
                      ? 'bg-[#1AD329] text-white border-none'
                      : ' text-[#999999] border-none'
                  }
                `}
              >
                {page}
              </Link>
            )
          })}
        </div>

        {/* Right arrow */}
        <button className='w-10 h-10  flex items-center justify-center bg-[#ababab24] rounded-lg'>
          <img src="/images/arrow-green-right.png" alt="" className='h-[9.58px] w-[5.42px]'/>
        </button>
      </div>
    </div>
  )
}