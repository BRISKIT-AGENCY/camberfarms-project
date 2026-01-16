import News from '../../components/News'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Navbar from '../../components/Navbar'

type Section = {
    heading?: string
    paragraphs: string[]
}

type News = {
    title: string
    excerpt: string
    image: string
    publishedAt: string
    sections: Section[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function getNews(slug: string): Promise<News> {
    const res = await fetch(`${API_URL}/api/africa/news/${slug}`, {
        cache: 'no-store'
    })

    if (!res.ok) notFound()

    return res.json()
}

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

export default async function NewsPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const news = await getNews(slug)

    return (
        <div className=''>
            <div className='hidden xl:block'>
                <Navbar logoSrc="/images/logo2.png" linkTextColor="text-black" buttonBgColor="bg-[#1AD329]" buttonTextColor='text-white' />
            </div>
            <div className='pt-21.5 bg-[#F2F2F2]'>
                <div className='flex justify-center md:px-25 px-6'>
                    <h1 className='text-[#1AD329] md:text-[50px] font-bold text-[28px]'>{news.title}</h1>
                </div>
                <div className='md:mt-12.5 mt-8 w-full md:px-25 px-6'>
                    <img src="/images/sustainability.png" alt="sustainability practice" className='h-90.75 w-full hidden md:block' />
                    <img src="/images/sustainability.png" alt="sustainability practice" className='h-90.75 w-full md:hidden' />
                    <div className='flex md:mt-6 mt-2 md:gap-12 gap-4'>
                        <p>By Admin</p>
                        {formatDate(news.publishedAt)}
                    </div>
                </div>
                <div className="mt-12 md:px-25 px-6">
                    {news.sections.map((section, index) => (
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
                <News header='MORE NEWS AND INSIGHTS' />
            </div>
        </div>
    )
}