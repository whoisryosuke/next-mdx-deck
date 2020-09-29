import React from 'react'
import styled from 'styled-components'

const QuoteHeading = styled.blockquote`
  width: 100%;
  margin: 0;
  text-align: ${({ align }) => align};

  & p {
    width: 100%;
    font-family: 'DM Serif Text';
    font-size: ${({ fontSize }) => fontSize || '100px'};
    line-height: 124.4%;
  }

  & p::before {
    content: '\\201C';
  }

  & p::after {
    content: '\\201D';
  }

  & cite {
    font-family: 'Roboto';
    font-size: 32px;
    font-weight: normal;
    text-align: ${(align) => align};
  }
`

export default function Quote({
  align,
  author,
  children,
  fontSize = null,
  url,
}) {
  const authorNode =
    author && url ? (
      <cite>
        <a href={url}>{author}</a>
      </cite>
    ) : (
      <cite>{author}</cite>
    )
  return (
    <QuoteHeading align={align} fontSize={fontSize}>
      <p>{children}</p>
      {author && authorNode}
    </QuoteHeading>
  )
}
