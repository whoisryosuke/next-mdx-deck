import React from 'react'

export default function Header({ name, title, date }) {
  return (
    <header>
      <Link to="/1">
        <span>{name}</span> — {title}
      </Link>
      <time>{date}</time>
    </header>
  )
}
