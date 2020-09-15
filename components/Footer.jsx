import React from 'react'
import Link from 'next/link'

export default function Footer({ social, title, url }) {
  return (
    <footer>
      <a href={url}>
        <span>{social}</span>
      </a>{' '}
      {title}
    </footer>
  )
}
