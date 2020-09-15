import React from 'react'
import styled from 'styled-components'

const QuoteHeading = styled.blockquote`
  width: 100%;
  margin: 0;
  text-align: ${(align) => align};

  & p {
    width: 100%;
    font-family: 'DM Serif Text';
    font-size: 100px;
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
    font-size: 36px;
    font-weight: normal;
    text-align: ${(align) => align};
  }
`

export default function Quote({ align, author, children }) {
  return (
    <QuoteHeading align={align}>
      <p>{children}</p>
      {author && <cite>{author}</cite>}
    </QuoteHeading>
  )
}
