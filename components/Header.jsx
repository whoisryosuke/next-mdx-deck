import React from 'react'
import Link from 'next/link'

export default function Header({ name, event, date, url }) {
  return (
    <header>
      <a href={url}>
        <span>{name}</span>
      </a>{' '}
      <a href={event.url}>{event.name}</a>
      <time>{date}</time>
    </header>
  )
}
