'use client'
import BlogSearchSidebar from './BlogSearchSidebar'
import Navbar from './Navbar'
import { useLocale } from 'next-intl'
import getRecentPosts, { type RecentPost } from './RecentPost'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

type Blog = {
  title: string
  publishedAt: string
  sections: { heading: string; paragraphs: string[] }[]
}

export default function SingleBlogClient({ blog }: { blog: Blog }) {
  const locale = useLocale()
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([])
  const t = useTranslations('Blog')

  
const formattedDate = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(new Date(blog.publishedAt));

  useEffect(() => {
    async function fetchRecent() {
      const posts = await getRecentPosts(locale)
      setRecentPosts(posts)
    }
    fetchRecent()
  }, [locale])

  return (
    <div>
      <div className='hidden xl:block'>
        <Navbar
          logoSrc="/images/logo2.png"
          linkTextColor="text-black"
          buttonBgColor="bg-[#1AD329]"
          buttonTextColor='text-white'
        />
      </div>

      <div className="w-full bg-[#F3F5F7] md:pt-38.25 md:px-25 px-6 pt-15 pb-19.5">
        <h1 className="font-bold md:text-[36px] text-[16px]">{blog.title}</h1>
        <p className="md:text-[18px] text-[#808080] mt-2">
          {t('Date')} {formattedDate}
        </p>

        <div className="mt-12">
          {blog.sections.map((section, idx) => (
            <div key={idx} className="w-full md:mt-12.5 mt-6">
              <h2 className="font-medium md:text-[28px] text-[16px]">{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="md:text-[22px] text-[#333333] text-[14px] mt-4">{p}</p>
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
