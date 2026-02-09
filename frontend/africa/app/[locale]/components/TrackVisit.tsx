'use client'

import { useEffect } from 'react'
import axios from 'axios'
import { usePathname } from 'next/navigation'

export default function TrackVisit() {
  const pathname = usePathname()

  useEffect(() => {
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/track-visit`, {
      path: pathname
    }).catch(() => {})
  }, [pathname])

  return null
}
