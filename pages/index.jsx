import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function index() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/slides/1')
  })
  return <div />
}
