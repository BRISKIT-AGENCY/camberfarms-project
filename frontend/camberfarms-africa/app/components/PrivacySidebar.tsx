'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const sections = [
  'introduction',
  'information-we-collect',
  'how-we-use-your-information',
  'legal-basis-for-processing',
  'cookies-and-tracking-technologies',
  'data-retention',
  'data-sharing-and-disclosure',
  'data-security',
  'your-rights',
  'third-party-links',
  'international-data-transfer',
  'children-s-privacy',
  'update-to-this-policy',
  'contact-us'
]

export default function PrivacySidebar() {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-40% 0px -50% 0px'
      }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <aside className="w-full bg-[#1ad32917] rounded-2xl px-10 py-14 space-y-6 text-dark-grey">
      <h2 className="text-3xl text-[#FF741F] xl:text-4xl uppercase font-poppins font-bold mb-10">
        on this page
      </h2>

      <nav className="flex flex-col gap-4 capitalize text-sm xl:text-base">
        {sections.map((id) => (
          <Link
            key={id}
            href={`#${id}`}
            onClick={() => setActiveSection(id)}
            className={`transition-colors duration-200 ${
              activeSection === id
                ? 'text-[#1AD329] font-semibold md:text-[20px] text-[18px] border-l-2 border-[#1AD329] pl-3'
                : 'text-dark-grey hover:text-primary'
            }`}
          >
            {id.replace(/-/g, ' ')}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-4 mt-20 text-primary">
        <h6 className="font-poppins font-bold text-lg text-[#1AD329]">
          Need to get in touch?
        </h6>
        <p className="text-[#1AD329]">
          We&apos;ll start with some questions and
          <br /> get you to the right place.
        </p>
        <Link
          href="/contact"
          className="w-fit bg-[#1AD329] flex items-center justify-center px-6 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary/70 transition-colors"
        >
          contact us
        </Link>
      </div>
    </aside>
  )
}
