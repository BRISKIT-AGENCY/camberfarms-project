import Image from 'next/image'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import Pagination from '../components/Pagination'
import getRecentPosts from '../components/RecentPost'
import BlogSearchSidebar from '../components/BlogSearchSidebar'
import axios from 'axios'

type Blog = {
  _id: string
  title: string
  excerpt: string
  publishedAt: string
  image: string
  slug: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function getBlogs(page: number) {
  try {
    const res = await axios.get(`${API_URL}/api/africa/blog`, {
      params: { page, limit: 3 },
    })
    return res.data
  } catch (error: any) {
    console.error('Failed to fetch blogs:', error.response?.data || error.message)
    throw new Error('Failed to fetch blogs')
  }
}


export default async function BlogPage({
  searchParams
}: {
  searchParams?: Promise<{ page?: string }>
}) {
  const params = await searchParams; // unwrap the Promise
  const currentPage = Number(params?.page) || 1;
  const { data, pagination } = await getBlogs(currentPage)
  const recentPosts = await getRecentPosts()

  return (
    <div className="w-full bg-[#F3F5F7] pb-19.5">
      <div className="hidden xl:block">
        <Navbar
          logoSrc="/images/logo2.png"
          linkTextColor="text-black"
          buttonBgColor="bg-[#1AD329]"
          buttonTextColor="text-white"
        />
      </div>

      <div className="md:pl-19.5 md:pr-30.5 px-6">
        <div className="w-full flex xl:flex-row flex-col gap-16.5 pt-15.5">
          {/* BLOG POSTS */}
          <div className="p-9 bg-white xl:w-[60%] rounded-3xl">
            {data.map((blog: Blog) => (
              <div
                key={blog._id}
                className="border-b border-[#EBEBEB] pb-9 mb-12.5"
              >
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={800}
                  height={400}
                  className="w-full h-65.25 object-cover rounded-xl"
                />

                <h2 className="font-medium md:text-[28px] text-[20px] mt-6">
                  {blog.title}
                </h2>

                <p className="text-[#808080] md:text-[18px] mt-2">
                  {blog.excerpt}
                </p>

                <p className="text-[#808080] md:text-[18px]">
                  Date: {new Date(blog.publishedAt).toDateString()}
                </p>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="flex mt-6 text-[#1AD329]"
                >
                  <span className="md:text-[24px] text-[16px]">Read More</span>
                  <Image
                    src="/images/greenarrow.png"
                    alt="arrow"
                    width={24}
                    height={24}
                    className="ml-2"
                  />
                </Link>
              </div>
            ))}

            
          </div>
          <div className='md:hidden mt-12.5'>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          </div>

          {/* Client-Side Search Component */}
          <div className=' xl:w-[40%]'>
            <BlogSearchSidebar recentPosts={recentPosts} />
          </div>
        </div>
        <div className='hidden md:block mt-25 '>
          <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
        </div>
      </div>
    </div>
  )
}
