import React from 'react'
import styled from 'styled-components'

const QuoteHeading = styled.div`
  h2 {
    font-family: 'DM Serif Text';
    font-size: 100px;
  }
  h4 {
    font-family: 'Roboto';
    font-size: 36px;
    font-weight: normal;
  }
`

export default function Quote({ author, children }) {
  return (
    <QuoteHeading>
      <h2>{children}</h2>
      {author && <h5>{author}</h5>}
    </QuoteHeading>
  )
}
