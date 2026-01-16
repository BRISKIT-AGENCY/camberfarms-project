import BlogSearchSidebar from '../../components/BlogSearchSidebar'
import Image from 'next/image'
import getRecentPosts from '../../components/RecentPost'
import axios from 'axios'
import { notFound } from 'next/navigation'
import Navbar from '../../components/Navbar'

type Blog = {
  title: string
  publishedAt: string
  sections: {
    heading: string
    paragraphs: string[]
  }[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function getBlog(slug: string): Promise<Blog> {
  try {
    const res = await axios.get(`${API_URL}/api/africa/blog/${slug}`)
    return res.data
  } catch (error: any) {
    if (error.response?.status === 404) {
      notFound()
    }

    console.error(
      'Failed to fetch blog:',
      error.response?.data || error.message
    )

    throw new Error('Failed to fetch blog')
  }
}

export default async function BlogPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const blog = await getBlog(slug)
  const recentPosts = await getRecentPosts()

  return (
    <div>
      <div className='hidden xl:block'>
        <Navbar logoSrc="/images/logo2.png" linkTextColor="text-black" buttonBgColor="bg-[#1AD329]" buttonTextColor='text-white' />
      </div>
      <div className="w-full bg-[#F3F5F7] md:pt-38.25 md:px-25 px-6 pt-15 pb-19.5">
        {/* TITLE */}
        <h1 className="font-bold md:text-[36px] text-[16px]">
          {blog.title}
        </h1>

        <p className="md:text-[18px] text-[#808080] mt-2">
          Date: {new Date(blog.publishedAt).toDateString()}
        </p>

        {/* CONTENT SECTIONS */}
        <div className="mt-12">
          {blog.sections.map((section, index) => (
            <div key={index} className="w-full md:mt-12.5 mt-6">
              <h2 className="font-medium md:text-[28px] text-[16px]">
                {section.heading}
              </h2>

              {section.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="md:text-[22px] text-[#333333] text-[14px] mt-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className='md:mt-25 mt-15'>
          <BlogSearchSidebar recentPosts={recentPosts} />
        </div>
      </div>
    </div>
  )
}