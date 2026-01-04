import BlogSearchSidebar from '@/app/components/BlogSearchSidebar'
import Image from 'next/image'
import getRecentPosts from '@/app/components/RecentPost'

type Blog = {
    title: string
    publishedAt: string
    sections: {
        heading: string
        paragraphs: string[]
    }[]
}


async function getBlog(slug: string): Promise<Blog> {
    const res = await fetch(
        `http://localhost:5000/api/blog/${slug}`,
        { cache: 'no-store' }
    )

    if (!res.ok) throw new Error('Blog not found')
    return res.json()
}

export default async function BlogPage({
    params
}: {
    params: { slug: string }
}) {
    const blog = await getBlog(params.slug)
    const recentPosts = await getRecentPosts()

    return (
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

            <BlogSearchSidebar  recentPosts={recentPosts} />
        </div>
    )
}