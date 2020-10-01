import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { siteConfig } from '../deck.config'

export default function index() {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      `/slides/${
        siteConfig.slideUrl && siteConfig.slideUrl !== ''
          ? siteConfig.slideUrl
          : 'deck'
      }`
    )
  })
  return <div />
}
