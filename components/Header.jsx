import React from 'react'
import Link from 'next/link'

export default function Header({ name, title, date }) {
  return (
    <header>
      <Link href="/1">
        <a>
          <span>{name}</span>
          {' '}
          —
          {' '}
          {title}
        </a>
      </Link>
      <time>{date}</time>
    </header>
  )
}
