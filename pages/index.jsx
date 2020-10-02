import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { siteConfig } from '../site.config'

export default function index() {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      `/slides/${
        siteConfig.slideUrl && siteConfig.slideUrl !== ''
          ? siteConfig.slideUrl
          : '1'
      }`
    )
  })
  return <div />
}
